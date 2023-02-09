FROM node:16

RUN mkdir /api
COPY . /api
WORKDIR /api

RUN npm install nodemon --save-dev
RUN npm install

#RUN if [ "$ENV" = "development" ]; then RUN npm install nodemon --save-dev
#RUN if [ ! test -d "node_modules" ]; then RUN npm install

EXPOSE 3001

CMD bash start.sh