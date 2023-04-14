#!/bin/bash

FROM_FOLDER=$1
OUT_FOLDER=${2:-.}

[ -d ${OUT_FOLDER} ] || mkdir ${OUT_FOLDER}

for d in $FROM_FOLDER/*; do
  if [ -d "$d" ]; then
      if [ -d "$d/dist" ]; then
        last=${d##*/}
        
        mkdir -p ${OUT_FOLDER}/${last}/{dist,node_modules}
        cp -r "$d/dist" "${OUT_FOLDER}/${last}"
        cp -r "$d/package.json" "${OUT_FOLDER}/${last}"
        
        [ -d "${d}/node_modules" ] && cp -r "$d/node_modules" "${OUT_FOLDER}/${last}"
        
      fi
  fi
done