FROM node:18.18-alpine3.18 as build
WORKDIR /app
COPY . .
RUN npm install -g @ionic/cli
RUN ionic cap sync
RUN npm ci
RUN ionic cap sync
RUN ionic build
FROM nginx 
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/www /usr/share/nginx/html
