FROM node:17
RUN yarn global add prisma@3.12.0
COPY package.json ./
COPY prisma/ ./prisma/

RUN prisma generate
# This is a awful hack to ensure the database is ready before we run the migrations
# This is a hack because we should be using a healthcheck
CMD sleep 10; ! npx prisma db push ... || npx prisma db seed