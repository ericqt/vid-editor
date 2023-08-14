FROM node:20.5.1-slim

WORKDIR /var/app

COPY ./ ./

RUN yarn install

ENV PORT=80

ENTRYPOINT ["yarn"]

CMD ["start"]
