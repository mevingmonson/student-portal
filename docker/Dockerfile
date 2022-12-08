# Fetching the latest node image on apline linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# COPY . /app

RUN mkdir -p /app
WORKDIR /app
# for alpine "RUN apk update"
RUN apk update

RUN apk add git


RUN git clone https://github.com/mevingmonson/student-portal.git

WORKDIR /app/student-portal

RUN npm install
RUN npm start



EXPOSE 3000