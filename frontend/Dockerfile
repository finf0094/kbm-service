# Используем Node.js 20 в качестве базового образа
FROM node:20 as BUILD_IMAGE

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

FROM node:20 as PRODUCTION_IMAGE
WORKDIR /app/react-app

COPY --from=BUILD_IMAGE app/dist app/dist

EXPOSE 3000

COPY package.json .
COPY vite.config.ts .

RUN yarn add typescript

CMD ["yarn", "build"]
