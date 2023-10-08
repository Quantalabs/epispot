#!/bin/bash

# abort on errors
set -e
# install dependencies
yarn
# build static files
yarn docs:build
# navigate into the build output directory
cd docs/.vuepress/dist
# create a fresh new git repo in the output directory
git init
git add -A
git commit -m 'docs: generate new documentation'
# Force push to the "publishing source" of your GitHub pages site
# in this case, the gh-pages branch
git push -f git@github.com:epispot/epispot-new.git main:gh-pages
# Back to previous directory (the root of your repo)
cd -