#!/usr/bin/sh

# Find all files *.js|ts, not path node_modules
# Replace all spaces with underscores

find . -type f -name "* *.js" -o -name '* *.ts' | while read file; do mv "$file" ${file// /_}; done