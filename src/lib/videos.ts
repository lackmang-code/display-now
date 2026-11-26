/**
 * 홈 「DISPLAY NOW TV」 — 유튜브 채널(@displaynowtv)에 **공개된** 영상 목록.
 *
 * 홈 세 축 중 「TV」 — 맨 위 TV 칸(맨 앞 한 편)과 아래 TV 책장, `/tv`가 쓴다.
 * 영문 홈도 같은 목록을 쓴다(11/16 대표) — 영어판이 따로 있으면(`en`) 그것을, 없으면 한국어 영상을
 * 영어 자막 표시와 함께 싣는다(모든 롱폼에 .en.srt가 있다). 영문 홈 TV 칸 맨 앞은 영어판이 있는 최신 편.
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
  /** 영문 홈에 쓸 제목(한국어 음성 + 영어 자막 영상) */
  titleEn: string;
  /** 영어 음성판을 따로 공개했으면 그 영상 */
  en?: { id: string; title: string; thumb: string; duration?: string };
}

export const CHANNEL_URL = 'https://www.youtube.com/@displaynowtv';

export const VIDEOS: Video[] = [
  {
    id: '33zdSIN3BOY',
    title: '전구 회사 오스람에 삼성디스플레이가 투자하는 이유',
    duration: '7:38',
    date: '2026-11-26',
    thumb: '/videos/ams-osram-samsung.webp',
    titleEn: 'Why Samsung Display Is Investing in OSRAM, the Light Bulb Name',
  },
  {
    id: 'oVXr5k49XIU',
    title: '유리가 어떻게 접히지? 접는 폰 유리의 원리',
    duration: '8:47',
    date: '2026-11-23',
    thumb: '/videos/utg-glass-fold.webp',
    titleEn: 'How Does Glass Fold? The Ultra-Thin Glass in Foldable Phones',
  },
  {
    id: 'xJ9qIbUoVA4',
    title: 'OLED 맥북 프로 두통 논란, PWM 디밍이 뭐길래?',
    duration: '5:44',
    date: '2026-11-16',
    thumb: '/videos/pwm-flicker-macbook.webp',
    titleEn: 'OLED MacBook Pro and Headache Reports: What Is PWM Dimming?',
  },
  {
    id: 'S2RDoUf0U4U',
    title: '내가 찍은 영상이 유튜브 방송이 되기까지',
    duration: '7:32',
    date: '2026-11-14',
    thumb: '/videos/video-data-to-youtube.webp',
    titleEn: 'How the Video I Filmed Becomes a YouTube Broadcast',
    en: { id: 'B8v8D8HsgwQ', title: 'How the Video I Filmed Becomes a YouTube Broadcast', thumb: '/videos/video-data-to-youtube-en.webp' },
  },
  {
    id: 'DnWvhOUgxLI',
    title: '지문을 소리로 읽는다고? 초음파 지문센서의 원리',
    duration: '9:32',
    date: '2026-11-06',
    thumb: '/videos/ultrasonic-fingerprint.webp',
    titleEn: 'Reading Fingerprints with Sound: How Ultrasonic Fingerprint Sensors Work',
  },
  {
    id: 'fX3DIFYgt3k',
    title: '애플 듀오 화면 라인불량, 원인은 힌지?',
    duration: '6:54',
    date: '2026-11-02',
    thumb: '/videos/duo-hinge-crack.webp',
    titleEn: 'iPhone Duo Screen Line Defects: Is the Hinge the Cause?',
  },
  {
    id: 'upKBkH7KEbw',
    title: '아이폰 18 Pro Face ID, 화면 아래로 내려갔다는데 사실일까?',
    duration: '6:27',
    date: '2026-10-31',
    thumb: '/videos/faceid-under-panel.webp',
    titleEn: 'iPhone 18 Pro Face ID Under the Display: Is It True?',
  },
];

export const videoHref = (v: { id: string }) => `https://youtu.be/${v.id}`;

/** 화면에 실을 한 편 — 언어판을 고른 뒤의 모양 */
export interface VideoView {
  id: string;
  title: string;
  duration: string;
  thumb: string;
  /** 한국어 음성에 영어 자막(영문 홈에서만 true) */
  subtitled: boolean;
}

export function videosFor(lang: 'ko' | 'en' = 'ko'): VideoView[] {
  return VIDEOS.map((v) =>
    lang === 'en'
      ? v.en
        ? { id: v.en.id, title: v.en.title, duration: v.en.duration ?? v.duration, thumb: v.en.thumb, subtitled: false }
        : { id: v.id, title: v.titleEn, duration: v.duration, thumb: v.thumb, subtitled: true }
      : { id: v.id, title: v.title, duration: v.duration, thumb: v.thumb, subtitled: false },
  );
}

/** 홈 맨 위 TV 칸의 한 편. 영문 홈은 영어판이 있는 최신 편, 없으면 최신 편 */
export function leadVideo(lang: 'ko' | 'en' = 'ko'): VideoView | undefined {
  const list = videosFor(lang);
  return (lang === 'en' && list.find((v) => !v.subtitled)) || list[0];
}
