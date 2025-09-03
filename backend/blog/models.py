from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify


class BlogCategory(models.Model):
    name = models.CharField(_('Название'), max_length=100)
    slug = models.SlugField(_('Slug'), unique=True)
    description = models.TextField(_('Описание'), blank=True)
    is_active = models.BooleanField(_('Активна'), default=True)
    created_at = models.DateTimeField(_('Создана'), auto_now_add=True)

    class Meta:
        verbose_name = _('Категория блога')
        verbose_name_plural = _('Категории блога')
        ordering = ['name']

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    STATUS_CHOICES = [
        ('draft', _('Черновик')),
        ('published', _('Опубликовано')),
        ('archived', _('Архив')),
    ]

    title = models.CharField(_('Заголовок'), max_length=200)
    slug = models.SlugField(_('Slug'), unique=True, blank=True)
    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='posts',
        verbose_name=_('Категория')
    )
    excerpt = models.TextField(_('Краткое описание'), max_length=300)
    content = models.TextField(_('Содержание'))
    featured_image = models.ImageField(_('Главное изображение'), upload_to='blog/', blank=True)
    status = models.CharField(_('Статус'), max_length=20, choices=STATUS_CHOICES, default='draft')
    is_featured = models.BooleanField(_('Рекомендуемый'), default=False)
    
    # SEO
    meta_title = models.CharField(_('Meta Title'), max_length=60, blank=True)
    meta_description = models.CharField(_('Meta Description'), max_length=160, blank=True)
    
    # Даты
    published_at = models.DateTimeField(_('Дата публикации'), null=True, blank=True)
    created_at = models.DateTimeField(_('Создан'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Обновлен'), auto_now=True)

    class Meta:
        verbose_name = _('Пост блога')
        verbose_name_plural = _('Посты блога')
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.meta_title:
            self.meta_title = self.title[:60]
        if not self.meta_description:
            self.meta_description = self.excerpt[:160]
        super().save(*args, **kwargs)
