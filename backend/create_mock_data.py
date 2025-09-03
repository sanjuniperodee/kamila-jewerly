#!/usr/bin/env python
import os
import django
from django.utils import timezone
from datetime import timedelta

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kamil_jewelry.settings')
django.setup()

from content.models import Banner, SiteSettings, Testimonial, FAQ

def create_mock_data():
    print("Создание моковых данных...")
    
    # Создание настроек сайта
    print("Создание настроек сайта...")
    settings, created = SiteSettings.objects.get_or_create(
        site_name="KAMIL Jewelry",
        defaults={
            'site_description': "Эксклюзивные ювелирные изделия ручной работы для женщин с характером и стилем",
            'phone': "+7 705 129 35 00",
            'email': "info@kamil-jewelry.com",
            'address': "Казахстан, г. Астана, Пр. Абая, 48 (угол ул. Ш. Уалиханова), ТЦ 'ЖАННУР', 1 этаж",
            'working_hours': "Пн-Вс: 10:00 - 22:00",
            'instagram_url': "https://instagram.com/kamil_jewelry",
            'whatsapp_number': "77051293500",
            'currency': "₸",
            'meta_title': "KAMIL Jewelry - Эксклюзивные ювелирные изделия ручной работы",
            'meta_description': "Откройте для себя коллекцию изысканных ювелирных изделий от KAMIL Jewelry. Ручная работа, уникальный дизайн, высокое качество.",
            'meta_keywords': "ювелирные изделия, украшения, кольца, серьги, браслеты, цепочки, золото, серебро, бижутерия"
        }
    )
    if created:
        print(f"✓ Созданы настройки сайта: {settings.site_name}")
    else:
        print(f"✓ Настройки сайта уже существуют: {settings.site_name}")
    
    # Создание баннеров
    print("Создание баннеров...")
    
    # Главный баннер
    hero_banner, created = Banner.objects.get_or_create(
        title="KAMIL Jewelry",
        defaults={
            'subtitle': "твой стиль, твоя история",
            'description': "Бутик-ателье украшений для женщин с характером и стилем. Здесь вы найдете не просто бижутерию, а тщательно отобранные модные изделия.",
            'button_text': "Смотреть каталог",
            'button_url': "/catalog",
            'position': 'hero',
            'order': 1,
            'is_active': True,
            'show_from': timezone.now(),
            'show_until': timezone.now() + timedelta(days=365)
        }
    )
    if created:
        print(f"✓ Создан главный баннер: {hero_banner.title}")
    else:
        print(f"✓ Главный баннер уже существует: {hero_banner.title}")
    
    # Промо баннер
    promo_banner, created = Banner.objects.get_or_create(
        title="Новая коллекция",
        defaults={
            'subtitle': "Этно-бохо стиль",
            'description': "Откройте для себя новую коллекцию украшений в стиле этно-бохо. Уникальные дизайны, ручная работа.",
            'button_text': "Подробнее",
            'button_url': "/catalog/etno-boho",
            'position': 'promo',
            'order': 1,
            'is_active': True,
            'show_from': timezone.now(),
            'show_until': timezone.now() + timedelta(days=365)
        }
    )
    if created:
        print(f"✓ Создан промо баннер: {promo_banner.title}")
    else:
        print(f"✓ Промо баннер уже существует: {promo_banner.title}")
    
    # Создание отзывов
    print("Создание отзывов...")
    
    testimonials_data = [
        {
            'name': 'Айжан К.',
            'rating': 5,
            'content': 'Потрясающие украшения! Качество на высоте, дизайн уникальный. Очень довольна покупкой.',
            'is_approved': True,
            'is_featured': True
        },
        {
            'name': 'Мария С.',
            'rating': 5,
            'content': 'Заказывала кольцо на заказ. Мастера учли все пожелания, результат превзошел ожидания!',
            'is_approved': True,
            'is_featured': True
        },
        {
            'name': 'Елена В.',
            'rating': 5,
            'content': 'Красивые серьги, носят уже полгода, выглядят как новые. Рекомендую всем!',
            'is_approved': True,
            'is_featured': True
        }
    ]
    
    for i, testimonial_data in enumerate(testimonials_data):
        testimonial, created = Testimonial.objects.get_or_create(
            name=testimonial_data['name'],
            defaults={
                'rating': testimonial_data['rating'],
                'content': testimonial_data['content'],
                'is_approved': testimonial_data['is_approved'],
                'is_featured': testimonial_data['is_featured']
            }
        )
        if created:
            print(f"✓ Создан отзыв от {testimonial.name}")
        else:
            print(f"✓ Отзыв от {testimonial.name} уже существует")
    
    # Создание FAQ
    print("Создание FAQ...")
    
    faqs_data = [
        {
            'question': 'Как заказать украшение?',
            'answer': 'Вы можете заказать украшение через наш сайт, выбрав понравившееся изделие и оформив заказ, или связаться с нами по телефону для индивидуального заказа.',
            'category': 'Заказы',
            'order': 1
        },
        {
            'question': 'Есть ли доставка по Казахстану?',
            'answer': 'Да, мы осуществляем доставку по всему Казахстану. Стоимость и сроки доставки зависят от вашего города.',
            'category': 'Доставка',
            'order': 2
        },
        {
            'question': 'Можно ли изменить размер кольца?',
            'answer': 'Да, мы можем адаптировать размер кольца под вас. Для этого свяжитесь с нашими мастерами.',
            'category': 'Изделия',
            'order': 3
        },
        {
            'question': 'Какие материалы используются?',
            'answer': 'Мы используем только качественные материалы: серебро 925 пробы, позолота, натуральные камни и кристаллы Swarovski.',
            'category': 'Материалы',
            'order': 4
        },
        {
            'question': 'Есть ли гарантия на изделия?',
            'answer': 'Да, на все наши изделия предоставляется гарантия качества. При обнаружении дефектов мы бесплатно исправим изделие.',
            'category': 'Гарантия',
            'order': 5
        }
    ]
    
    for i, faq_data in enumerate(faqs_data):
        faq, created = FAQ.objects.get_or_create(
            question=faq_data['question'],
            defaults={
                'answer': faq_data['answer'],
                'category': faq_data['category'],
                'order': faq_data['order'],
                'is_active': True
            }
        )
        if created:
            print(f"✓ Создан FAQ: {faq.question}")
        else:
            print(f"✓ FAQ уже существует: {faq.question}")
    
    print("\n✓ Все моковые данные успешно созданы!")

if __name__ == '__main__':
    create_mock_data()
