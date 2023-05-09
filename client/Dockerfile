FROM node:16

RUN mkdir /client
COPY . /client
WORKDIR /client

RUN npm install

#RUN if [ ! test -d "node_modules" ]; then; RUN npm install; fi

EXPOSE 3000

CMD bash start.sh