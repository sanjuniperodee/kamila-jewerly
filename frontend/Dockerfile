FROM node:18-alpine

WORKDIR /app

# Копирование .env файла из корня проекта
COPY .env .env

# Копирование package.json из папки frontend
COPY frontend/package*.json ./

# Установка зависимостей
RUN npm install

# Копирование кода приложения из папки frontend
COPY frontend/ .

# Передача переменной окружения во время сборки
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Очистка кэша и сборка приложения
RUN rm -rf .next
RUN npm run build

# Открытие порта
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
