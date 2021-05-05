# Stage 1 - the build process
FROM node:12 as build-deps
WORKDIR /usr/src/app
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
COPY yarn.lock ./
# Installs all node packages
RUN yarn install --frozen-lockfile
# Copies everything over to Docker environment
COPY . .
# init env
RUN yarn init-env

RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
