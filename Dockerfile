FROM node:23-alpine

COPY . /rps-dev

WORKDIR /rps-dev

RUN npm i

EXPOSE 5173

CMD ["npm", "run", "host"]
