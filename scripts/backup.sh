#!/bin/bash

# Скрипт резервного копирования базы данных

BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="kamil_jewelry"

# Создание директории для бэкапов
mkdir -p $BACKUP_DIR

# Создание бэкапа базы данных
echo "🗄️  Создание резервной копии базы данных..."
docker-compose exec -T db pg_dump -U postgres $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql

# Создание архива медиа файлов
echo "📷 Создание архива медиа файлов..."
tar -czf $BACKUP_DIR/media_backup_$DATE.tar.gz backend/media/

# Удаление старых бэкапов (старше 7 дней)
echo "🧹 Очистка старых бэкапов..."
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "✅ Резервное копирование завершено!"
echo "📁 Файлы сохранены в: $BACKUP_DIR"
