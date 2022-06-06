FROM node:16-alpine
WORKDIR /usr/app
COPY . .
RUN yarn
EXPOSE 3333
CMD ["yarn", "run"]