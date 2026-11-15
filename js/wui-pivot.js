/* ── Pivot ── */
class WuiPivot {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-pivot');
    this.tabs = JSON.parse(root.dataset.tabs || '["Inicio","Favoritos","Ajustes"]');
    this.active = 0;
    this.render();
  }

  render() {
    this.root.innerHTML = `
      <div class="wui-pivot-headers">
        ${this.tabs.map((t, i) => `<button class="wui-pivot-tab${i === 0 ? ' active' : ''}" data-index="${i}">${t}</button>`).join('')}
      </div>
      <div class="wui-pivot-content">${this.tabs[0]}</div>
    `;
    this.headers = this.root.querySelector('.wui-pivot-headers');
    this.content = this.root.querySelector('.wui-pivot-content');
    this.headers.addEventListener('click', (e) => {
      const tab = e.target.closest('.wui-pivot-tab');
      if (!tab) return;
      this.setActive(parseInt(tab.dataset.index));
    });
  }

  setActive(i) {
    this.active = i;
    this.headers.querySelectorAll('.wui-pivot-tab').forEach((t, idx) => {
      t.classList.toggle('active', idx === i);
    });
    this.content.textContent = this.tabs[i];
    this.root.dispatchEvent(new CustomEvent('wui-pivot-change', { detail: { index: i, tab: this.tabs[i] } }));
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiPivot = WuiPivot;
document.querySelectorAll('[data-wui-pivot]').forEach(el => new WuiPivot(el));