/* ── Hub ── */
class WuiHub {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-hub');
    this.sections = JSON.parse(root.dataset.sections || '[]');
    this.render();
  }

  render() {
    this.root.innerHTML = this.sections.map(s => `
      <div class="wui-hub-section">
        <div class="wui-hub-section-title">${s.title}</div>
        <div class="wui-hub-section-body">${s.body || ''}</div>
      </div>
    `).join('');
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiHub = WuiHub;
document.querySelectorAll('[data-wui-hub]').forEach(el => new WuiHub(el));