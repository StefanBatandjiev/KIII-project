FROM node:latest

WORKDIR /usr/src/app

COPY e-shop/package*.json ./

RUN npm install

COPY e-shop .

EXPOSE 4000

CMD ["npm", "start"]
