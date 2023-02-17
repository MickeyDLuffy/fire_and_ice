# node stage
FROM node:18.12.1-alpine as node
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install
COPY . .
RUN npm run build

# nginx stage
FROM nginx:alpine
EXPOSE 5000
COPY --from=node /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
