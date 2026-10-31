/**
 * 홈 「DISPLAY NOW TV」 — 유튜브 채널(@displaynowtv)에 **공개된** 영상 목록.
 *
 * 한글 홈 세 축 중 「TV」 — 맨 위 TV 칸(맨 앞 한 편)과 아래 TV 책장(최신 4편), `/tv`가 쓴다.
 * 영상이 한국어라 영문 홈에는 싣지 않는다.
 *
 * - **공개된 영상만 적는다.** 공개 전 편을 미리 넣지 않는다
 * - 최신 편을 맨 앞에 둔다
 * - 썸네일은 유튜브 서버에서 끌어오지 않고 `public/videos/`에 webp로 둔다(외부 요청·쿠키 0)
 * - 사이트 안에서 재생하지 않는다. 누르면 유튜브로 넘어간다
 */
export interface Video {
  /** 유튜브 영상 아이디 */
  id: string;
  title: string;
  /** 재생 시간 표기(예: '6:27') */
  duration: string;
  /** 공개일 YYYY-MM-DD */
  date: string;
  /** `public/` 기준 경로 */
  thumb: string;
}

export const CHANNEL_URL = 'https://www.youtube.com/@displaynowtv';

export const VIDEOS: Video[] = [
  {
    id: 'upKBkH7KEbw',
    title: '아이폰 18 Pro Face ID, 화면 아래로 내려갔다는데 사실일까?',
    duration: '6:27',
    date: '2026-10-31',
    thumb: '/videos/faceid-under-panel.webp',
  },
];

export const videoHref = (v: Video) => `https://youtu.be/${v.id}`;
