import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  site: 'https://display-now.nextio.ai.kr',
  trailingSlash: 'never',
  markdown: {
    // 기본 GFM을 끄고 직접 넣는다. 물결표 하나를 취소선으로 읽지 않게 하기 위해서다.
    //
    // 디스플레이 기사는 범위 표기가 잦다. "8월 10일~16일", "100~2000MPa" 처럼
    // 한 문단에 물결표가 둘 들어가면 GFM 기본값에서는 그 사이가 통째로 취소선이 되어
    // 본문에 가로줄이 그어진 채 발행된다. 실제로 14곳에서 그렇게 나갔다(2026-08-19).
    //
    // singleTilde를 끄면 물결표 하나는 그냥 물결표로 찍힌다. 취소선은 ~~둘~~일 때만 걸린다.
    // 기자가 이스케이프를 기억할 필요가 없어진다. 규칙을 사람 기억에 맡기지 않는다.
    gfm: false,
    remarkPlugins: [[remarkGfm, { singleTilde: false }]],
  },
});
