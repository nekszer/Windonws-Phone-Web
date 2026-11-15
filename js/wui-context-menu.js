/* ── ContextMenu ── */
class WuiContextMenu {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-contextmenu');
    this.items = JSON.parse(root.dataset.items || '[]');
    this.render();
  }

  render() {
    this.root.innerHTML = this.items.map(it => `
      <button class="wui-menu-item" data-action="${it.label}">
        <span style="display:flex; align-items:center; gap:8px;">
          ${it.icon ? `<span class="material-symbols-outlined">${it.icon}</span>` : ''}
          <span>${it.label}</span>
        </span>
        ${it.shortcut ? `<span class="wui-menu-shortcut">${it.shortcut}</span>` : ''}
      </button>
    `).join('');
    this.root.querySelectorAll('.wui-menu-item').forEach(b => {
      b.addEventListener('click', () => {
        this.root.dispatchEvent(new CustomEvent('wui-menu', { detail: { action: b.dataset.action } }));
      });
    });
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiContextMenu = WuiContextMenu;
document.querySelectorAll('[data-wui-contextmenu]').forEach(el => new WuiContextMenu(el));