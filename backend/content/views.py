from django.utils import timezone
from django.db import models
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Banner, SiteSettings, Testimonial, FAQ
from .serializers import BannerSerializer, SiteSettingsSerializer, TestimonialSerializer, FAQSerializer


@api_view(['GET'])
def test_view(request):
    """Простой тестовый view для отладки"""
    return Response({'message': 'API работает!'})


class BannerListView(generics.ListAPIView):
    """Получение списка активных баннеров"""
    serializer_class = BannerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['position']
    
    def get_queryset(self):
        now = timezone.now()
        return Banner.objects.filter(
            is_active=True
        ).filter(
            models.Q(show_from__isnull=True) | models.Q(show_from__lte=now)
        ).filter(
            models.Q(show_until__isnull=True) | models.Q(show_until__gte=now)
        ).order_by('position', 'order')


@api_view(['GET'])
def site_settings_view(request):
    """Получение настроек сайта"""
    try:
        settings = SiteSettings.objects.first()
        if not settings:
            # Создаем настройки по умолчанию, если их нет
            settings = SiteSettings.objects.create(
                site_name="KAMIL Jewelry",
                site_description="Эксклюзивные ювелирные изделия ручной работы",
                phone="+7 705 129 35 00",
                email="info@kamil-jewelry.com",
                address="г. Алматы, ул. Абая 123, ТРЦ 'Mega Park', 2 этаж",
                working_hours="Пн-Вс: 10:00 - 22:00",
                instagram_url="https://instagram.com/kamil_jewelry",
                whatsapp_number="77051293500",
                currency="₸",
                meta_title="KAMIL Jewelry - Эксклюзивные ювелирные изделия",
                meta_description="Откройте для себя коллекцию изысканных ювелирных изделий от KAMIL Jewelry. Ручная работа, уникальный дизайн, высокое качество.",
                meta_keywords="ювелирные изделия, украшения, кольца, серьги, браслеты, цепочки, золото, серебро, бижутерия"
            )
        
        serializer = SiteSettingsSerializer(settings, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TestimonialListView(generics.ListAPIView):
    """Получение списка одобренных отзывов"""
    serializer_class = TestimonialSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_featured', 'rating']
    
    def get_queryset(self):
        return Testimonial.objects.filter(
            is_approved=True
        ).select_related('product').order_by('-created_at')


class FeaturedTestimonialListView(generics.ListAPIView):
    """Получение рекомендуемых отзывов для главной страницы"""
    serializer_class = TestimonialSerializer
    
    def get_queryset(self):
        return Testimonial.objects.filter(
            is_approved=True,
            is_featured=True
        ).select_related('product').order_by('-created_at')[:6]


class FAQListView(generics.ListAPIView):
    """Получение списка активных FAQ"""
    serializer_class = FAQSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']
    
    def get_queryset(self):
        return FAQ.objects.filter(is_active=True).order_by('order', '-created_at')


@api_view(['GET'])
def homepage_data_view(request):
    """Получение всех данных для главной страницы"""
    try:
        # Настройки сайта
        settings = SiteSettings.objects.first()
        settings_data = SiteSettingsSerializer(settings, context={'request': request}).data if settings else {}
        
        # Баннеры для главной страницы
        hero_banners = Banner.objects.filter(
            is_active=True,
            position='hero'
        ).order_by('order')[:3]
        
        promo_banners = Banner.objects.filter(
            is_active=True,
            position='promo'
        ).order_by('order')[:2]
        
        # Рекомендуемые отзывы
        testimonials = Testimonial.objects.filter(
            is_approved=True,
            is_featured=True
        ).select_related('product').order_by('-created_at')[:3]
        
        # Популярные FAQ
        faqs = FAQ.objects.filter(is_active=True).order_by('order')[:5]
        
        data = {
            'settings': settings_data,
            'hero_banners': BannerSerializer(hero_banners, many=True, context={'request': request}).data,
            'promo_banners': BannerSerializer(promo_banners, many=True, context={'request': request}).data,
            'testimonials': TestimonialSerializer(testimonials, many=True, context={'request': request}).data,
            'faqs': FAQSerializer(faqs, many=True).data,
        }
        
        return Response(data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)