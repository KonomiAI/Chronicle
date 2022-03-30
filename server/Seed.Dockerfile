FROM node:17
RUN yarn global add prisma@3.10.0
COPY package.json ./
COPY prisma/* ./prisma/

RUN prisma generate
CMD ! npx prisma db push ... || npx prisma db seed