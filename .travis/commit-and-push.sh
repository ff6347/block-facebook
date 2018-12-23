#!/bin/sh
TODAY=$(date)
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git config --global push.default current
git stash
git checkout master
git stash pop
git add block-facebook.lsrules
git commit "auto-update with travis ${TODAY}"
git push https://${TRAVIS_DEPLOY_TOKEN}@github.com/fabianmoronzirfas/block-facebook.git

