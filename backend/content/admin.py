from django.contrib import admin
from django.utils.html import format_html
from .models import Banner, SiteSettings, Testimonial, FAQ


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'position', 'is_active', 'order', 'image_preview', 'created_at']
    list_filter = ['position', 'is_active', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['is_active', 'order']
    ordering = ['position', 'order']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'subtitle', 'description', 'position', 'order')
        }),
        ('Изображения', {
            'fields': ('image', 'mobile_image')
        }),
        ('Действия', {
            'fields': ('button_text', 'button_url', 'link_url')
        }),
        ('Отображение', {
            'fields': ('is_active', 'show_from', 'show_until')
        }),
        ('Стилизация', {
            'fields': ('background_color', 'text_color'),
            'classes': ('collapse',)
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />',
                obj.image.url
            )
        return "Нет изображения"
    image_preview.short_description = "Превью"
    
    class Media:
        css = {
            'all': ('admin/css/custom.css',)
        }


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Основная информация', {
            'fields': ('site_name', 'site_description', 'logo', 'favicon')
        }),
        ('Контакты', {
            'fields': ('phone', 'email', 'address', 'working_hours')
        }),
        ('Социальные сети', {
            'fields': ('instagram_url', 'whatsapp_number', 'telegram_url')
        }),
        ('SEO настройки', {
            'fields': ('meta_title', 'meta_description', 'meta_keywords'),
            'classes': ('collapse',)
        }),
        ('Настройки магазина', {
            'fields': ('currency', 'tax_rate', 'free_shipping_threshold'),
            'classes': ('collapse',)
        }),
        ('Аналитика', {
            'fields': ('google_analytics_id', 'yandex_metrica_id'),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        # Разрешаем создание только если нет записей
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Запрещаем удаление
        return False


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'rating', 'is_featured', 'is_approved', 'product', 'created_at']
    list_filter = ['rating', 'is_featured', 'is_approved', 'created_at']
    search_fields = ['name', 'email', 'content']
    list_editable = ['is_featured', 'is_approved']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Информация о клиенте', {
            'fields': ('name', 'email', 'avatar')
        }),
        ('Отзыв', {
            'fields': ('rating', 'title', 'content', 'product')
        }),
        ('Настройки', {
            'fields': ('is_featured', 'is_approved')
        }),
        ('Метаданные', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('product')


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question_short', 'category', 'is_active', 'order', 'created_at']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['question', 'answer']
    list_editable = ['is_active', 'order', 'category']
    ordering = ['order', '-created_at']
    
    fieldsets = (
        ('Вопрос и ответ', {
            'fields': ('question', 'answer')
        }),
        ('Настройки', {
            'fields': ('category', 'order', 'is_active')
        }),
    )
    
    def question_short(self, obj):
        return obj.question[:80] + "..." if len(obj.question) > 80 else obj.question
    question_short.short_description = "Вопрос"


# Настройка заголовков админки
admin.site.site_header = "KAMIL Jewelry - Панель управления"
admin.site.site_title = "KAMIL Jewelry Admin"
admin.site.index_title = "Добро пожаловать в панель управления"