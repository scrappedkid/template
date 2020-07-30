#! /usr/bin/env sh

 PROJECTNAME="mainapp-dev"
 PROJECTDIR=$(pwd)

 docker build \
   --build-arg user=$USER \
   --build-arg uid=$(id -u $USER) \
   -f $PROJECTDIR/Dockerfile \
   -t $PROJECTNAME $PROJECTDIR

gcloud builds submit --tag gcr.io/allineedcorp-dev/mainapp-dev
