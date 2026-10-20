# data10-00 · 현장 데이터 수집·디지털화 전문가과정 2차수 — 수강생 프로젝트 모음

**https://aebonlee.github.io/data10-00/**

수강생이 자기 직무의 현안을 직접 기획하고, 그 기획서를 바탕으로 만든 현장 업무 도구를 한 페이지에서 소개합니다.
과제마다 **도구 바로 쓰기 · 기획서(Markdown·Word) · 리포지토리** 링크가 있습니다.

## 목록 갱신

목록은 손으로 적지 않고 옆 폴더의 `data10-NN` 리포(README·기획서)에서 만듭니다. 과제가 늘거나 단계가 바뀌면:

```sh
node scripts/build-data.mjs   # data/projects.js 재생성
```

과제 수가 바뀌면 OG 이미지도 다시 만듭니다(임시 폴더에 `npm i sharp` 후 `node scripts/generate-og-image.mjs <과제수> og-image.png`).

## 접수 현황 · 개발 순서

첫 화면 위쪽 표는 패들릿 [build_data2](https://padlet.com/dreamitbiz/build_data2) 의 「NN 프로젝트 - 이름」 섹션을 읽어 만듭니다(공개 API, 로그인 불필요).
번호 = 패들릿 섹션 번호 = 리포 `data10-NN`. 새 접수가 올라오면:

```sh
node scripts/fetch-intake.mjs   # data/intake.js 재생성 (패들릿 접수 목록)
node scripts/build-data.mjs     # data/projects.js 재생성 (개발된 리포 목록)
```

개발 순서는 `data/priority.js` 에서 손으로 정합니다(1순위 이번 묶음 · 2순위 자료가 오는 대로 · 3순위 범위 확인 뒤). 순서에 없는 새 접수는 표 맨 뒤에 「새 접수 — 검토 중」으로 붙습니다.

## 구성

- `index.html` · `css/style.css` · `js/app.js` — 정적 페이지(빌드 없음)
- `data/projects.js` — 자동 생성 목록(손으로 고치지 말 것)
- `data/intake.js` — 패들릿 접수 목록, 자동 생성(손으로 고치지 말 것)
- `data/priority.js` — 개발 순서(손으로 고친다)
- `scripts/fetch-intake.mjs` — 패들릿 접수 목록 생성기
- `scripts/build-data.mjs` — 목록 생성기
