#! /usr/bin/env sh

PROJECTNAME="mainapp-dev"
PROJECTDIR=$(pwd)

docker run -it \
  -u $USER \
  -v $PROJECTDIR:/project \
  -v /project/node_modules \
  --expose=3000 --expose=3001 \
  -p 3000:3000 -p 3001:3001 -p 3030:3030 \
  $PROJECTNAME \
  yarn start
