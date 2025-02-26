from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import (
    RegisterView, LoginView, ProfileView,
    ProductListView, ProductDetailView,
    CartView, CartAddView, CartUpdateView, CartRemoveView,
    OrderCreateView, OrderDetailView,
    WishlistView, WishlistAddView, WishlistRemoveView
)

from django.urls import path
from .views import (
    UserOrdersView, CancelOrderView, UpdateProfileView, ProductSearchView,
    CheckoutView, LogoutView
)

urlpatterns = [
    # Authentication APIs
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    path('auth/token/', obtain_auth_token, name='api_token_auth'),  # DRF built-in token authentication

    # Product APIs
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail'),

    # Cart APIs
    path('cart/', CartView.as_view(), name='cart-list'),
    path('cart/add/', CartAddView.as_view(), name='cart-add'),
    path('cart/update/<int:id>/', CartUpdateView.as_view(), name='cart-update'),
    path('cart/remove/<int:id>/', CartRemoveView.as_view(), name='cart-remove'),

    # Order APIs
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/<int:id>/', OrderDetailView.as_view(), name='order-detail'),

    # Wishlist APIs
    path('wishlist/', WishlistView.as_view(), name='wishlist-list'),
    path('wishlist/add/', WishlistAddView.as_view(), name='wishlist-add'),
    path('wishlist/remove/<int:id>/', WishlistRemoveView.as_view(), name='wishlist-remove'),
    
    path('orders/my-orders/', UserOrdersView.as_view(), name='user-orders'),
    path('orders/cancel/<int:id>/', CancelOrderView.as_view(), name='cancel-order'),
    path('auth/update-profile/', UpdateProfileView.as_view(), name='update-profile'),
    path('products/search/', ProductSearchView.as_view(), name='search-products'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
]


