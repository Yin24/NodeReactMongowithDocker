
FROM node:14

WORKDIR /clientapp

COPY package*.json /clientapp/

RUN npm install

COPY . /clientapp/

EXPOSE 3000

CMD ["npm", "start"]