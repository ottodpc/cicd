FROM node:18-alpine as build

WORKDIR /app
COPY package.json . 
COPY yarn.lock . 
RUN yarn install

COPY . .
RUN npx eslint --fix src/ || true
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]