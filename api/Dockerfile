FROM node:16

RUN mkdir /api
COPY . /api
WORKDIR /api

RUN npm install nodemon --save-dev
RUN npm install

EXPOSE 3001

CMD bash start.sh