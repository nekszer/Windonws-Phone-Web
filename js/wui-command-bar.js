class WuiCommandBar {
  constructor(root) {
    this.root = root;
    this.mode = root.dataset.mode || 'sticky';
    this.render();
    this.applyMode(this.mode);
  }

  render() {
    const mockText = this.root.dataset.mock || 'Contenido de la aplicación';
    const actions = JSON.parse(this.root.dataset.actions || '[{"icon":"edit","label":"editar"},{"icon":"add","label":"nuevo"},{"icon":"share","label":"compartir"}]');
    const menu = JSON.parse(this.root.dataset.menu || '[{"label":"seleccionar todo"},{"label":"configuración"}]');

    this.root.innerHTML = `
      <div class="wui-cmdbar-frame">
        <div class="wui-cmdbar-mock">${mockText}</div>
        <div class="wui-cmdbar-bar" data-mode="${this.mode}" data-bar>
          <div class="wui-cmdbar-mainrow">
            <div class="wui-cmdbar-actions">
              ${actions.map(a => `
                <button class="wui-cmdbar-btn" data-action="${a.label}">
                  <div class="wui-cmdbar-circle"><span class="material-symbols-outlined">${a.icon}</span></div>
                  <span class="wui-cmdbar-label">${a.label}</span>
                </button>
              `).join('')}
            </div>
            <div class="wui-cmdbar-dots" data-dots>...</div>
          </div>
          <div class="wui-cmdbar-menu">
            ${menu.map(m => `<span class="wui-cmdbar-menu-item" data-menu="${m.label}">${m.label}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    this.bar = this.root.querySelector('[data-bar]');
    this.dots = this.root.querySelector('[data-dots]');

    this.dots.addEventListener('click', () => {
      const next = this.mode === 'expand' ? 'sticky' : 'expand';
      this.applyMode(next);
      this.root.dispatchEvent(new CustomEvent('wui-cmdbar-mode', { detail: { mode: next } }));
    });

    this.root.querySelectorAll('.wui-cmdbar-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.root.dispatchEvent(new CustomEvent('wui-command', { detail: { action: btn.dataset.action } }));
      });
    });

    this.root.querySelectorAll('.wui-cmdbar-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        this.root.dispatchEvent(new CustomEvent('wui-command', { detail: { action: item.dataset.menu } }));
        this.applyMode('sticky');
      });
    });
  }

  applyMode(mode) {
    if (!['collapsed', 'sticky', 'expand'].includes(mode)) return;
    this.mode = mode;
    this.bar.dataset.mode = mode;
  }

  setMode(mode) { this.applyMode(mode); }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiCommandBar = WuiCommandBar;
document.querySelectorAll('[data-wui-commandbar]').forEach(el => { el.__wui = new WuiCommandBar(el); });