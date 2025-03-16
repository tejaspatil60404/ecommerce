from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import (
    RegisterView, LoginView, ProfileView,
    ProductListView, product_detail,
    CartView, CartAddView, CartUpdateView, CartRemoveView,
    OrderCreateView, OrderDetailView,
    WishlistView, WishlistAddView, WishlistRemoveView, PlaceOrderView
)

from django.urls import path
from .views import (
    UserOrdersView, CancelOrderView, UpdateProfileView, ProductSearchView,
    CheckoutView, LogoutView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, ProfileView, LogoutView
from .views import DirectOrderView

# Enable media files in development
from django.conf import settings
from .views import ShippingAddressView, ShippingAddressDetailView
from django.conf.urls.static import static
from django.urls import path
from .views import CategoryListView
from .views import get_reviews

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT login
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    path('auth/profile/update/', UpdateProfileView.as_view(), name='update-profile'),

    # Product APIs
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:product_id>/', product_detail, name='product-detail'),
    path('products/search/', ProductSearchView.as_view(), name='search-products'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('products/<int:product_id>/reviews/', get_reviews, name='get-reviews'),

    # Cart APIs
    path('cart/', CartView.as_view(), name='cart-list'),
    path('cart/add/', CartAddView.as_view(), name='cart-add'),
    path('cart/update/<int:id>/', CartUpdateView.as_view(), name='cart-update'),
    path('cart/remove/<int:id>/', CartRemoveView.as_view(), name='cart-remove'),  # Change here

    # Order APIs
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/<int:id>/', OrderDetailView.as_view(), name='order-detail'),
    path('orders/my-orders/', UserOrdersView.as_view(), name='user-orders'),
    path('orders/checkout/', CheckoutView.as_view(), name='checkout'),
    path('orders/cancel/<int:id>/', CancelOrderView.as_view(), name='cancel-order'),

    # Wishlist APIs
    path('wishlist/', WishlistView.as_view(), name='wishlist-list'),
    path('wishlist/add/', WishlistAddView.as_view(), name='wishlist-add'),
    path('wishlist/remove/<int:id>/', WishlistRemoveView.as_view(), name='wishlist-remove'),

    path('shipping-address/', ShippingAddressView.as_view(), name='shipping-address'),
    path('shipping-address/<int:id>/', ShippingAddressDetailView.as_view(), name='shipping-address-detail'),
    path("place-order/", PlaceOrderView.as_view(), name="place-order"), 
    path("order/direct/", DirectOrderView.as_view(), name="direct-order"),
]