/* ── ListPickerFlyout ── */
class WuiListPickerFlyout {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-list-picker');
    this.items = JSON.parse(root.dataset.items || '["Opción 1","Opción 2","Opción 3"]');
    this.value = root.dataset.value || this.items[0];
    this.title = root.dataset.title || 'Seleccionar opción';
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
          <div class="wui-lpf-header">${this.title}</div>
          <div class="wui-lpf-list">
            ${this.items.map(it =>
              `<div class="wui-lpf-item${it === this.value ? ' selected' : ''}" data-value="${it}">${it}</div>`
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
        this.setValue(el.dataset.value);
        this.modal.classList.remove('open');
      });
    });
  }

  setValue(value) {
    this.value = value;
    this.display.textContent = value;
    this.root.querySelectorAll('.wui-lpf-item').forEach(x => {
      x.classList.toggle('selected', x.dataset.value === value);
    });
    
    // IMPORTANTE: bubbles: true para que el index.html lo escuche
    this.root.dispatchEvent(new CustomEvent('wui-listpicker-change', {
      detail: { value },
      bubbles: true
    }));
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiListPickerFlyout = WuiListPickerFlyout;
document.querySelectorAll('[data-wui-listpicker]').forEach(el => new WuiListPickerFlyout(el));