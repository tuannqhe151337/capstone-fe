# syntax=docker/dockerfile:1.7-labs
FROM node:alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY --exclude=nginx.conf . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]



