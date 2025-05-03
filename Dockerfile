FROM node:23-alpine

COPY . /rps-dev

WORKDIR /rps-dev

# For .env
RUN --mount=type=secret,id=DEV_URL echo DEV_URL=$(cat /run/secrets/DEV_URL) >> .env

RUN npm i #--omit=dev <- use that arg for production

# Port 3002 = dev website
# Port 3003 = prod website
EXPOSE 3002

RUN npm run format

RUN npm run build

CMD ["npm", "run", "host"]
