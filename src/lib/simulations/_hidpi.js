// 캔버스를 화면 픽셀 밀도에 맞춰 그린다.
//
// 🔴 왜 필요한가 (2026-09-08 실측).
// 시뮬 30개가 전부 `<canvas width="440" height="336">` 처럼 **논리 크기 그대로**
// 비트맵을 잡고 있었다. 레티나 화면에서는 2배로 늘어나 흐려지고, 무엇보다
// **표지 카드가 그 캔버스를 2배 배율로 캡처**하므로 없는 픽셀을 늘린 그림이
// 잡지 표지에 올라갔다. 제3호 줄무늬 가장자리와 제4호 「contact width」 글자가
// 번져 보인 것이 전부 이것이다.
//
// 표지는 이 매체의 얼굴이고, 첫인상이 일어나는 자리는 거의 전부 정지 이미지다
// (링크 카드·홈페이지 진열대·뉴스레터). 동작하는 표지의 값어치는 거기서 0이 되고
// 남는 것은 그림 한 장의 선명도뿐이다.
//
// **쓰는 법**: `canvas.getContext('2d')` 대신 `hidpi(canvas, W, H)`.
// 반환된 컨텍스트는 **논리 좌표(W×H)로 그리면 되도록 이미 확대돼 있다.**
// 그리는 코드는 한 줄도 바꿀 필요가 없다.
//
// ⚠ **`canvas.width` 를 직접 읽는 코드가 있으면 함께 고쳐야 한다.**
// 그 값은 이제 물리 픽셀이라 논리 크기와 다르다. `W`·`H` 상수를 쓰도록 바꾼다.
//
// ⚠ **`ctx.setTransform(1,0,0,1,0,0)` 으로 변환을 되돌리면 확대가 풀린다.**
// 되돌릴 때는 `resetTo(ctx, canvas, W)` 를 쓴다.
//
// ⚠ **캔버스에 인라인 높이를 박지 않는다.** 인라인은 시트를 이기므로 좁은 화면에서
// 줄어들 길이 막힌다. 높이는 `sim.css` 의 `height: auto` 와 비트맵 비율이 정한다.

/** 화면 밀도에 맞춰 캔버스를 키우고, 논리 좌표로 그릴 수 있는 컨텍스트를 준다. */
export function hidpi(canvas, w, h, opts = {}) {
  // 표지 캡처는 배율을 높여 찍으므로 그때는 devicePixelRatio 가 따라 올라간다.
  // 상한을 두는 것은 모바일에서 비트맵이 과하게 커지는 것을 막기 위해서다.
  const max = opts.max ?? 4;
  const dpr = Math.min(max, Math.max(1, window.devicePixelRatio || 1));
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.width = w + 'px';
  // 🔴 `style.height = h + 'px'` 를 함께 박고 있었다 (2026-09-09 정정).
  // 인라인 스타일은 시트의 어떤 규칙보다 세서, 좁은 화면용 규칙이 통째로 무력해졌다.
  // 제4호 표지와 AF 편이 320px 에서 59%만 보이고 나머지가 잘려 나간 원인이 이것이다.
  // 폭은 논리 크기를 정하려고 남기되, 높이는 비율에서 끌어오고 좁아지면 함께 줄게 둔다.
  canvas.style.height = 'auto';
  canvas.style.maxWidth = '100%';
  // 비율을 명시해 둔다. `height: auto` 만으로도 크롬은 비트맵 비율에서 높이를 끌어오지만
  // (dpr 1·2·3 실측 동일), 비트맵이 dpr 배라 구형 사파리에서 갈릴 여지를 남기지 않는다.
  canvas.style.aspectRatio = w + ' / ' + h;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.__dpr = dpr;
  return ctx;
}

/** `setTransform` 으로 변환을 되돌려야 할 때 쓴다. 확대는 유지된다. */
export function resetTo(ctx, sx = 1, sy = sx) {
  const d = ctx.__dpr || 1;
  ctx.setTransform(d * sx, 0, 0, d * sy, 0, 0);
}
