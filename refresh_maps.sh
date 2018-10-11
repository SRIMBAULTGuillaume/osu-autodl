#!/bin/bash
while [ 1 ]; do
    ls $(xdg-user-dir DOWNLOAD)/osu | grep osz | grep -v .part

    for f in $(ls $(xdg-user-dir DOWNLOAD)/osu | sed 's/ /_/g' | grep .osz | grep -v .part) ;  do
        if [ -s $(xdg-user-dir DOWNLOAD)/osu/$f ]
        then
            mv $(xdg-user-dir DOWNLOAD)/osu/"$f" $(xdg-user-dir)/Games/osu/data/prefix/drive_c/Program\ Files/osu!/Songs/
        fi
    done

    sleep 1
done