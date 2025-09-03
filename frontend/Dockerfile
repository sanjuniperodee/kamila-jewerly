FROM node:18-alpine

WORKDIR /app

# Копирование package.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование кода приложения
COPY . .

# Передача переменной окружения во время сборки
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Сборка приложения
RUN npm run build

# Открытие порта
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
