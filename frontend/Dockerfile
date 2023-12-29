FROM node:21-slim

WORKDIR /var/app

COPY ./ ./

RUN yarn install

RUN npx browserslist@latest --update-db

ENV PORT=80

ENTRYPOINT ["yarn"]

CMD ["start"]
