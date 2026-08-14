// 시뮬레이션 모듈 자동 레지스트리.
// 이 폴더에 <모듈id>.js를 추가하고 mount(container, params) 함수를 export default 또는
// named export `mount`로 내보내면 별도 등록 없이 data-sim="<모듈id>"로 바로 쓸 수 있다.
const modules = import.meta.glob('./*.js', { eager: true });

/** @type {Record<string, (el: HTMLElement, params: Record<string, unknown>) => void>} */
const registry = {};
for (const path in modules) {
  if (path.endsWith('/index.js')) continue;
  const id = path.replace('./', '').replace(/\.js$/, '');
  const mod = modules[path];
  const mount = mod.mount || mod.default;
  if (typeof mount === 'function') {
    registry[id] = mount;
  }
}

export default registry;
