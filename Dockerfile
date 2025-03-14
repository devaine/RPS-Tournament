FROM node:23-alpine

COPY . /rps-dev

WORKDIR /rps-dev

RUN npm i #--omit=dev <- use that arg for production

EXPOSE 5173

CMD ["npm", "run", "host"]
