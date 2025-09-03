from django.contrib import admin
from .models import Order, OrderItem, Cart, CartItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product_name', 'product_sku', 'price', 'total_price')
    
    def total_price(self, obj):
        return obj.total_price
    total_price.short_description = 'Общая стоимость'


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'customer_name', 'customer_phone', 'status', 'total_amount', 'created_at')
    list_filter = ('status', 'created_at', 'delivery_city')
    search_fields = ('order_number', 'customer_name', 'customer_phone', 'customer_email')
    readonly_fields = ('order_number', 'session_key', 'created_at', 'updated_at')
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Информация о заказе', {
            'fields': ('order_number', 'session_key', 'status', 'total_amount', 'delivery_cost')
        }),
        ('Контактная информация', {
            'fields': ('customer_name', 'customer_phone', 'customer_email')
        }),
        ('Доставка', {
            'fields': ('delivery_address', 'delivery_city', 'delivery_notes')
        }),
        ('Примечания', {
            'fields': ('notes', 'admin_notes')
        }),
        ('Даты', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return self.readonly_fields + ('total_amount',)
        return self.readonly_fields


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    readonly_fields = ('price', 'total_price')
    
    def price(self, obj):
        return obj.price
    price.short_description = 'Цена'
    
    def total_price(self, obj):
        return obj.total_price
    total_price.short_description = 'Общая стоимость'


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('session_key', 'total_items', 'total_amount', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('session_key',)
    readonly_fields = ('session_key', 'total_items', 'total_amount', 'created_at', 'updated_at')
    inlines = [CartItemInline]
    
    def total_items(self, obj):
        return obj.total_items
    total_items.short_description = 'Количество товаров'
    
    def total_amount(self, obj):
        return obj.total_amount
    total_amount.short_description = 'Общая сумма'


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product_name', 'quantity', 'price', 'total_price')
    list_filter = ('created_at',)
    search_fields = ('order__order_number', 'product_name', 'product_sku')
    readonly_fields = ('total_price',)
    
    def total_price(self, obj):
        return obj.total_price
    total_price.short_description = 'Общая стоимость'
