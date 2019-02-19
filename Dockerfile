FROM node:11 as builder

WORKDIR /AnyLogger

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY --from=builder /AnyLogger/dist/* /usr/share/nginx/html/

EXPOSE 80

