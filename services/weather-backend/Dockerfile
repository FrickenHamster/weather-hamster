FROM node

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .ADD
EXPOSE 3000

ENV NODE_ENV=production

CMD [ "npm", "start" ]
