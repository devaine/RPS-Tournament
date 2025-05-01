FROM node:23-alpine

COPY . /rps-dev

WORKDIR /rps-dev

RUN npm i #--omit=dev <- use that arg for production

# Port 3001 = dev website
# Port 3002 = prod website

EXPOSE 3001 

RUN --mount=type=secret,id=dev_url,env=DEV_URL \
	cat $DEV_URL >> .env

RUN npm run format

RUN npm run build

CMD ["npm", "run", "host"]
