from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, LoginSerializer
from .models import User  # Assuming you have a User model with phone number

from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, LoginSerializer

from .serializers import ProfileUpdateSerializer
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()

# Register API (Generates Token on Signup)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(phone=response.data['phone'])
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"user": response.data, "token": token.key})

# Login API (Generates Token)
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            phone = serializer.validated_data['phone']
            password = serializer.validated_data['password']
            
            user = get_object_or_404(User, phone=phone)
            if user.check_password(password):
                token, _ = Token.objects.get_or_create(user=user)
                return Response({"token": token.key})
            else:
                return Response({"error": "Invalid Credentials"}, status=400)
        return Response(serializer.errors, status=400)

# Profile API (Get User Info)
class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({"username": user.username, "email": user.email})

from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

# List All Products
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Get Single Product Detail
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

from .models import Cart
from .serializers import CartSerializer
from rest_framework import status

# View Cart Items
class CartView(generics.ListAPIView):
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

# Add Item to Cart
class CartAddView(generics.CreateAPIView):
    serializer_class = CartSerializer

# Update Cart Item
class CartUpdateView(generics.UpdateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    lookup_field = 'id'

# Remove Item from Cart
class CartRemoveView(generics.DestroyAPIView):
    queryset = Cart.objects.all()
    lookup_field = 'id'

from .models import Order
from .serializers import OrderSerializer

# Create Order
class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer

# View Order Details
class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'id'

from .models import Wishlist
from .serializers import WishlistSerializer

# View Wishlist
class WishlistView(generics.ListAPIView):
    serializer_class = WishlistSerializer

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

# Add Item to Wishlist
class WishlistAddView(generics.CreateAPIView):
    serializer_class = WishlistSerializer

# Remove Item from Wishlist
class WishlistRemoveView(generics.DestroyAPIView):
    queryset = Wishlist.objects.all()
    lookup_field = 'id'

from rest_framework import generics, permissions
from .models import Order
from .serializers import OrderSerializer

class UserOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class CancelOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, id):
        try:
            order = Order.objects.get(id=id, user=request.user)
            if order.status in ['shipped', 'delivered']:
                return Response({'error': 'Cannot cancel a shipped or delivered order'}, status=status.HTTP_400_BAD_REQUEST)

            order.status = 'canceled'
            order.save()
            return Response({'message': 'Order canceled successfully'}, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)


class UpdateProfileView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

from .models import Product
from .serializers import ProductSerializer
from rest_framework import filters

class ProductSearchView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'category__name']

from rest_framework import status
from .models import Payment

class CheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order_id')
        payment_method = request.data.get('payment_method')
        transaction_id = request.data.get('transaction_id')

        try:
            order = Order.objects.get(id=order_id, user=request.user, status='pending')
            payment = Payment.objects.create(
                order=order,
                payment_method=payment_method,
                transaction_id=transaction_id,
                payment_status=True
            )
            order.status = 'processing'  # Mark order as processing after payment
            order.save()
            return Response({'message': 'Payment successful, order processing'}, status=status.HTTP_201_CREATED)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found or already paid'}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.authtoken.models import Token

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.auth.delete()  # Deletes the token
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
