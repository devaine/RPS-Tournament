FROM node:23-alpine

COPY . /rps-dev

WORKDIR /rps-dev

RUN npm i #--omit=dev <- use that arg for production

EXPOSE 5176

CMD ["npm", "run", "dev"]
