#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# this assumes build content is in docs folder
# please check config/index.js and config/prod.env.js
# if you are deploying to a custom domain
git add docs
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git push -f git@github.com:binlecode/example-todo-vue.git

cd -
