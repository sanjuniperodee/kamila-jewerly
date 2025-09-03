from django.shortcuts import render
from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product
from .serializers import CategorySerializer, ProductListSerializer, ProductDetailSerializer
from .filters import ProductFilter


class CustomPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'limit'
    max_page_size = 100


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True).select_related('category').prefetch_related('images')
    serializer_class = ProductListSerializer
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'short_description']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True).select_related('category').prefetch_related('images', 'variants')
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'


class CategoryProductsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'short_description']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']
    
    def get_queryset(self):
        category_slug = self.kwargs['slug']
        return Product.objects.filter(
            is_active=True,
            category__slug=category_slug,
            category__is_active=True
        ).select_related('category').prefetch_related('images')


@api_view(['GET'])
def featured_products(request):
    """Получить рекомендуемые товары"""
    limit = request.GET.get('limit', 8)
    try:
        limit = int(limit)
        limit = min(limit, 20)  # Максимум 20 товаров
    except ValueError:
        limit = 8
    
    products = Product.objects.filter(
        is_active=True,
        is_featured=True
    ).select_related('category').prefetch_related('images')[:limit]
    
    serializer = ProductListSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def new_products(request):
    """Получить новинки"""
    limit = request.GET.get('limit', 8)
    try:
        limit = int(limit)
        limit = min(limit, 20)  # Максимум 20 товаров
    except ValueError:
        limit = 8
    
    products = Product.objects.filter(
        is_active=True,
        is_new=True
    ).select_related('category').prefetch_related('images')[:limit]
    
    serializer = ProductListSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def search_products(request):
    """Поиск товаров"""
    query = request.GET.get('q', '')
    if not query:
        return Response([])
    
    products = Product.objects.filter(
        is_active=True,
        name__icontains=query
    ).select_related('category').prefetch_related('images')[:20]
    
    serializer = ProductListSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)
