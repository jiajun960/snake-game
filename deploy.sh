#!/usr/bin/env sh

# 中止脚本
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist

# 放置 .nojekyll 以绕过 Jekyll 的处理。
touch .nojekyll

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/jiajun960/snake-game.git main:gh-pages

cd -