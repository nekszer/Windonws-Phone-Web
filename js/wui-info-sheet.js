/* ── InfoSheet / BottomFlyout ── */
class WuiInfoSheet {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-infosheet');
    // Si el HTML ya tiene la estructura, la conservamos
    if (!this.root.querySelector('.wui-infosheet-head')) {
      this.render();
    }
    this.bind();
  }

  render() {
    this.root.innerHTML = `
      <div class="wui-infosheet-handle"></div>
      <div class="wui-infosheet-head">
        <div class="wui-infosheet-icon">
          <span class="material-symbols-outlined">${this.root.dataset.icon || 'apps'}</span>
        </div>
        <div>
          <div class="wui-infosheet-title">${this.root.dataset.title || 'App'}</div>
          <div class="wui-infosheet-sub">${this.root.dataset.sub || 'Detalles'}</div>
        </div>
      </div>
      <div class="wui-infosheet-actions">
        <button class="wui-infosheet-btn" data-action="pin">Anclar</button>
        <button class="wui-infosheet-btn" data-action="info">Detalles</button>
      </div>
    `;
  }

  bind() {
    this.root.querySelectorAll('[data-action]').forEach(b => {
      b.addEventListener('click', () => {
        this.root.dispatchEvent(new CustomEvent('wui-infosheet-action', {
          detail: { action: b.dataset.action }
        }));
      });
    });
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiInfoSheet = WuiInfoSheet;
document.querySelectorAll('[data-wui-infosheet]').forEach(el => new WuiInfoSheet(el));