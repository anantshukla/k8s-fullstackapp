FROM node:16 as build
ARG REACT_APP_API_BASE_URL="/api"
ARG REACT_APP_SOCKET_BASE_URL="/"


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production environment
FROM nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]