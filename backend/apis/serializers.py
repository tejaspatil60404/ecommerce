from rest_framework import serializers
from .models import User, Cart, CartItem, Wishlist, Product, Order, Payment, ShippingAddress, Notification
from django.conf import settings

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phone', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

class LoginSerializer(serializers.Serializer):
    phone = serializers.CharField()
    password = serializers.CharField(write_only=True)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phone', 'email']

from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'  # Includes all fields

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Review

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.email", read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'user_name', 'product', 'rating', 'comment', 'created_at']
        extra_kwargs = {'product': {'write_only': True}}  # Product field hidden in response

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    category_name = serializers.CharField(source="category.name")
    reviews = ReviewSerializer(many=True, read_only=True, source="review_set")

    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "stock", "category_name", "image_url", "reviews"]

    def get_image_url(self, obj):
        if obj.image:
            return self.context["request"].build_absolute_uri(obj.image.url)
        return None



class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'subtotal_price']

class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True, source='cartitem_set')

    class Meta:
        model = Cart
        fields = ['id', 'total_price', 'cart_items']

    def create(self, validated_data):
        user = self.context['request'].user
        cart, created = Cart.objects.get_or_create(user=user)
        return cart

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        exclude = ['user']  # Excluding user from input

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

from rest_framework import serializers
from .models import Order, OrderItem, ShippingAddress, CartItem

from rest_framework import serializers
from .models import Order, OrderItem

from django.conf import settings
from django.utils.functional import LazyObject
from rest_framework import serializers

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)  
    product_image = serializers.SerializerMethodField()  # ✅ Fetch full image URL

    class Meta:
        model = OrderItem
        fields = ["id", "product_name", "product_image", "order", "quantity", "price"]

    def get_product_image(self, obj):
        request = self.context.get("request")  # ✅ Get request object from context
        if obj.product.image:
            return request.build_absolute_uri(obj.product.image.url) if request else f"{settings.MEDIA_URL}{obj.product.image.url}"
        return None  # If no image exists
  
class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, required=False, read_only=True)  # ✅ Ensure read-only to prevent unnecessary data input

    class Meta:
        model = Order
        fields = ["id", "user", "total_price", "status", "created_at", "order_items"]
        extra_kwargs = {"user": {"read_only": True}}

    def create(self, validated_data):
        user = self.context["request"].user
        cart_checkout = self.context.get("cart_checkout", False)  # ✅ Avoid KeyError
        selected_product = self.context.get("selected_product")  

        # Create a new order
        order = Order.objects.create(user=user, total_price=validated_data["total_price"])

        if cart_checkout:
            # Move all cart items to order items
            cart_items = CartItem.objects.filter(cart__user=user)
            order_items = [
                OrderItem(order=order, product=item.product, quantity=item.quantity, price=item.subtotal_price)
                for item in cart_items
            ]
            OrderItem.objects.bulk_create(order_items)  # ✅ Optimized bulk create
            cart_items.delete()  

        elif selected_product:
            # Ensure selected_product is a dictionary and has required keys
            OrderItem.objects.create(
                order=order, 
                product=selected_product["product"],  # Ensure this is a Product instance, not a dict
                quantity=selected_product["quantity"], 
                price=selected_product["price"]
            )

        return order

from rest_framework import serializers
from .models import ShippingAddress
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        exclude = ['user']
        extra_kwargs = {
            "order": {"required": False},  # Order should be optional (if needed)
        }

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        order = validated_data.get("order")

        # ✅ Allow multiple shipping addresses per user, but only one per order
        if order and ShippingAddress.objects.filter(user=validated_data['user'], order=order).exists():
            raise serializers.ValidationError("You already have a shipping address for this order.")

        return super().create(validated_data)

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        exclude = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'phone']
        extra_kwargs = {'email': {'required': False}, 'phone': {'required': False}}

class CartUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['total_price']
        extra_kwargs = {'total_price': {'required': False}}

class WishlistUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['product']
        extra_kwargs = {'product': {'required': False}}
