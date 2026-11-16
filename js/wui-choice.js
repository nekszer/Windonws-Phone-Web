/* ── Checkbox & Radio ── */
class WuiChoice {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-choice');
    this.box = root.querySelector('.wui-checkbox, .wui-radio');
    this.isRadio = this.box.classList.contains('wui-radio');
    this.group = root.dataset.wuiGroup;
    this.bind();
  }

  bind() {
    this.root.addEventListener('click', () => {
      // Lógica para Radio Buttons
      if (this.isRadio) {
        // Si ya estaba seleccionado, no hacer nada
        if (this.box.classList.contains('checked')) return;

        // Desmarcar otros radios del mismo grupo
        if (this.group) {
          document.querySelectorAll(`[data-wui-group="${this.group}"] .wui-radio`).forEach(r => {
            r.classList.remove('checked');
          });
        }
        this.box.classList.add('checked');
      } 
      // Lógica para Checkboxes
      else {
        this.box.classList.toggle('checked');
      }

      // IMPORTANTE: El evento debe tener "bubbles: true" para que 
      // el index.html pueda escucharlo desde el contenedor padre.
      this.root.dispatchEvent(new CustomEvent('wui-choice', {
        detail: { checked: this.box.classList.contains('checked') },
        bubbles: true 
      }));
    });
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiChoice = WuiChoice;

// Inicialización automática
document.querySelectorAll('[data-wui-choice]').forEach(el => {
  if (!el.__wui) {
    el.__wui = new WuiChoice(el);
  }
});