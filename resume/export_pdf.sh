#!/bin/zsh
# Exports Evan_Borden_Resume.docx to PDF using Microsoft Word, so the PDF matches the .docx exactly.
set -e
DIR="${0:A:h}"
DOCX="$DIR/Evan_Borden_Resume.docx"
PDF="$DIR/Evan_Borden_Resume.pdf"
osascript <<EOF
tell application "Microsoft Word"
  set theDoc to open file name (POSIX file "$DOCX" as text)
  save as theDoc file name (POSIX file "$PDF" as text) file format format PDF
  close theDoc saving no
end tell
EOF
echo "wrote $PDF"
cp "$PDF" "$DIR/../public/assets/Evan_Borden_Resume.pdf"
echo "copied to public/assets/Evan_Borden_Resume.pdf (rebuild the site to publish)"
