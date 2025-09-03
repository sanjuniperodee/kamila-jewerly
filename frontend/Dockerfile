FROM node:18-alpine

WORKDIR /app

# Копирование package.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование .env файла из корня проекта
COPY .env .env

# Копирование кода приложения
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
