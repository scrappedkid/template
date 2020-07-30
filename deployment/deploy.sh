#!/usr/bin/env bash

# NPM prepare things
npm install
npm run build

# Launch on development server deployment
gcloud beta run deploy --image gcr.io/allineedcorp-dev/mainapp-dev
