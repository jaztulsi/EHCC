#!/bin/sh
# Cut the Wan take into the hero's scroll film.  Usage: sh scripts/intro-frames.sh intro.mp4 [frames=72]
# Writes public/intro/f-001.jpg … ; the homepage counts them and turns the film on. Delete public/intro to turn it off.
set -e
IN=${1:?usage: sh scripts/intro-frames.sh intro.mp4 [frames]}
N=${2:-72}
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
rm -rf public/intro && mkdir -p public/intro
ffmpeg -v error -i "$IN" -vf "fps=$N/$DUR,scale=1600:-2:flags=lanczos" -frames:v "$N" -q:v 4 public/intro/f-%03d.jpg
echo "$(ls public/intro | wc -l | tr -d ' ') frames, $(du -sh public/intro | cut -f1) in public/intro"
