import { baseSlug, type Article } from './articles';

/**
 * 홈 사이드바 「편집국 추천」.
 *
 * 사람(디플)이 고르는 목록이다. 조회수가 아니다.
 * 실구독자·조회 데이터를 볼 수 있게 되면 그때 그 데이터를 기준으로 바꾼다.
 *
 * **한글 slug로 적는다.** 영문 홈은 같은 목록을 {@link resolvePicks}가 `baseSlug`로
 * 맞춰 영문판 기사로 바꿔 준다. 목록을 두 벌로 두면 한쪽만 고쳐지고 두 홈이 어긋난다.
 * 그래서 이 파일이 `src/pages/index.astro` 밖으로 나왔다.
 */
export const EDITOR_PICK_SLUGS = [
  // 제2호(8/25). 증착 두 갈래를 앞에 세운다 — 마스크를 없애는 쪽과 키우는 쪽.
  '2026-08-25-lgd-flipp-fmmless-patterning',
  '2026-08-25-gen86-oled-deposition-patents',
  '2026-08-25-optical-fingerprint-collimator',
  '2026-08-25-germanium-exciplex-host-mrtadf',
  '2026-08-13-hunan-indis-microled',
  '2026-08-18-self-healing-wearable-peled',
  '2026-08-11-udc-diffraction',
  '2026-08-14-proximity-sensor-transmittance',
  '2026-08-06-fmp-privacy-display',
  '2026-08-14-utg-six-companies-deep-report',
  // 아래는 여유분이다. 위쪽 넷은 이번 호라 목록·배너에 이미 나와 걸러지므로,
  // 넉넉히 담아 두지 않으면 이 자리가 열 개를 못 채운다(실제로 여섯 개로 줄었다).
  '2026-08-18-lgd-2stack-woled',
  '2026-08-18-dongguk-ald-igzo-vrram',
  '2026-08-14-als-behind-oled-crosstalk',
  '2026-08-14-lepton-samsung-hinge-lawsuit',
  '2026-07-30-hiaa-big-hole',
  '2026-08-04-dgist-samsung-igzo-laser-anneal',
];

/** 이 자리에 보여줄 개수. 위 목록은 이보다 길게 두고 걸러진 뒤 앞에서 잘라 쓴다 */
export const EDITOR_PICK_COUNT = 10;

/**
 * 추천 목록을 그 언어판 기사로 바꾼다.
 *
 * `exclude`에는 **같은 화면에 이미 나온 것**을 넣는다. 왼쪽 기사 목록에 있는 것을
 * 여기 또 실으면 추천이 목록의 메아리가 된다. 빼고 나면 이 자리가 "최신에 밀려
 * 안 보이는 좋은 글"을 드러내는 역할이 되어 오히려 쓸모가 생긴다.
 *
 * 번역되지 않은 편은 영문 홈에서 **그냥 빠진다.** 한글 제목을 끼워 넣지 않는다.
 */
export function resolvePicks(all: Article[], exclude: Set<string>, count = EDITOR_PICK_COUNT): Article[] {
  const byBase = new Map<string, Article>();
  for (const a of all) if (!byBase.has(baseSlug(a))) byBase.set(baseSlug(a), a);
  return EDITOR_PICK_SLUGS.map((s) => byBase.get(s))
    .filter((a): a is Article => Boolean(a))
    .filter((a) => !exclude.has(a.slug))
    .slice(0, count);
}
