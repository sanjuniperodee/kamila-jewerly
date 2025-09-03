from django.contrib import admin
from .models import Category, Product, ProductImage, ProductVariant


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 0


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'order', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('order', 'name')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'product_type', 'price', 'old_price', 'is_active', 'is_featured', 'stock_quantity')
    list_filter = ('category', 'product_type', 'is_active', 'is_featured', 'is_new', 'created_at')
    search_fields = ('name', 'description', 'sku')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, ProductVariantInline]
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'slug', 'category', 'product_type', 'sku')
        }),
        ('Описание', {
            'fields': ('short_description', 'description')
        }),
        ('Цена и скидки', {
            'fields': ('price', 'old_price', 'discount_percent')
        }),
        ('Характеристики', {
            'fields': ('weight', 'dimensions', 'material', 'stock_quantity')
        }),
        ('Настройки', {
            'fields': ('is_active', 'is_featured', 'is_new')
        }),
        ('Даты', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'alt_text', 'is_primary', 'order', 'created_at')
    list_filter = ('is_primary', 'created_at')
    search_fields = ('product__name', 'alt_text')
    ordering = ('product', 'order')


@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('product', 'name', 'sku', 'price_modifier', 'stock_quantity', 'is_active')
    list_filter = ('is_active', 'created_at')
    search_fields = ('product__name', 'name', 'sku')
    ordering = ('product', 'name')
