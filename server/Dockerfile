FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate

CMD ["npm", "run", "dev"]