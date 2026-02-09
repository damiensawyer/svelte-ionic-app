#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "Running svelte-check..."
pnpm run check

CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "publish" ]; then
    echo "Switching to publish branch..."
    git checkout publish
fi

echo "Staging changes..."
git add -A

if git diff --cached --quiet; then
    echo "No changes to publish."
    exit 0
fi

echo "Committing..."
git commit -m "publish: $(date +%Y-%m-%d_%H%M%S)"

echo "Pushing to origin/publish..."
git push origin publish

echo "Done. Update your consumer with:"
echo "  pnpm update ionic-svelte"
