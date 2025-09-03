from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Пока оставим пустым, так как используем систему без регистрации
# В будущем здесь можно добавить views для пользователей если потребуется

@api_view(['GET'])
def health_check(request):
    """Проверка работоспособности API"""
    return Response({'status': 'OK', 'message': 'KAMIL Jewelry API is running'})
