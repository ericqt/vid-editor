FROM node:21

WORKDIR /var/app

RUN apt-get -y update && apt-get -y upgrade

RUN apt-get install -y ffmpeg

COPY package.json ./

RUN yarn install

COPY ./ ./

ENV PORT=3000

ENTRYPOINT ["yarn"]

CMD ["start"]
