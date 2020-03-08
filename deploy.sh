#!/usr/bin/env sh

# this script is to deploy to <user-name>.github.io/<repo-name>
# @see https://cli.vuejs.org/guide/deployment.html#github-pages
# @see config/prod.env.js

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:binlecode/example-todo-vue.git master:gh-pages

cd -



