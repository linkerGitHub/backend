FROM node:14-alpine
WORKDIR /app/meedu-backend

COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org \
    && yarn install \
    && npm install -g hey-cli

COPY . .

CMD ["hey", "build"]
