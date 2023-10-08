#!/bin/bash

if [ "$2" = "" ]
then
    mkdir docstemp
    mv docs/.vuepress ./docstemp/
    mv docs/index.md ./docstemp/
    mv docs/guide ./docstemp/
    typedoc --plugin typedoc-plugin-markdown --out docs src/index.ts --hideBreadcrumbs true --hideInPageTOC true
    mkdir docs/api
    mv docs/modules.md docs/modules docs/api/
    mv docs/api/modules.md docs/api/reference.md
    echo -e "---\napi: true\n---" > docs/api/index.md
    mv ./docstemp/.vuepress docs/
    rm -rf docs/README.md
    mv ./docstemp/index.md docs/
    mv ./docstemp/guide docs/
    rm -rf docstemp
fi

if [ $1 = "build" ] 
then
    vuepress build docs
elif [ $1 = "dev" ] 
then
    vuepress dev docs
fi
