FROM node:14-slim

WORKDIR /var/app

COPY ./ ./

RUN yarn install

ENV PORT=3000

ENTRYPOINT ["yarn"]

CMD ["start"]
