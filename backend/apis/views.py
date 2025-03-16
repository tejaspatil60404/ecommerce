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
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated, AllowAny

# User Registration
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = User(
                email=serializer.validated_data["email"],
                phone=serializer.validated_data["phone"],
                password=make_password(serializer.validated_data["password"])  # Hash the password
            )
            user.save()

            # Generate tokens immediately after successful registration
            refresh = RefreshToken.for_user(user)
            update_last_login(None, user)

            return Response({
                "message": "User registered successfully",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Login
class LoginView(APIView):
    def post(self, request):
        print("Raw request data:", request.data)  # Debugging line

        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            phone = serializer.validated_data["phone"]
            password = serializer.validated_data["password"]
            
            print(f"Received phone: {phone}, password: {password}")  # Debugging line

            user = authenticate(phone=phone, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                update_last_login(None, user)
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
        print("Validation Errors:", serializer.errors)  # Debugging line
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
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request, product_id):
    product = Product.objects.get(id=product_id)
    serialized_product = ProductSerializer(product, context={'request': request})
    return Response(serialized_product.data)

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Product, Review
from .serializers import ReviewSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import Product, Review, User  # Import the User model
from .serializers import ReviewSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Review
from .serializers import ReviewSerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Review
from .serializers import ReviewSerializer

@api_view(["GET"])  # ✅ Only allow GET requests

def get_reviews(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    # ✅ Fetch and serialize all reviews for the given product
    reviews = Review.objects.filter(product=product)
    serializer = ReviewSerializer(reviews, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer

class CategoryListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

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
        
from .serializers import CartItemSerializer

class CartRemoveView(generics.DestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartItemSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

    def delete(self, request, *args, **kwargs):
        cart_item = self.get_object()
        cart = cart_item.cart

        # Delete the cart item
        cart_item.delete()

        # Update total price in the cart
        cart.total_price = cart.cartitem_set.aggregate(Sum('subtotal_price'))['subtotal_price__sum'] or 0
        cart.save()

        return Response({"message": "Item removed from cart!"}, status=status.HTTP_204_NO_CONTENT)


from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from .models import CartItem

class CartAddView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartSerializer

    def post(self, request, *args, **kwargs):
        user = request.user
        product_id = request.data.get("product")
        quantity = request.data.get("quantity", 1)

        if not product_id:
            return Response({"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        # Get or create the user's cart
        cart, created = Cart.objects.get_or_create(user=user)

        # Check if the product is already in the cart
        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product)

        # Update quantity and subtotal
        if not item_created:
            cart_item.quantity += int(quantity)
        else:
            cart_item.quantity = int(quantity)

        cart_item.subtotal_price = cart_item.quantity * product.price
        cart_item.save()

        # Update total_price in Cart
        cart.total_price = cart.cartitem_set.aggregate(Sum('subtotal_price'))['subtotal_price__sum'] or 0
        cart.save()

        return Response({"message": "Product added to cart successfully!"}, status=status.HTTP_201_CREATED)


class CartUpdateView(generics.UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartItemSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

    def update(self, request, *args, **kwargs):
        cart_item = self.get_object()
        quantity = request.data.get("quantity", 1)

        if quantity <= 0:
            cart_item.delete()  # Remove item if quantity is zero
        else:
            cart_item.quantity = quantity
            cart_item.subtotal_price = quantity * cart_item.product.price
            cart_item.save()

        # Update total price in the cart
        cart = cart_item.cart
        cart.total_price = cart.cartitem_set.aggregate(Sum('subtotal_price'))['subtotal_price__sum'] or 0
        cart.save()

        return Response({"message": "Cart updated successfully!"}, status=status.HTTP_200_OK)


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
from rest_framework import generics, permissions, status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import ShippingAddress
from .serializers import ShippingAddressSerializer

# View & Create Shipping Address
from rest_framework import generics, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import ShippingAddress, Order
from .serializers import ShippingAddressSerializer

class ShippingAddressView(generics.ListCreateAPIView): 
    queryset = ShippingAddress.objects.all()
    serializer_class = ShippingAddressSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def perform_create(self, serializer):
        order_id = self.request.data.get("order_id")

        if not order_id:
            raise serializers.ValidationError({"order_id": "This field is required when placing an order."})

        order = Order.objects.filter(id=order_id, user=self.request.user).first()
        if not order:
            raise serializers.ValidationError({"order_id": "Invalid order ID."})

        # ✅ Now allows multiple addresses per user, but one per order
        serializer.save(user=self.request.user, order=order)

# Retrieve, Update, or Delete Shipping Address
class ShippingAddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ShippingAddressSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return ShippingAddress.objects.filter(user=self.request.user)

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

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Order, CartItem, OrderItem
from .serializers import OrderSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from .models import Cart, Order, OrderItem, ShippingAddress
from .serializers import OrderSerializer, ShippingAddressSerializer

class PlaceOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        user = request.user

        # Get the cart items for the user
        cart = Cart.objects.filter(user=user).first()
        if not cart:
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        cart_items = cart.cartitem_set.all()
        if not cart_items.exists():
            return Response({"error": "No items in cart"}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            # Step 1: Create an Order
            order = Order.objects.create(user=user, total_price=0)

            total_price = 0
            # Step 2: Move Cart Items to Order Items
            for cart_item in cart_items:
                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    quantity=cart_item.quantity,
                    price=cart_item.product.price * cart_item.quantity
                )
                total_price += cart_item.product.price * cart_item.quantity

            # Update order total price
            order.total_price = total_price
            order.save()

            # Step 3: Delete Cart Items
            cart_items.delete()

            return Response({"message": "Order placed successfully", "order_id": order.id}, status=status.HTTP_201_CREATED)

class UserOrdersView(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def get_serializer_context(self):
        return {"request": self.request}  # ✅ Pass request to serializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Product, Order, OrderItem
from .serializers import OrderSerializer  # Assuming you have user authentication
from .models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication  # Import JWT authentication
from .models import Order, OrderItem, Product
from .serializers import OrderSerializer

class DirectOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Ensure only logged-in users can order
    authentication_classes = [JWTAuthentication]  # Apply JWT authentication

    def post(self, request):
        print("Authenticated user:", request.user)  # Debugging Line

        # Ensure user is authenticated
        if request.user.is_anonymous:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        user = request.user
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity", 1)  # Default quantity is 1

        # Fetch product, or return 404 if not found
        product = get_object_or_404(Product, id=product_id)

        if product.stock < quantity:
            return Response({"error": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Calculate total price
        total_price = product.price 

        # ✅ Create the order with total_price
        order = Order.objects.create(
            user=user,
            status="Pending",
            total_price=total_price  # ✅ Fix: Add total_price here
        )

        # Create the order item
        order_item = OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            price=product.price
        )

        # Reduce product stock
        product.stock -= quantity
        product.save()

        serializer = OrderSerializer(order)
        return Response({
            "order_id": order.id,
            "total_price": total_price,
            "message": "Order placed successfully"
        }, status=status.HTTP_201_CREATED)
