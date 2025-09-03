from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    name = models.CharField(_('Название'), max_length=100)
    slug = models.SlugField(_('Slug'), unique=True)
    description = models.TextField(_('Описание'), blank=True)
    image = models.ImageField(_('Изображение'), upload_to='categories/', blank=True)
    is_active = models.BooleanField(_('Активна'), default=True)
    order = models.PositiveIntegerField(_('Порядок'), default=0)
    created_at = models.DateTimeField(_('Создано'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Обновлено'), auto_now=True)

    class Meta:
        verbose_name = _('Категория')
        verbose_name_plural = _('Категории')
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Product(models.Model):
    PRODUCT_TYPES = [
        ('handmade', _('Ручная работа')),
        ('bijouterie', _('Бижутерия')),
        ('silver', _('Серебро')),
        ('gold', _('Золото')),
        ('accessories', _('Аксессуары')),
    ]

    name = models.CharField(_('Название'), max_length=200)
    slug = models.SlugField(_('Slug'), unique=True)
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name='products',
        verbose_name=_('Категория')
    )
    product_type = models.CharField(
        _('Тип товара'), 
        max_length=20, 
        choices=PRODUCT_TYPES,
        default='bijouterie'
    )
    description = models.TextField(_('Описание'))
    short_description = models.CharField(_('Краткое описание'), max_length=300, blank=True)
    price = models.DecimalField(_('Цена'), max_digits=10, decimal_places=2)
    old_price = models.DecimalField(_('Старая цена'), max_digits=10, decimal_places=2, blank=True, null=True)
    discount_percent = models.PositiveIntegerField(_('Скидка %'), default=0)
    sku = models.CharField(_('Артикул'), max_length=50, unique=True)
    weight = models.DecimalField(_('Вес'), max_digits=6, decimal_places=2, blank=True, null=True)
    dimensions = models.CharField(_('Размеры'), max_length=100, blank=True)
    material = models.CharField(_('Материал'), max_length=100, blank=True)
    is_active = models.BooleanField(_('Активен'), default=True)
    is_featured = models.BooleanField(_('Рекомендуемый'), default=False)
    is_new = models.BooleanField(_('Новинка'), default=False)
    stock_quantity = models.PositiveIntegerField(_('Количество на складе'), default=0)
    created_at = models.DateTimeField(_('Создано'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Обновлено'), auto_now=True)

    class Meta:
        verbose_name = _('Товар')
        verbose_name_plural = _('Товары')
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    @property
    def final_price(self):
        if self.old_price and self.old_price > self.price:
            return self.price
        return self.price

    @property
    def discount_amount(self):
        if self.old_price and self.old_price > self.price:
            return self.old_price - self.price
        return 0


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name='images',
        verbose_name=_('Товар')
    )
    image = models.ImageField(_('Изображение'), upload_to='products/')
    alt_text = models.CharField(_('Alt текст'), max_length=200, blank=True)
    is_primary = models.BooleanField(_('Главное изображение'), default=False)
    order = models.PositiveIntegerField(_('Порядок'), default=0)
    created_at = models.DateTimeField(_('Создано'), auto_now_add=True)

    class Meta:
        verbose_name = _('Изображение товара')
        verbose_name_plural = _('Изображения товаров')
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"{self.product.name} - {self.alt_text or 'Изображение'}"


class ProductVariant(models.Model):
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name='variants',
        verbose_name=_('Товар')
    )
    name = models.CharField(_('Название варианта'), max_length=100)
    sku = models.CharField(_('Артикул варианта'), max_length=50, unique=True)
    price_modifier = models.DecimalField(_('Модификатор цены'), max_digits=8, decimal_places=2, default=0)
    stock_quantity = models.PositiveIntegerField(_('Количество на складе'), default=0)
    is_active = models.BooleanField(_('Активен'), default=True)
    created_at = models.DateTimeField(_('Создано'), auto_now_add=True)

    class Meta:
        verbose_name = _('Вариант товара')
        verbose_name_plural = _('Варианты товаров')

    def __str__(self):
        return f"{self.product.name} - {self.name}"

    @property
    def final_price(self):
        return self.product.final_price + self.price_modifier
