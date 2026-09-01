import { getIssues } from '../lib/issues';

/**
 * 최신 발행호 한 건을 정적 JSON으로 내보낸다.
 *
 * 구독 환영 메일(`functions/api/subscribe.js`)이 "가장 최근 호"를 가리켜야 하는데,
 * Pages Functions는 사이트 소스를 import할 수 없다. 호수를 코드에 박아 두면 매주
 * 사람이 고쳐야 하고, 한 번 잊으면 지난 호가 계속 나간다.
 *
 * 그래서 빌드 시점에 이 파일을 떨궈 두고 Function이 fetch한다. 호를 새로 내면
 * 어차피 재배포하므로 별도 손이 가지 않는다.
 *
 * `getIssues()`를 쓰므로 **발행일이 지난 호만** 나온다(미래 호는 제외).
 */
export function GET() {
  const [latest] = getIssues();

  const body = latest
    ? {
        no: latest.no,
        publishedAt: latest.publishedAt,
        headline: latest.headline,
        href: `/issue/${latest.no}`,
        poster: `/issues/issue-${latest.no}-poster.png`,
      }
    : null;

  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // 호가 바뀌면 곧바로 반영돼야 한다. 엣지에 오래 물고 있지 않는다
      'cache-control': 'public, max-age=300',
    },
  });
}
