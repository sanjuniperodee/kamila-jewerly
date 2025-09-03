#!/bin/bash

# Скрипт обновления проекта

set -e

echo "🔄 Обновление KAMIL Jewelry..."

# Создание бэкапа перед обновлением
echo "💾 Создание резервной копии..."
./scripts/backup.sh

# Получение обновлений из Git
echo "📥 Получение обновлений..."
git pull origin main

# Пересборка и перезапуск контейнеров
echo "🔨 Пересборка контейнеров..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Ожидание запуска
echo "⏳ Ожидание запуска сервисов..."
sleep 30

# Применение миграций
echo "🗄️  Применение миграций..."
docker-compose exec -T backend python manage.py migrate

# Сбор статических файлов
echo "📦 Сбор статических файлов..."
docker-compose exec -T backend python manage.py collectstatic --noinput

# Проверка статуса
echo "🔍 Проверка статуса..."
docker-compose ps

echo "✅ Обновление завершено!"
