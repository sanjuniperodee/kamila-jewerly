from django.urls import path
from . import views

app_name = 'content'

urlpatterns = [
    # Тестовый endpoint
    path('test/', views.test_view, name='test'),
    
    # Баннеры
    path('banners/', views.BannerListView.as_view(), name='banner-list'),
    
    # Настройки сайта
    path('settings/', views.site_settings_view, name='site-settings'),
    
    # Отзывы
    path('testimonials/', views.TestimonialListView.as_view(), name='testimonial-list'),
    path('testimonials/featured/', views.FeaturedTestimonialListView.as_view(), name='featured-testimonials'),
    
    # FAQ
    path('faq/', views.FAQListView.as_view(), name='faq-list'),
    
    # Данные для главной страницы
    path('homepage/', views.homepage_data_view, name='homepage-data'),
]
