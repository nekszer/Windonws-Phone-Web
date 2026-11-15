/* ── ContentDialog ── */
class WuiDialog {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-dialog');
    // Si el HTML ya tiene la estructura, no la regeneramos
    if (!this.root.querySelector('.wui-dialog-title')) {
      this.render();
    }
    this.bind();
  }

  render() {
    this.root.innerHTML = `
      <div class="wui-dialog-title">${this.root.dataset.title || 'Confirmar'}</div>
      <div class="wui-dialog-body">${this.root.dataset.body || '¿Deseas continuar?'}</div>
      <div class="wui-dialog-buttons">
        <button class="wui-dialog-btn" data-action="cancel">Cancelar</button>
        <button class="wui-dialog-btn primary" data-action="confirm">Aceptar</button>
      </div>
    `;
  }

  bind() {
    const cancel = this.root.querySelector('[data-action="cancel"]');
    const confirm = this.root.querySelector('[data-action="confirm"]');
    if (cancel) cancel.addEventListener('click', () => {
      this.root.dispatchEvent(new CustomEvent('wui-dialog-cancel'));
    });
    if (confirm) confirm.addEventListener('click', () => {
      this.root.dispatchEvent(new CustomEvent('wui-dialog-confirm'));
    });
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiDialog = WuiDialog;
document.querySelectorAll('[data-wui-dialog]').forEach(el => new WuiDialog(el));