from rest_framework import serializers
from .models import Banner, SiteSettings, Testimonial, FAQ


class BannerSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    mobile_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Banner
        fields = [
            'id', 'title', 'subtitle', 'description', 
            'image_url', 'mobile_image_url', 'button_text', 
            'button_url', 'link_url', 'position', 'order',
            'background_color', 'text_color'
        ]
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def get_mobile_image_url(self, obj):
        if obj.mobile_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.mobile_image.url)
            return obj.mobile_image.url
        return self.get_image_url(obj)  # Fallback to main image


class SiteSettingsSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()
    
    class Meta:
        model = SiteSettings
        fields = [
            'site_name', 'site_description', 'logo_url', 'favicon_url',
            'phone', 'email', 'address', 'working_hours',
            'instagram_url', 'whatsapp_number', 'telegram_url',
            'currency', 'free_shipping_threshold',
            'meta_title', 'meta_description', 'meta_keywords'
        ]
    
    def get_logo_url(self, obj):
        if obj.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None
    
    def get_favicon_url(self, obj):
        if obj.favicon:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.favicon.url)
            return obj.favicon.url
        return None


class TestimonialSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = Testimonial
        fields = [
            'id', 'name', 'avatar_url', 'rating', 'title', 
            'content', 'product_name', 'created_at'
        ]
    
    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'category']
