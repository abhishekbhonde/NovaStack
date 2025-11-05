FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Copy the .env file inside the container
COPY .env .env

EXPOSE 5000

CMD ["node", "dist/server.js"]
