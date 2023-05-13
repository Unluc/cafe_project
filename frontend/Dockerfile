FROM node:16-alpine

WORKDIR /app/frontend/

COPY package*.json /app/frontend/
# COPY ./frontend/package.json ./
# COPY ./frontend/package-lock.json ./
# RUN npm install
RUN npm ci --silent

COPY . /app/frontend/
# COPY ./frontend/ ./

CMD ["npm", "start"]