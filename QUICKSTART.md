# 🚀 Быстрый запуск KAMIL Jewelry

## Требования

- Docker и Docker Compose
- Git
- 4GB RAM минимум
- 10GB свободного места на диске

## Автоматический запуск (рекомендуется)

```bash
# 1. Клонирование проекта
git clone https://github.com/your-username/kamila-jewerly.git
cd kamila-jewerly

# 2. Запуск автоматического развертывания
chmod +x deploy.sh
./deploy.sh
```

Скрипт автоматически:
- Проверит наличие Docker
- Создаст необходимые директории
- Соберет и запустит все контейнеры
- Применит миграции базы данных
- Соберет статические файлы
- Предложит создать суперпользователя

## Ручной запуск

Если хотите контролировать каждый шаг:

```bash
# 1. Клонирование
git clone https://github.com/your-username/kamila-jewerly.git
cd kamila-jewerly

# 2. Создание директорий
mkdir -p nginx/ssl backend/media backend/staticfiles

# 3. Запуск сервисов
docker-compose up -d --build

# 4. Ожидание запуска (30-60 секунд)
sleep 30

# 5. Применение миграций
docker-compose exec backend python manage.py migrate

# 6. Сбор статических файлов
docker-compose exec backend python manage.py collectstatic --noinput

# 7. Создание администратора
docker-compose exec backend python manage.py createsuperuser
```

## Проверка работы

После запуска откройте в браузере:

- **Сайт**: http://localhost
- **Админ панель**: http://localhost/admin
- **API**: http://localhost/api/health/

## Первые шаги

1. **Войдите в админ панель** (http://localhost/admin)
2. **Создайте категории товаров**:
   - Ручная работа (slug: ruchnaya-rabota)
   - Бижутерия (slug: bijouteriya)
   - Серебро (slug: serebro)

3. **Добавьте товары** с фотографиями

4. **Настройте контактную информацию** в коде

## Возможные проблемы

### Порты заняты
```bash
# Проверить какие порты заняты
sudo lsof -i :80
sudo lsof -i :3000
sudo lsof -i :8000

# Остановить процессы или изменить порты в docker-compose.yml
```

### Ошибки Docker
```bash
# Очистить все контейнеры и начать заново
docker-compose down -v --remove-orphans
docker system prune -a

# Перезапустить Docker
sudo systemctl restart docker
```

### Проблемы с базой данных
```bash
# Пересоздать базу данных
docker-compose down
docker volume rm kamila-jewerly_postgres_data
docker-compose up -d
```

## Полезные команды

```bash
# Просмотр логов
docker-compose logs -f

# Перезапуск отдельного сервиса
docker-compose restart backend

# Остановка всех сервисов
docker-compose down

# Обновление проекта
git pull && docker-compose up -d --build
```

## Следующие шаги

1. Настройте домен и SSL для продакшена
2. Добавьте товары через админ панель
3. Настройте аналитику (Google Analytics, Yandex Metrica)
4. Настройте резервное копирование
5. Протестируйте все функции сайта

## Поддержка

Если что-то не работает:
1. Проверьте логи: `docker-compose logs -f`
2. Убедитесь что все порты свободны
3. Проверьте что Docker запущен
4. Обратитесь за поддержкой

---

🎉 **Поздравляем! Ваш сайт KAMIL Jewelry готов к работе!**
