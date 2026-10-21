#!/bin/bash
# 옆 폴더 data10-NN 을 깃허브(public)에 올리고 Pages 를 켠 뒤 허브 목록을 갱신한다.
#   bash scripts/publish.sh 05 "생산진도율 자동화"
set -e
NN="$1"; DESC="$2"; ROOT="$(cd "$(dirname "$0")/../.." && pwd)"; R="data10-$NN"
cd "$ROOT/$R"
test -z "$(git status --porcelain)" || { echo "$R: 커밋 안 된 변경이 있음"; exit 1; }
if grep -rlE "건화|창원|HD건설|현대건설|한울|파카|하니핀|Parker|두산|모트롤" . --exclude-dir=vendor --exclude-dir=.git --exclude-dir=node_modules; then echo "$R: 회사명이 남아 있음"; exit 1; fi
git branch -M main
gh repo create "aebonlee/$R" --public --source . --push --homepage "https://aebonlee.github.io/$R/" --description "현장 데이터 디지털화 전문가과정 2차수 · $DESC"
gh api -X POST "repos/aebonlee/$R/pages" -f "source[branch]=main" -f "source[path]=/" --jq .html_url
cd "$ROOT/data10-00"
node scripts/build-data.mjs
git add -A && git commit -qm "허브 목록 — $R $DESC" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" && git push -q
echo "$R 게시 완료"
