#!/bin/sh
# Cut the opening film into stills the hero scrubs on scroll. One clip, or several shots that chain end-to-start:
#   sh scripts/intro-frames.sh shot1.mp4 [shot2.mp4 ...]      (FRAMES=60 per shot by default)
# Writes public/intro/f-001.jpg … ; the homepage counts them, turns the film on, and lengthens the scroll to fit.
# Delete public/intro to turn the film off.
set -e
[ $# -gt 0 ] || { echo "usage: sh scripts/intro-frames.sh shot1.mp4 [shot2.mp4 ...]"; exit 1; }
N=${FRAMES:-60}
rm -rf public/intro && mkdir -p public/intro
for IN in "$@"; do
  DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
  K=$(( $(ls public/intro | wc -l) + 1 ))
  ffmpeg -v error -i "$IN" -vf "fps=$N/$DUR,scale=1600:-2:flags=lanczos" -frames:v "$N" -q:v 4 -start_number "$K" public/intro/f-%03d.jpg
done
echo "$(ls public/intro | wc -l | tr -d ' ') frames, $(du -sh public/intro | cut -f1) in public/intro"
