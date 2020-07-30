FROM mhart/alpine-node:11

ARG uid=1000
ARG user

RUN adduser -DS -u $uid $user
RUN echo $user' ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

WORKDIR /external

RUN yarn global add node-gyp
RUN mkdir /project

WORKDIR /project

COPY package.json package*.json ./
COPY . .

RUN npm i -g yarn
RUN yarn

CMD [ "npm", "start" ]

FROM mhart/alpine-node
RUN yarn global add serve
CMD ["serve", "-p", "80", "-s", "."]
