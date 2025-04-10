FROM node:23-alpine

COPY . /rps-dev

WORKDIR /rps-dev

RUN npm i #--omit=dev <- use that arg for production

EXPOSE 3001

RUN npm run build

CMD ["npm", "run", "host"]
