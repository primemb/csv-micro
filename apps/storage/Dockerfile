FROM node:20 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run generate:users

RUN npm run build storage

FROM node:20 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install


COPY . .

RUN npm run generate:users

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/storage/main"]