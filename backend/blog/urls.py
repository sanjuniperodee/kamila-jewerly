from django.urls import path
from . import views

urlpatterns = [
    path('blog/categories/', views.BlogCategoryListView.as_view(), name='blog-category-list'),
    path('blog/', views.BlogPostListView.as_view(), name='blog-post-list'),
    path('blog/<slug:slug>/', views.BlogPostDetailView.as_view(), name='blog-post-detail'),
    path('blog/featured/', views.featured_blog_posts, name='featured-blog-posts'),
    path('blog/latest/', views.latest_blog_posts, name='latest-blog-posts'),
]
