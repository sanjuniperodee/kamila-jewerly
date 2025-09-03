from django.urls import path
from . import views

urlpatterns = [
    # Cart URLs
    path('cart/', views.get_cart, name='get-cart'),
    path('cart/add/', views.add_to_cart, name='add-to-cart'),
    path('cart/items/<int:item_id>/', views.update_cart_item, name='update-cart-item'),
    path('cart/items/<int:item_id>/remove/', views.remove_from_cart, name='remove-from-cart'),
    path('cart/clear/', views.clear_cart, name='clear-cart'),
    
    # Order URLs
    path('orders/', views.get_orders, name='get-orders'),
    path('orders/create/', views.create_order, name='create-order'),
    path('orders/<str:order_number>/', views.get_order, name='get-order'),
]
