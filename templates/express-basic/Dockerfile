FROM mhart/alpine-node:10

WORKDIR /opt/app
ADD . /opt/app/

RUN npm install -g npm@latest
RUN npm install --only=production && npm install -g pm2 && echo "building server done"

ENV NODE_ENV production
EXPOSE 3000
CMD ["pm2", "start", "--no-daemon", "./bin/www"]
