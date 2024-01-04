# Этап 1: Сборка проекта
FROM node:20 AS build-stage

WORKDIR /app

# Копирование файлов `package.json` и `yarn.lock` (или `package-lock.json` для npm)
COPY package.json yarn.lock ./

# Установка зависимостей
RUN yarn install

# Копирование исходного кода проекта
COPY . .

# Сборка приложения
RUN yarn build

# Этап 2: Настройка веб-сервера
FROM nginx:stable-alpine as production-stage

# Копирование сбилженных файлов из предыдущего этапа
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Открытие порта 80 для доступа к серверу
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]