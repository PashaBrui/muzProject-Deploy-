FROM node:alpine


COPY . .

WORKDIR ./

RUN npm install

RUN npm run dev

EXPOSE 3000

CMD ["npm", "dev"]
