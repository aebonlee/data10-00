// 패들릿 build_data2 의 「NN 프로젝트 - 이름」 섹션을 읽어 data/intake.js 를 만든다(공개 API, 로그인 불필요).
// 새 접수가 올라오면:  node scripts/fetch-intake.mjs && node scripts/build-data.mjs
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const WALL_ID = 271458089
const WALL_HASHID = 'board_x2oGAEDpVX4DnY3w'
const get = async (u) => { const r = await fetch('https://padlet.com' + u); if (!r.ok) throw new Error(u + ' ' + r.status); return (await r.json()).data }

const secs = await get(`/api/5/wall_sections?wall_id=${WALL_ID}`)
const wishes = await get(`/api/10/wishes?wall_hashid=${WALL_HASHID}`)
const intake = secs
  .map((s) => ({ id: s.id, m: (s.attributes.title || '').match(/^(\d\d)\s*프로젝트\s*-\s*(.+)$/) }))
  .filter((s) => s.m)
  .map((s) => {
    const posts = wishes.filter((w) => String(w.attributes.wall_section_id) === String(s.id)).sort((a, b) => a.attributes.id - b.attributes.id)
    if (!posts.length) return null
    const subj = (posts[0].attributes.subject || '').trim()
    // 섹션 이름이 아직 「(이름)」이면 글 제목 끝의 「- 이름」에서 가져온다
    const name = /\(이름\)/.test(s.m[2]) ? ((subj.match(/-\s*([가-힣]{2,4})\s*$/) || [])[1] || '') : s.m[2].trim()
    const title = subj.replace(/\s*-\s*[가-힣]{2,4}\s*$/, '').replace(/^프로젝트 접수\s*$/, '').trim()
    // 제목이 「프로젝트 접수-이름」뿐이면 본문 ② 현안 줄을 제목으로 쓴다
    const body = (posts[0].attributes.body || '').replace(/<br\s*\/?>/g, '\n').replace(/<\/(p|div|li)>/g, '\n').replace(/<[^>]+>/g, '')
    const issue = ((body.match(/현안[^:：\n]*[:：]\s*([^\n]+)/) || [])[1] || '').trim()
    return { no: s.m[1], name, title: title || issue }
  })
  .filter(Boolean)
  .sort((a, b) => a.no.localeCompare(b.no))

writeFileSync(join(HERE, '..', 'data', 'intake.js'), `// 자동 생성 — 손으로 고치지 말 것. node scripts/fetch-intake.mjs\nwindow.INTAKE = ${JSON.stringify(intake, null, 2)};\n`)
console.log(`접수 ${intake.length}건 → data/intake.js`)
