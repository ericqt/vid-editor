FROM node:24

WORKDIR /var/app

RUN apt-get -y update && apt-get -y upgrade

ADD https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-n7.1-latest-linux64-gpl-7.1.tar.xz /var/app

RUN tar -xvf ./ffmpeg-n7.1-latest-linux64-gpl-7.1.tar.xz && \
    mv ffmpeg-n7.1-latest-linux64-gpl-7.1 ffmpeg  && \
    rm ffmpeg-n7.1-latest-linux64-gpl-7.1.tar.xz

COPY package.json ./

RUN yarn install

COPY ./ ./

ENV FFMPEG_PATH=/var/app/ffmpeg/bin/ffmpeg
ENV FFPROBE_PATH=/var/app/ffmpeg/bin/ffprobe

ENV PORT=3000

ENTRYPOINT ["yarn"]

CMD ["start"]
