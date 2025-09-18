#!/usr/bin/env bash
set -euo pipefail

# Usage: scripts/cleanup-ignored.sh [--dry-run]
# Removes files ignored by Git (e.g. build outputs, caches) using git clean.
# Pass --dry-run to preview what would be deleted.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"
cd "$ROOT_DIR"

if [[ "${1:-}" == "--dry-run" ]]; then
  git clean -fdXn
else
  git clean -fdX
fi
