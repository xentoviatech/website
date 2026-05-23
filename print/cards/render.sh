#!/usr/bin/env bash
# Renders three founder PDFs into print/cards/out/ via headless Chromium.
# Run from anywhere: ./print/cards/render.sh
#
# Requires: chromium (or google-chrome). On Debian/Ubuntu:
#   sudo apt install chromium
# On macOS with Homebrew:
#   brew install --cask chromium

set -euo pipefail

# Resolve a chromium-compatible binary.
BROWSER=""
for cand in chromium chromium-browser google-chrome chrome; do
  if command -v "$cand" >/dev/null 2>&1; then
    BROWSER="$cand"
    break
  fi
done
if [ -z "$BROWSER" ]; then
  echo "error: no chromium/chrome binary found on PATH" >&2
  echo "install chromium and retry (sudo apt install chromium)" >&2
  exit 1
fi

# Always render relative to this script's directory so the relative
# stylesheet/JS paths in index.html resolve correctly.
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$HERE/out"
mkdir -p "$OUT"

render_one() {
  local id="$1" outname="$2"
  echo "rendering $id → $outname"
  "$BROWSER" \
    --headless=new \
    --disable-gpu \
    --no-sandbox \
    --hide-scrollbars \
    --virtual-time-budget=2000 \
    --no-pdf-header-footer \
    --print-to-pdf="$OUT/$outname" \
    "file://$HERE/index.html?only=$id"
}

render_one ram     "ramachandran-av.pdf"
render_one rajnee  "rajnee-dubey.pdf"
render_one santosh "santosh-kumar.pdf"

echo "done. PDFs in: $OUT"
