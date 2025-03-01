from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User, Cart, Wishlist, Product, Order, Payment, ShippingAddress, Notification
from .serializers import (
    RegisterSerializer, LoginSerializer, ProfileSerializer, ProfileUpdateSerializer,
    CartSerializer, WishlistSerializer, CartUpdateSerializer, WishlistUpdateSerializer,
    ProductSerializer, OrderSerializer, PaymentSerializer, ShippingAddressSerializer, NotificationSerializer
)

# User Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

# User Login
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(phone=serializer.validated_data['phone'], password=serializer.validated_data['password'])
            if user:
                refresh = RefreshToken.for_user(user)
                update_last_login(None, user)
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Logout
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        except Exception:
            return Response({"error": "Invalid token or already logged out"}, status=status.HTTP_400_BAD_REQUEST)

# Profile Management
class ProfileView(generics.RetrieveUpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileUpdateSerializer

    def get_object(self):
        return self.request.user

class UpdateProfileView(generics.UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileUpdateSerializer

    def get_object(self):
        return self.request.user

# Product Management
class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

# Cart Management
class CartView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        serializer.instance = cart

class CartUpdateView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartUpdateSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

class CartAddView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartSerializer

class CartRemoveView(generics.DestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

# Wishlist Management
class WishlistView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WishlistSerializer

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

class WishlistUpdateView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WishlistUpdateSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

class WishlistAddView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WishlistSerializer

class WishlistRemoveView(generics.DestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WishlistSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

# Order Management
class OrderView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

class OrderCreateView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

class CancelOrderView(generics.UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(status="Cancelled")

# Payment Management
class PaymentView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PaymentSerializer

class PaymentDetailView(generics.RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PaymentSerializer
    lookup_field = 'id'

# Shipping Address Management
class ShippingAddressView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ShippingAddressSerializer

class ShippingAddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ShippingAddressSerializer
    lookup_field = 'id'

# Notifications
class NotificationView(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

# Product Search
class ProductSearchView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        if query:
            return Product.objects.filter(name__icontains=query)
        return Product.objects.all()

# Checkout
class CheckoutView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        cart_items = Cart.objects.filter(user=request.user)
        if not cart_items.exists():
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=request.user, status="Pending")
        for item in cart_items:
            order.products.add(item.product)
        cart_items.delete()

        return Response({"message": "Order placed successfully"}, status=status.HTTP_201_CREATED)

class UserOrdersView(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')
