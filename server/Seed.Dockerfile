FROM chronicle-api:1.0.0
RUN yarn global add prisma@3.10.0
COPY package.json ./
COPY prisma/* ./prisma/

RUN prisma generate
CMD prisma db seed