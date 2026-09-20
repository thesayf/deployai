#!/usr/bin/env bash
# Exports public/rate-card/index.html to public/rate-card/deployai-rate-card-oman.pdf
# with headless Chrome, so the PDF is the page itself printed, not a re-render.
# Run against a live server (dev or prod) after editing the rate card:
#   scripts/export-rate-card-pdf.sh [http://localhost:3100]
set -euo pipefail
BASE="${1:-http://localhost:3100}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/rate-card/deployai-rate-card-oman.pdf"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 --run-all-compositor-stages-before-draw \
  --print-to-pdf="$OUT" "$BASE/prices-oman" 2>/dev/null
echo "wrote $OUT ($(du -h "$OUT" | cut -f1))"
