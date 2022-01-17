FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY ./movies .
EXPOSE 3000
CMD [ "node", "app.js" ]