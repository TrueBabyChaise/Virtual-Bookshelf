FROM node:16

RUN mkdir /client
COPY . /client
WORKDIR /client

RUN npm install
RUN npm run build

EXPOSE 3000

CMD bash start.sh