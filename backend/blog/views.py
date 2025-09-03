from django.shortcuts import render
from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import BlogCategory, BlogPost
from .serializers import BlogCategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer


class BlogCategoryListView(generics.ListAPIView):
    queryset = BlogCategory.objects.filter(is_active=True)
    serializer_class = BlogCategorySerializer


class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.filter(status='published').select_related('category')
    serializer_class = BlogPostListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_featured']
    search_fields = ['title', 'excerpt', 'content']
    ordering_fields = ['published_at', 'created_at', 'title']
    ordering = ['-published_at']


class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(status='published').select_related('category')
    serializer_class = BlogPostDetailSerializer
    lookup_field = 'slug'


@api_view(['GET'])
def featured_blog_posts(request):
    """Получить рекомендуемые посты блога"""
    posts = BlogPost.objects.filter(
        status='published',
        is_featured=True
    ).select_related('category')[:6]
    
    serializer = BlogPostListSerializer(posts, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def latest_blog_posts(request):
    """Получить последние посты блога"""
    posts = BlogPost.objects.filter(
        status='published'
    ).select_related('category')[:6]
    
    serializer = BlogPostListSerializer(posts, many=True, context={'request': request})
    return Response(serializer.data)
