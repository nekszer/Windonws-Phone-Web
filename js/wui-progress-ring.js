class WuiProgressRing {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-progressring');
    this.root.innerHTML = `
      <div class="wui-pr-dots"><span></span><span></span><span></span><span></span><span></span></div>
      <div class="wui-pr-orbit">
        <div class="wui-pr-orbit-dot"></div><div class="wui-pr-orbit-dot"></div><div class="wui-pr-orbit-dot"></div>
        <div class="wui-pr-orbit-dot"></div><div class="wui-pr-orbit-dot"></div><div class="wui-pr-orbit-dot"></div>
      </div>
      <svg class="wui-pr-svg" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18"></circle></svg>
    `;
  }
}
WUI.classes = WUI.classes || {};
WUI.classes.WuiProgressRing = WuiProgressRing;
document.querySelectorAll('[data-wui-progressring]').forEach(el => new WuiProgressRing(el));