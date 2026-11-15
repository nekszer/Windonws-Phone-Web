/* ── PickerFlyout ── */
class WuiPickerFlyout {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-picker-flyout');
    this.title = root.dataset.title || 'Seleccionar';
    this.body = root.dataset.body || 'Contenido del picker';
    this.render();
    this.bind();
  }

  render() {
    this.root.innerHTML = `
      <div class="wui-picker-flyout-header">${this.title}</div>
      <div class="wui-picker-flyout-body">${this.body}</div>
      <div class="wui-picker-flyout-actions">
        <button class="wui-picker-flyout-btn" data-action="cancel">✕</button>
        <button class="wui-picker-flyout-btn primary" data-action="confirm">✓</button>
      </div>
    `;
  }

  bind() {
    this.root.querySelector('[data-action="cancel"]').addEventListener('click', () => {
      this.root.dispatchEvent(new CustomEvent('wui-picker-cancel'));
    });
    this.root.querySelector('[data-action="confirm"]').addEventListener('click', () => {
      this.root.dispatchEvent(new CustomEvent('wui-picker-confirm'));
    });
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiPickerFlyout = WuiPickerFlyout;
document.querySelectorAll('[data-wui-picker]').forEach(el => new WuiPickerFlyout(el));