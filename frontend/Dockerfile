FROM node:18-alpine

WORKDIR /app

# Копирование package.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование кода приложения
COPY . .

# Сборка приложения
RUN npm run build

# Открытие порта
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
