#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "→ [1/2] prettier"
cd "$ROOT_DIR/frontend"
npx prettier --check .

echo "→ [2/2] build"
npm run build

echo ""
echo "✓ All checks passed"
