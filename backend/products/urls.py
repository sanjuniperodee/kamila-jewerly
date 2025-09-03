from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('products/featured/', views.featured_products, name='featured-products'),
    path('products/new/', views.new_products, name='new-products'),
    path('search/', views.search_products, name='search-products'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/<slug:slug>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('categories/<slug:slug>/products/', views.CategoryProductsView.as_view(), name='category-products'),
]
