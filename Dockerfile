FROM node:23-alpine

COPY . /rps-dev

WORKDIR /rps-dev

# FOR DEVELOPMENT SERVER:
# If there is a docker secret under the name: DEV_URL
RUN --mount=type=secret,id=DEV_URL \
	if [ -f /run/secrets/DEV_URL ]; then \
		echo "DEV_URL=$(cat /run/secrets/DEV_URL)" >> .env; \
		echo "PORT=3002" >> .env; \
	fi

# FOR PRODUCTION SERVER:
# If there is a docker secret under the name: PROD_URL
#RUN --mount=type=secret,id=PROD_URL \
#	if [ -f /run/secrets/PROD_URL ]; then \
#		echo "PROD_URL=$(cat /run/secrets/PROD_URL)" >> .env; \
#		echo "PORT=3003" >> .env; \
# fi 

RUN npm i #--omit=dev <- use that arg for production

# Port 3002 = dev website
# Port 3003 = prod website
EXPOSE 3002

RUN npm run format

RUN npm run build

CMD ["npm", "run", "host"]
