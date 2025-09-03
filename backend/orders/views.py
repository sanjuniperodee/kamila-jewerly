from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from products.models import Product, ProductVariant
from .models import Cart, CartItem, Order, OrderItem
from .serializers import (
    CartSerializer, AddToCartSerializer, UpdateCartItemSerializer,
    OrderSerializer, CreateOrderSerializer
)
import uuid


def get_or_create_session_key(request):
    """Получить или создать session key для устройства"""
    session_key = request.session.get('cart_session_key')
    if not session_key:
        session_key = str(uuid.uuid4())
        request.session['cart_session_key'] = session_key
        request.session.save()
    return session_key


@api_view(['GET'])
def get_cart(request):
    """Получить корзину текущего пользователя"""
    session_key = get_or_create_session_key(request)
    cart, created = Cart.objects.get_or_create(session_key=session_key)
    serializer = CartSerializer(cart, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
def add_to_cart(request):
    """Добавить товар в корзину"""
    serializer = AddToCartSerializer(data=request.data)
    if serializer.is_valid():
        session_key = get_or_create_session_key(request)
        cart, created = Cart.objects.get_or_create(session_key=session_key)
        
        product_id = serializer.validated_data['product_id']
        product_variant_id = serializer.validated_data.get('product_variant_id')
        quantity = serializer.validated_data['quantity']
        
        try:
            product = Product.objects.get(id=product_id, is_active=True)
            product_variant = None
            if product_variant_id:
                product_variant = ProductVariant.objects.get(id=product_variant_id, product=product, is_active=True)
        except (Product.DoesNotExist, ProductVariant.DoesNotExist):
            return Response({'error': 'Товар не найден'}, status=status.HTTP_404_NOT_FOUND)
        
        # Проверяем, есть ли уже этот товар в корзине
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            product_variant=product_variant,
            defaults={'quantity': quantity}
        )
        
        if not created:
            # Если товар уже есть, увеличиваем количество
            cart_item.quantity += quantity
            cart_item.save()
        
        cart_serializer = CartSerializer(cart, context={'request': request})
        return Response(cart_serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_cart_item(request, item_id):
    """Обновить количество товара в корзине"""
    session_key = get_or_create_session_key(request)
    try:
        cart_item = CartItem.objects.get(
            id=item_id,
            cart__session_key=session_key
        )
    except CartItem.DoesNotExist:
        return Response({'error': 'Товар не найден в корзине'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UpdateCartItemSerializer(data=request.data)
    if serializer.is_valid():
        cart_item.quantity = serializer.validated_data['quantity']
        cart_item.save()
        
        cart_serializer = CartSerializer(cart_item.cart, context={'request': request})
        return Response(cart_serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def remove_from_cart(request, item_id):
    """Удалить товар из корзины"""
    session_key = get_or_create_session_key(request)
    try:
        cart_item = CartItem.objects.get(
            id=item_id,
            cart__session_key=session_key
        )
        cart = cart_item.cart
        cart_item.delete()
        
        cart_serializer = CartSerializer(cart, context={'request': request})
        return Response(cart_serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error': 'Товар не найден в корзине'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def clear_cart(request):
    """Очистить корзину"""
    session_key = get_or_create_session_key(request)
    try:
        cart = Cart.objects.get(session_key=session_key)
        cart.items.all().delete()
        cart_serializer = CartSerializer(cart, context={'request': request})
        return Response(cart_serializer.data)
    except Cart.DoesNotExist:
        return Response({'items': [], 'total_amount': 0, 'total_items': 0})


@api_view(['POST'])
def create_order(request):
    """Создать заказ из корзины"""
    session_key = get_or_create_session_key(request)
    
    try:
        cart = Cart.objects.get(session_key=session_key)
        if not cart.items.exists():
            return Response({'error': 'Корзина пуста'}, status=status.HTTP_400_BAD_REQUEST)
    except Cart.DoesNotExist:
        return Response({'error': 'Корзина не найдена'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = CreateOrderSerializer(data=request.data)
    if serializer.is_valid():
        # Создаем заказ
        order = serializer.save(
            session_key=session_key,
            total_amount=cart.total_amount
        )
        
        # Переносим товары из корзины в заказ
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                product_variant=cart_item.product_variant,
                quantity=cart_item.quantity
            )
        
        # Очищаем корзину
        cart.items.all().delete()
        
        order_serializer = OrderSerializer(order, context={'request': request})
        return Response(order_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_orders(request):
    """Получить заказы текущего пользователя"""
    session_key = get_or_create_session_key(request)
    orders = Order.objects.filter(session_key=session_key).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def get_order(request, order_number):
    """Получить конкретный заказ"""
    session_key = get_or_create_session_key(request)
    try:
        order = Order.objects.get(order_number=order_number, session_key=session_key)
        serializer = OrderSerializer(order, context={'request': request})
        return Response(serializer.data)
    except Order.DoesNotExist:
        return Response({'error': 'Заказ не найден'}, status=status.HTTP_404_NOT_FOUND)
