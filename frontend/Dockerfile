FROM node:16-alpine

WORKDIR /app/frontend/

COPY package*.json /app/frontend/

RUN npm install react-dotenv

COPY . /app/frontend/

CMD ["npm", "start"]