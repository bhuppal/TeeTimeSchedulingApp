FROM node:alpine as builder

# Label details
LABEL version="1.0"
LABEL description="Golf tee time scheduling app frontend app, base image."
LABEL maintainer = ["bhuppal@hotmail.com", "bhuppal@gmail.com"]

# working Dir
WORKDIR /app

# copy Package Json files
COPY ["package.json", "package-lock.json", "./"]

# Install files
RUN npm install --production

# Copy course files into working dir
COPY . .

# Expose Golf Tee Time Service API
EXPOSE 3000

# build the folder
RUN npm run build

# Handle Nginx
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf