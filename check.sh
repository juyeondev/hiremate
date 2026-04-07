#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "→ [1/3] ruff"
cd "$ROOT_DIR/backend"
source venv/bin/activate
ruff check main.py
ruff format --check main.py

echo "→ [2/3] prettier"
cd "$ROOT_DIR/frontend"
npx prettier --check .

echo "→ [3/3] build"
npm run build

echo ""
echo "✓ All checks passed"
