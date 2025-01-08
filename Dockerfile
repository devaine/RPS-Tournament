FROM node:lts-alpine as build
RUN npm install
RUN npm run build

FROM node:lts-alpine as production
RUN npm install
RUN npm run build
EXPOSE 88923
CMD ["npm", "run" ]
