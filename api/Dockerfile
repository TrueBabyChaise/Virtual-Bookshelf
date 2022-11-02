FROM node:16

RUN mkdir /client
COPY . /api
WORKDIR /api

RUN npm install

EXPOSE 3001

CMD bash start.sh