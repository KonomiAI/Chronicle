FROM node:16 As build

WORKDIR /usr/src/app

COPY package*.json yarn.lock . ./

RUN yarn

RUN yarn build

FROM nginx:1.21.6 as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist .

COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf
