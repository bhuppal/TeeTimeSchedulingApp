FROM node:17

# Label details
LABEL version="1.0"
LABEL description="Golf tee time scheduling app backend service API, base image."
LABEL maintainer = ["bhuppal@hotmail.com", "bhuppal@gmail.com"]

# working Dir
WORKDIR /usr/src/app

# copy Package Json files
COPY ["package.json", "package-lock.json", "./"]

RUN ls

# Install files
RUN npm install --production

# Copy course files into working dir
COPY . .

# Expose Golf Tee Time Service API
EXPOSE 5100

CMD ["node", "app.js"]