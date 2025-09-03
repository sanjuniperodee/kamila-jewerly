from django.db import models
from django.utils.translation import gettext_lazy as _


class Banner(models.Model):
    """Модель для управления баннерами на главной странице"""
    
    POSITION_CHOICES = [
        ('hero', _('Главный баннер')),
        ('promo', _('Промо баннер')),
        ('category', _('Баннер категории')),
    ]
    
    title = models.CharField(_('Заголовок'), max_length=200)
    subtitle = models.CharField(_('Подзаголовок'), max_length=300, blank=True)
    description = models.TextField(_('Описание'), blank=True)
    image = models.ImageField(_('Изображение'), upload_to='banners/')
    mobile_image = models.ImageField(_('Изображение для мобильных'), upload_to='banners/mobile/', blank=True)
    
    # Ссылки и действия
    button_text = models.CharField(_('Текст кнопки'), max_length=100, blank=True)
    button_url = models.URLField(_('Ссылка кнопки'), blank=True)
    link_url = models.URLField(_('Ссылка баннера'), blank=True)
    
    # Позиционирование
    position = models.CharField(_('Позиция'), max_length=20, choices=POSITION_CHOICES, default='hero')
    order = models.PositiveIntegerField(_('Порядок'), default=0)
    
    # Настройки отображения
    is_active = models.BooleanField(_('Активен'), default=True)
    show_from = models.DateTimeField(_('Показывать с'), null=True, blank=True)
    show_until = models.DateTimeField(_('Показывать до'), null=True, blank=True)
    
    # Стилизация
    background_color = models.CharField(_('Цвет фона'), max_length=7, default='#ffffff', help_text='Hex код цвета')
    text_color = models.CharField(_('Цвет текста'), max_length=7, default='#000000', help_text='Hex код цвета')
    
    # Метаданные
    created_at = models.DateTimeField(_('Создан'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Обновлён'), auto_now=True)
    
    class Meta:
        verbose_name = _('Баннер')
        verbose_name_plural = _('Баннеры')
        ordering = ['position', 'order', '-created_at']
    
    def __str__(self):
        return f"{self.get_position_display()}: {self.title}"


class SiteSettings(models.Model):
    """Модель для общих настроек сайта"""
    
    # Основная информация
    site_name = models.CharField(_('Название сайта'), max_length=100, default='KAMIL Jewelry')
    site_description = models.TextField(_('Описание сайта'), blank=True)
    logo = models.ImageField(_('Логотип'), upload_to='settings/', blank=True)
    favicon = models.ImageField(_('Фавикон'), upload_to='settings/', blank=True)
    
    # Контактная информация
    phone = models.CharField(_('Телефон'), max_length=20, blank=True)
    email = models.EmailField(_('Email'), blank=True)
    address = models.TextField(_('Адрес'), blank=True)
    
    # Социальные сети
    instagram_url = models.URLField(_('Instagram'), blank=True)
    whatsapp_number = models.CharField(_('WhatsApp номер'), max_length=20, blank=True)
    telegram_url = models.URLField(_('Telegram'), blank=True)
    
    # SEO
    meta_title = models.CharField(_('Meta заголовок'), max_length=60, blank=True)
    meta_description = models.CharField(_('Meta описание'), max_length=160, blank=True)
    meta_keywords = models.TextField(_('Ключевые слова'), blank=True)
    
    # Настройки магазина
    currency = models.CharField(_('Валюта'), max_length=10, default='₸')
    tax_rate = models.DecimalField(_('Налоговая ставка'), max_digits=5, decimal_places=2, default=0.00)
    free_shipping_threshold = models.DecimalField(_('Бесплатная доставка от'), max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Рабочее время
    working_hours = models.TextField(_('Режим работы'), blank=True, default='Пн-Вс: 10:00 - 22:00')
    
    # Аналитика
    google_analytics_id = models.CharField(_('Google Analytics ID'), max_length=50, blank=True)
    yandex_metrica_id = models.CharField(_('Yandex Metrica ID'), max_length=50, blank=True)
    
    created_at = models.DateTimeField(_('Создан'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Обновлён'), auto_now=True)
    
    class Meta:
        verbose_name = _('Настройки сайта')
        verbose_name_plural = _('Настройки сайта')
    
    def __str__(self):
        return self.site_name
    
    def save(self, *args, **kwargs):
        # Обеспечиваем единственность записи
        if not self.pk and SiteSettings.objects.exists():
            raise ValueError('Может существовать только одна запись настроек')
        super().save(*args, **kwargs)


class Testimonial(models.Model):
    """Модель для отзывов клиентов"""
    
    name = models.CharField(_('Имя'), max_length=100)
    email = models.EmailField(_('Email'), blank=True)
    avatar = models.ImageField(_('Аватар'), upload_to='testimonials/', blank=True)
    
    rating = models.PositiveIntegerField(_('Оценка'), choices=[(i, i) for i in range(1, 6)], default=5)
    title = models.CharField(_('Заголовок отзыва'), max_length=200, blank=True)
    content = models.TextField(_('Текст отзыва'))
    
    # Связь с продуктом (опционально)
    product = models.ForeignKey(
        'products.Product', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        verbose_name=_('Продукт'),
        related_name='testimonials'
    )
    
    is_featured = models.BooleanField(_('Рекомендуемый'), default=False)
    is_approved = models.BooleanField(_('Одобрен'), default=False)
    
    created_at = models.DateTimeField(_('Создан'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Обновлён'), auto_now=True)
    
    class Meta:
        verbose_name = _('Отзыв')
        verbose_name_plural = _('Отзывы')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Отзыв от {self.name} - {self.rating}★"


class FAQ(models.Model):
    """Модель для часто задаваемых вопросов"""
    
    question = models.CharField(_('Вопрос'), max_length=300)
    answer = models.TextField(_('Ответ'))
    
    category = models.CharField(_('Категория'), max_length=100, blank=True)
    order = models.PositiveIntegerField(_('Порядок'), default=0)
    is_active = models.BooleanField(_('Активен'), default=True)
    
    created_at = models.DateTimeField(_('Создан'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Обновлён'), auto_now=True)
    
    class Meta:
        verbose_name = _('Вопрос-Ответ')
        verbose_name_plural = _('Вопросы-Ответы')
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return self.question[:100]