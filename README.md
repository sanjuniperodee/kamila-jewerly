# KAMIL Jewelry E-commerce Platform

Полноценный e-commerce сайт для KAMIL Jewelry, построенный на Next.js и Django с системой заказов без регистрации.

## 🚀 Технологии

### Frontend
- **Next.js 14** - React фреймворк с SSR/SSG
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **Framer Motion** - Анимации
- **React Query** - Управление состоянием API

### Backend
- **Django 4.2** - Python веб-фреймворк
- **Django REST Framework** - API
- **PostgreSQL** - База данных
- **Django Admin** - Панель администрирования

### DevOps
- **Docker & Docker Compose** - Контейнеризация
- **Nginx** - Reverse proxy и статические файлы
- **Gunicorn** - WSGI сервер

## ✨ Основные функции

- 🛍️ **Каталог товаров** с категориями и фильтрацией
- 🔍 **Поиск** по названию и описанию товаров
- 🛒 **Корзина покупок** без регистрации (по session)
- 📱 **Адаптивный дизайн** для всех устройств
- 🎨 **Админ панель** для управления товарами и заказами
- 📧 **Интеграция** с WhatsApp и Instagram
- 🚀 **SEO оптимизация** с meta-тегами и структурированными данными
- 📊 **Аналитика** готовность для Google Analytics/Yandex Metrica

## 🏃‍♂️ Быстрый старт

### Автоматическое развертывание

```bash
# Клонирование проекта
git clone <repository-url>
cd kamila-jewerly

# Запуск скрипта развертывания
chmod +x deploy.sh
./deploy.sh
```

### Ручное развертывание

```bash
# 1. Сборка и запуск всех сервисов
docker-compose up -d --build

# 2. Применение миграций
docker-compose exec backend python manage.py migrate

# 3. Сбор статических файлов
docker-compose exec backend python manage.py collectstatic --noinput

# 4. Создание суперпользователя
docker-compose exec backend python manage.py createsuperuser
```

## 🌐 Доступ к сервисам

После запуска сервисы будут доступны по следующим адресам:

- **🎨 Сайт**: http://localhost (через Nginx)
- **⚛️ Frontend**: http://localhost:3000 (прямой доступ)
- **🔧 Backend API**: http://localhost:8000 (прямой доступ)
- **👑 Admin Panel**: http://localhost:8000/admin
- **🗄️ PostgreSQL**: localhost:5432

## 📁 Структура проекта

```
kamila-jewerly/
├── 📂 frontend/              # Next.js приложение
│   ├── 📂 app/              # App Router (Next.js 13+)
│   ├── 📂 components/       # React компоненты
│   ├── 📂 lib/             # Утилиты и хуки
│   └── 📄 package.json
├── 📂 backend/              # Django приложение
│   ├── 📂 kamil_jewelry/   # Основные настройки Django
│   ├── 📂 products/        # Приложение товаров
│   ├── 📂 orders/          # Приложение заказов
│   ├── 📂 users/           # Приложение пользователей
│   └── 📄 requirements.txt
├── 📂 nginx/               # Nginx конфигурация
├── 📂 scripts/             # Скрипты для развертывания
├── 📄 docker-compose.yml   # Docker Compose конфигурация
├── 📄 deploy.sh           # Скрипт автоматического развертывания
└── 📄 README.md
```

## 🛠️ Полезные команды

### Разработка
```bash
# Просмотр логов всех сервисов
docker-compose logs -f

# Просмотр логов конкретного сервиса
docker-compose logs -f backend

# Перезапуск сервисов
docker-compose restart

# Остановка всех сервисов
docker-compose down

# Полная очистка (включая volumes)
docker-compose down -v --remove-orphans
```

### Обновление проекта
```bash
# Автоматическое обновление
./scripts/update.sh

# Или вручную
git pull origin main
docker-compose down
docker-compose up -d --build
```

### Резервное копирование
```bash
# Создание бэкапа
./scripts/backup.sh

# Восстановление из бэкапа
docker-compose exec -T db psql -U postgres kamil_jewelry < backup.sql
```

## 🚀 Развертывание на продакшене

### 1. Подготовка сервера
```bash
# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Настройка окружения
Отредактируйте `docker-compose.yml`:
- Измените `DJANGO_SECRET_KEY`
- Настройте `DJANGO_ALLOWED_HOSTS`
- Добавьте ваш домен в `CORS_ALLOWED_ORIGINS`

### 3. Настройка домена
Отредактируйте `nginx/nginx.conf`:
- Замените `localhost` на ваш домен
- Настройте SSL сертификаты

### 4. SSL сертификаты (Let's Encrypt)
```bash
# Установка certbot
sudo apt install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Автоматическое обновление
sudo crontab -e
# Добавьте: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔧 Система без регистрации

Проект использует инновационную систему заказов без регистрации:

- **Session-based корзина**: Товары сохраняются по session key
- **Заказы по устройству**: История заказов привязана к браузеру/устройству
- **Простота использования**: Клиенты могут заказывать сразу
- **Конфиденциальность**: Минимум персональных данных

## 📊 SEO оптимизация

Сайт полностью оптимизирован для поисковых систем:

- ✅ **Meta теги** для всех страниц
- ✅ **Open Graph** и Twitter Cards
- ✅ **Структурированные данные** (JSON-LD)
- ✅ **Sitemap.xml** и robots.txt
- ✅ **Семантическая разметка** HTML
- ✅ **Оптимизация изображений**
- ✅ **Быстрая загрузка** (Next.js SSG/SSR)

## 🎨 Дизайн

- **Современный UI/UX** с акцентом на ювелирные изделия
- **Адаптивная верстка** для всех устройств
- **Анимации** для улучшения пользовательского опыта
- **Доступность** (WCAG 2.1)
- **Темная/светлая тема** (опционально)

## 📞 Интеграции

- **WhatsApp** - прямая связь с клиентами
- **Instagram** - социальные сети
- **2GIS** - карты и навигация
- **Email** - уведомления о заказах

## 🔒 Безопасность

- **CORS** настройки
- **Rate limiting** для API
- **Security headers** через Nginx
- **SQL injection** защита через Django ORM
- **XSS** защита

## 📈 Мониторинг

Готовность для интеграции:
- Google Analytics 4
- Yandex Metrica
- Sentry (error tracking)
- Logs aggregation

## 🤝 Поддержка

Для технической поддержки:
- 📧 Email: support@kamiljewelry.kz
- 📱 WhatsApp: +7 705 129 35 00
- 💬 Telegram: @kamil_jewelry_support

## 📄 Лицензия

© 2024 KAMIL Jewelry. Все права защищены.

---

**Создано с ❤️ для KAMIL Jewelry**
