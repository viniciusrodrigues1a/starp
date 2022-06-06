FROM node:16-alpine
WORKDIR /usr/app
COPY . .
RUN yarn
RUN yarn prisma generate --schema src/shared/infrastructure/database/schema.prisma
EXPOSE 3333
CMD yarn migrate && yarn dev
