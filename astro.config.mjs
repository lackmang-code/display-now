import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  site: 'https://display-now.nextio.ai.kr',
  trailingSlash: 'never',
  // 출력물을 `foo/index.html`이 아니라 `foo.html`로 낸다.
  //
  // 이게 없으면 `trailingSlash: 'never'`가 말뿐이 된다. 디렉터리 방식으로 내면 Cloudflare
  // Pages가 `/article/x`를 `/article/x/`로 308 리다이렉트하는데, 정작 사이트맵과 canonical
  // 태그와 모든 내부 링크는 슬래시 없는 주소를 가리킨다. 구글에 색인하라고 알려준 45개 주소가
  // 전부 자기 자신에서 튕겨 나가고, 도착한 페이지는 다시 "내 정식 주소는 튕겨낸 그 주소"라고
  // 선언하는 꼴이 된다(2026-08-24 발견). 독자도 페이지를 옮길 때마다 308을 한 번씩 거쳤다.
  //
  // 파일 방식으로 내면 Cloudflare Pages가 확장자를 떼고 `/article/x`를 200으로 바로 준다.
  // 주소가 바뀌는 것이 아니라, 원래 광고하던 주소가 이제야 실제로 동작하는 것이다.
  build: { format: 'file' },
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
