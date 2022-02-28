FROM node:17 As development

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN npx prisma generate

RUN yarn build

FROM node:17 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"] 