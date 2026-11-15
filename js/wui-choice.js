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
      if (this.isRadio) {
        // Desmarcar otros radios del mismo grupo
        if (this.group) {
          document.querySelectorAll(`[data-wui-group="${this.group}"] .wui-radio`).forEach(r => {
            r.classList.remove('checked');
          });
        }
        this.box.classList.add('checked');
      } else {
        this.box.classList.toggle('checked');
      }
      this.root.dispatchEvent(new CustomEvent('wui-choice', {
        detail: { checked: this.box.classList.contains('checked') }
      }));
    });
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiChoice = WuiChoice;
document.querySelectorAll('[data-wui-choice]').forEach(el => new WuiChoice(el));