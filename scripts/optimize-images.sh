#!/bin/bash

# Image Optimization Script for WebP conversion
# This script converts all JPG/PNG images to WebP format for better performance
# Requires imagemagick: brew install imagemagick

if ! command -v convert &> /dev/null; then
    echo "ImageMagick not installed. Install with: brew install imagemagick"
    exit 1
fi

# Create backup directory
mkdir -p public/images/original

# Convert all JPG files to WebP
for file in public/*.jpg public/*.jpeg; do
    if [ -f "$file" ]; then
        webp_file="${file%.*}.webp"
        echo "Converting $file to $webp_file..."
        convert "$file" -quality 80 "$webp_file"
        cp "$file" "public/images/original/"
    fi
done

# Convert all PNG files to WebP
for file in public/*.png; do
    if [ -f "$file" ]; then
        # Skip icon files
        if [[ "$file" != *"icon"* ]]; then
            webp_file="${file%.*}.webp"
            echo "Converting $file to $webp_file..."
            convert "$file" -quality 80 "$webp_file"
            cp "$file" "public/images/original/"
        fi
    fi
done

# Convert images in public/images directory
for file in public/images/*.jpg public/images/*.jpeg; do
    if [ -f "$file" ]; then
        webp_file="${file%.*}.webp"
        if [ ! -f "$webp_file" ]; then
            echo "Converting $file to $webp_file..."
            convert "$file" -quality 80 "$webp_file"
        fi
    fi
done

for file in public/images/*.png; do
    if [ -f "$file" ]; then
        webp_file="${file%.*}.webp"
        if [ ! -f "$webp_file" ]; then
            echo "Converting $file to $webp_file..."
            convert "$file" -quality 80 "$webp_file"
        fi
    fi
done

echo "Image optimization complete!"
