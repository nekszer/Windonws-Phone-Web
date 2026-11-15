/* ── ToggleSwitch ── */
class WuiToggle {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-toggle');
    this.track = root.querySelector('.wui-toggle-track');
    this.label = root.querySelector('.wui-toggle-label');
    this.onText = root.dataset.onText || 'On';
    this.offText = root.dataset.offText || 'Off';
    this.bind();
  }

  bind() {
    this.root.addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.track.classList.toggle('checked');
    const checked = this.track.classList.contains('checked');
    if (this.label) this.label.textContent = checked ? this.onText : this.offText;
    this.root.dispatchEvent(new CustomEvent('wui-toggle', { detail: { checked } }));
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiToggle = WuiToggle;
document.querySelectorAll('[data-wui-toggle]').forEach(el => new WuiToggle(el));