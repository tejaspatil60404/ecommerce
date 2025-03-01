from rest_framework import serializers
from .models import User, Cart, CartItem, Wishlist, Product, Order, Payment, ShippingAddress, Notification

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

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

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

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        exclude = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        exclude = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

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
