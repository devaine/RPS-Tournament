FROM ubuntu:latest

RUN apt update -y && apt upgrade -y

RUN apt install npm -y

COPY . /rps-dev

WORKDIR /rps-dev

RUN npm i

EXPOSE 5173

CMD ["npm", "run", "host"]
