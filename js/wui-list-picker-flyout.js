/* ── ListPickerFlyout ── */
class WuiListPickerFlyout {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-list-picker');
    this.items = JSON.parse(root.dataset.items || '["Opción 1","Opción 2","Opción 3"]');
    this.value = root.dataset.value || this.items[0];
    this.render();
    this.bind();
  }

  render() {
    this.root.innerHTML = `
      <div class="wui-lpf-field" data-trigger>
        <span data-display>${this.value}</span>
        <span class="material-symbols-outlined">expand_more</span>
      </div>
      <div class="wui-lpf-modal" data-modal>
        <div class="wui-lpf-dialog">
          <div class="wui-lpf-header">${this.root.dataset.title || 'Seleccionar opción'}</div>
          <div class="wui-lpf-list">
            ${this.items.map((it, i) =>
              `<div class="wui-lpf-item${it === this.value ? ' selected' : ''}" data-index="${i}">${it}</div>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
    this.modal = this.root.querySelector('[data-modal]');
    this.display = this.root.querySelector('[data-display]');
  }

  bind() {
    this.root.querySelector('[data-trigger]').addEventListener('click', () => {
      this.modal.classList.add('open');
    });
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.modal.classList.remove('open');
    });
    this.root.querySelectorAll('.wui-lpf-item').forEach(el => {
      el.addEventListener('click', () => {
        this.value = el.textContent;
        this.display.textContent = this.value;
        this.root.querySelectorAll('.wui-lpf-item').forEach(x => x.classList.remove('selected'));
        el.classList.add('selected');
        this.modal.classList.remove('open');
        this.root.dispatchEvent(new CustomEvent('wui-listpicker-change', { detail: { value: this.value } }));
      });
    });
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiListPickerFlyout = WuiListPickerFlyout;
document.querySelectorAll('[data-wui-listpicker]').forEach(el => new WuiListPickerFlyout(el));