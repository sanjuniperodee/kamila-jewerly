#!/bin/bash

# KAMIL Jewelry Deployment Script
# Скрипт для развертывания проекта на сервере

set -e

echo "🚀 Начинаем развертывание KAMIL Jewelry..."

# Проверка Docker и Docker Compose
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Установите Docker и повторите попытку."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен. Установите Docker Compose и повторите попытку."
    exit 1
fi

# Остановка существующих контейнеров
echo "🛑 Остановка существующих контейнеров..."
docker-compose down --remove-orphans

# Создание необходимых директорий
echo "📁 Создание директорий..."
mkdir -p nginx/ssl
mkdir -p backend/media
mkdir -p backend/staticfiles

# Сборка и запуск контейнеров
echo "🔨 Сборка контейнеров..."
docker-compose build --no-cache

echo "🚀 Запуск сервисов..."
docker-compose up -d

# Ожидание запуска сервисов
echo "⏳ Ожидание запуска сервисов..."
sleep 30

# Выполнение миграций Django
echo "🗄️  Применение миграций базы данных..."
docker-compose exec -T backend python manage.py migrate

# Сбор статических файлов
echo "📦 Сбор статических файлов..."
docker-compose exec -T backend python manage.py collectstatic --noinput

# Создание суперпользователя (интерактивно)
echo "👤 Создание суперпользователя для админ панели..."
echo "Введите данные для администратора:"
docker-compose exec backend python manage.py createsuperuser

# Проверка статуса сервисов
echo "🔍 Проверка статуса сервисов..."
docker-compose ps

# Проверка доступности
echo "🌐 Проверка доступности сервисов..."
sleep 5

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend доступен на http://localhost:3000"
else
    echo "❌ Frontend недоступен"
fi

if curl -f http://localhost:8000/api/health/ > /dev/null 2>&1; then
    echo "✅ Backend API доступен на http://localhost:8000"
else
    echo "❌ Backend API недоступен"
fi

if curl -f http://localhost/api/health/ > /dev/null 2>&1; then
    echo "✅ Nginx проксирует запросы корректно"
else
    echo "❌ Проблемы с Nginx"
fi

echo ""
echo "🎉 Развертывание завершено!"
echo ""
echo "📋 Доступные сервисы:"
echo "   • Frontend: http://localhost:3000"
echo "   • Backend API: http://localhost:8000"
echo "   • Admin Panel: http://localhost:8000/admin"
echo "   • Nginx (все в одном): http://localhost"
echo ""
echo "📝 Полезные команды:"
echo "   • Просмотр логов: docker-compose logs -f"
echo "   • Перезапуск: docker-compose restart"
echo "   • Остановка: docker-compose down"
echo "   • Обновление: git pull && docker-compose up -d --build"
echo ""
echo "🔧 Для продакшена не забудьте:"
echo "   • Настроить SSL сертификаты"
echo "   • Изменить SECRET_KEY в docker-compose.yml"
echo "   • Настроить домен в nginx.conf"
echo "   • Настроить резервное копирование БД"
