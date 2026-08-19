-- 편집국 게시판 스키마. Cloudflare D1 데이터베이스 display-now-board 에 1회만 실행한다.
-- 대시보드에서 실행하는 법: Cloudflare > Storage & Databases > D1 > display-now-board > Console
CREATE TABLE IF NOT EXISTS posts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  kind         TEXT,                       -- 제보 · 정정 요청 · 광고 문의 · 제휴 문의 · 기타
  name         TEXT    NOT NULL,
  email        TEXT    NOT NULL,           -- 공개 목록에는 절대 싣지 않는다
  org          TEXT,
  title        TEXT    NOT NULL,
  message      TEXT    NOT NULL,
  is_private   INTEGER NOT NULL DEFAULT 0,
  post_pw_hash TEXT,                       -- 비밀글 열람용 해시
  post_pw_salt TEXT,                       -- 글마다 다른 무작위 salt. 같은 비밀번호라도 해시가 달라진다
  created_at   TEXT    NOT NULL,
  reply        TEXT,
  replied_at   TEXT
);

CREATE INDEX IF NOT EXISTS idx_posts_created ON posts (created_at DESC);

-- 비밀글 비밀번호 대입 시도를 막는다.
-- 짧은 비밀번호는 시도 횟수를 제한하지 않으면 자동화로 금방 뚫린다.
CREATE TABLE IF NOT EXISTS unlock_attempts (
  post_id      INTEGER NOT NULL,
  ip           TEXT    NOT NULL,
  fails        INTEGER NOT NULL DEFAULT 0,
  window_start TEXT    NOT NULL,
  PRIMARY KEY (post_id, ip)
);

CREATE INDEX IF NOT EXISTS idx_unlock_window ON unlock_attempts (post_id, window_start);
