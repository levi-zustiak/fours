FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]