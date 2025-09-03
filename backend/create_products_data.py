#!/usr/bin/env python
import os
import django
from django.utils import timezone

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kamil_jewelry.settings')
django.setup()

from products.models import Category, Product

def create_products_data():
    print("Создание моковых данных для продуктов...")
    
    # Создание категорий
    print("Создание категорий...")
    
    categories_data = [
        {
            'name': 'Кольца',
            'slug': 'koltsa',
            'description': 'Элегантные кольца для любого случая',
            'image': None,
            'is_active': True,
            'order': 1
        },
        {
            'name': 'Серьги',
            'slug': 'sergi',
            'description': 'Красивые серьги для создания стильного образа',
            'image': None,
            'is_active': True,
            'order': 2
        },
        {
            'name': 'Колье',
            'slug': 'kole',
            'description': 'Изысканные колье для особых случаев',
            'image': None,
            'is_active': True,
            'order': 3
        },
        {
            'name': 'Браслеты',
            'slug': 'braslety',
            'description': 'Стильные браслеты для завершения образа',
            'image': None,
            'is_active': True,
            'order': 4
        },
        {
            'name': 'Цепочки',
            'slug': 'tsepochki',
            'description': 'Элегантные цепочки для повседневной носки',
            'image': None,
            'is_active': True,
            'order': 5
        }
    ]
    
    created_categories = []
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        if created:
            print(f"✓ Создана категория: {category.name}")
        else:
            print(f"✓ Категория уже существует: {category.name}")
        created_categories.append(category)
    
    # Создание продуктов
    print("Создание продуктов...")
    
    products_data = [
        {
            'name': 'Кольцо "Романтика"',
            'slug': 'koltsa-romantika',
            'description': 'Элегантное кольцо с камнем для романтических случаев',
            'price': 15000.00,
            'category': created_categories[0],  # Кольца
            'is_active': True,
            'is_featured': True,
            'sku': 'RING-001'
        },
        {
            'name': 'Серьги "Звездочка"',
            'slug': 'sergi-zvezdochka',
            'description': 'Красивые серьги в форме звездочки',
            'price': 12000.00,
            'category': created_categories[1],  # Серьги
            'is_active': True,
            'is_featured': True,
            'sku': 'EARR-001'
        },
        {
            'name': 'Колье "Элегант"',
            'slug': 'kole-elegant',
            'description': 'Изысканное колье для особых случаев',
            'price': 25000.00,
            'category': created_categories[2],  # Колье
            'is_active': True,
            'is_featured': True,
            'sku': 'NECK-001'
        },
        {
            'name': 'Браслет "Гармония"',
            'slug': 'braslet-garmoniya',
            'description': 'Стильный браслет для повседневной носки',
            'price': 18000.00,
            'category': created_categories[3],  # Браслеты
            'is_active': True,
            'is_featured': True,
            'sku': 'BRAC-001'
        },
        {
            'name': 'Цепочка "Классика"',
            'slug': 'tsepochka-klassika',
            'description': 'Элегантная цепочка для любого случая',
            'price': 8000.00,
            'category': created_categories[4],  # Цепочки
            'is_active': True,
            'is_featured': True,
            'sku': 'CHAIN-001'
        }
    ]
    
    for prod_data in products_data:
        product, created = Product.objects.get_or_create(
            slug=prod_data['slug'],
            defaults=prod_data
        )
        if created:
            print(f"✓ Создан продукт: {product.name}")
        else:
            print(f"✓ Продукт уже существует: {product.name}")
    
    print("\n✓ Все моковые данные для продуктов успешно созданы!")

if __name__ == '__main__':
    create_products_data()
