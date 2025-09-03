from django.db import models
from django.utils.translation import gettext_lazy as _
from products.models import Product, ProductVariant
import uuid


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', _('Ожидает обработки')),
        ('confirmed', _('Подтвержден')),
        ('processing', _('В обработке')),
        ('shipped', _('Отправлен')),
        ('delivered', _('Доставлен')),
        ('cancelled', _('Отменен')),
    ]

    # Уникальный идентификатор для привязки к устройству/сессии
    session_key = models.CharField(_('Ключ сессии'), max_length=255, db_index=True)
    order_number = models.CharField(_('Номер заказа'), max_length=20, unique=True)
    
    # Контактная информация покупателя
    customer_name = models.CharField(_('Имя покупателя'), max_length=100)
    customer_phone = models.CharField(_('Телефон'), max_length=20)
    customer_email = models.EmailField(_('Email'), blank=True)
    
    # Адрес доставки
    delivery_address = models.TextField(_('Адрес доставки'))
    delivery_city = models.CharField(_('Город'), max_length=100)
    delivery_notes = models.TextField(_('Примечания к доставке'), blank=True)
    
    # Информация о заказе
    status = models.CharField(_('Статус'), max_length=20, choices=STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(_('Общая сумма'), max_digits=10, decimal_places=2)
    delivery_cost = models.DecimalField(_('Стоимость доставки'), max_digits=8, decimal_places=2, default=0)
    
    # Даты
    created_at = models.DateTimeField(_('Создан'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Обновлен'), auto_now=True)
    
    # Дополнительные поля
    notes = models.TextField(_('Примечания'), blank=True)
    admin_notes = models.TextField(_('Заметки администратора'), blank=True)

    class Meta:
        verbose_name = _('Заказ')
        verbose_name_plural = _('Заказы')
        ordering = ['-created_at']

    def __str__(self):
        return f"Заказ #{self.order_number} - {self.customer_name}"

    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = self.generate_order_number()
        super().save(*args, **kwargs)

    def generate_order_number(self):
        """Генерирует уникальный номер заказа"""
        import random
        import string
        from django.utils import timezone
        
        date_part = timezone.now().strftime('%Y%m%d')
        random_part = ''.join(random.choices(string.digits, k=4))
        return f"KJ{date_part}{random_part}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, 
        on_delete=models.CASCADE, 
        related_name='items',
        verbose_name=_('Заказ')
    )
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE,
        verbose_name=_('Товар')
    )
    product_variant = models.ForeignKey(
        ProductVariant, 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True,
        verbose_name=_('Вариант товара')
    )
    quantity = models.PositiveIntegerField(_('Количество'), default=1)
    price = models.DecimalField(_('Цена за единицу'), max_digits=10, decimal_places=2)
    
    # Сохраняем данные товара на момент заказа
    product_name = models.CharField(_('Название товара'), max_length=200)
    product_sku = models.CharField(_('Артикул'), max_length=50)
    
    created_at = models.DateTimeField(_('Создан'), auto_now_add=True)

    class Meta:
        verbose_name = _('Позиция заказа')
        verbose_name_plural = _('Позиции заказов')

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"

    @property
    def total_price(self):
        return self.price * self.quantity

    def save(self, *args, **kwargs):
        # Сохраняем данные товара на момент заказа
        if not self.product_name:
            self.product_name = self.product.name
        if not self.product_sku:
            self.product_sku = self.product_variant.sku if self.product_variant else self.product.sku
        if not self.price:
            self.price = self.product_variant.final_price if self.product_variant else self.product.final_price
        super().save(*args, **kwargs)


class Cart(models.Model):
    """Корзина для неавторизованных пользователей"""
    session_key = models.CharField(_('Ключ сессии'), max_length=255, unique=True)
    created_at = models.DateTimeField(_('Создана'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Обновлена'), auto_now=True)

    class Meta:
        verbose_name = _('Корзина')
        verbose_name_plural = _('Корзины')

    def __str__(self):
        return f"Корзина {self.session_key[:10]}..."

    @property
    def total_amount(self):
        return sum(item.total_price for item in self.items.all())

    @property
    def total_items(self):
        return sum(item.quantity for item in self.items.all())


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart, 
        on_delete=models.CASCADE, 
        related_name='items',
        verbose_name=_('Корзина')
    )
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE,
        verbose_name=_('Товар')
    )
    product_variant = models.ForeignKey(
        ProductVariant, 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True,
        verbose_name=_('Вариант товара')
    )
    quantity = models.PositiveIntegerField(_('Количество'), default=1)
    created_at = models.DateTimeField(_('Добавлен'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Обновлен'), auto_now=True)

    class Meta:
        verbose_name = _('Позиция корзины')
        verbose_name_plural = _('Позиции корзин')
        unique_together = ['cart', 'product', 'product_variant']

    def __str__(self):
        variant_name = f" - {self.product_variant.name}" if self.product_variant else ""
        return f"{self.product.name}{variant_name} x {self.quantity}"

    @property
    def price(self):
        return self.product_variant.final_price if self.product_variant else self.product.final_price

    @property
    def total_price(self):
        return self.price * self.quantity
