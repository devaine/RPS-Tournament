FROM node:23-alpine

COPY . /rps-dev

WORKDIR /rps-dev

RUN npm i #--omit=dev <- use that arg for production

EXPOSE 3002

RUN npm run clean

RUN npm run format

RUN npm run build

CMD ["npm", "run", "host"]
