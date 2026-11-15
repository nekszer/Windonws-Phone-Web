/* ── ColorPicker ── */
class WuiColorPicker {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-colorpicker');
    this.hue = 210;
    this.sat = 80;
    this.val = 90;
    this.render();
    this.bind();
    this.update();
  }

  render() {
    this.root.innerHTML = `
      <div class="wui-cp-spectrum"></div>
      <div class="wui-cp-sliders">
        <input type="range" data-ch="hue" min="0" max="360" value="${this.hue}">
        <input type="range" data-ch="sat" min="0" max="100" value="${this.sat}">
        <input type="range" data-ch="val" min="0" max="100" value="${this.val}">
      </div>
      <div class="wui-cp-preview"></div>
      <div class="wui-cp-actions">
        <button class="wui-cp-btn" data-action="cancel">Cancelar</button>
        <button class="wui-cp-btn primary" data-action="confirm">Aceptar</button>
      </div>
    `;
    this.spectrum = this.root.querySelector('.wui-cp-spectrum');
    this.preview = this.root.querySelector('.wui-cp-preview');
  }

  bind() {
    this.root.querySelectorAll('[data-ch]').forEach(s => {
      s.addEventListener('input', (e) => {
        this[e.target.dataset.ch] = parseFloat(e.target.value);
        this.update();
      });
    });
    this.spectrum.addEventListener('click', (e) => {
      const rect = this.spectrum.getBoundingClientRect();
      this.sat = ((e.clientX - rect.left) / rect.width) * 100;
      this.val = 100 - ((e.clientY - rect.top) / rect.height) * 100;
      this.update();
    });
    this.root.querySelector('[data-action="confirm"]').addEventListener('click', () => {
      this.root.dispatchEvent(new CustomEvent('wui-color-confirm', { detail: { hex: this.toHex() } }));
    });
    this.root.querySelector('[data-action="cancel"]').addEventListener('click', () => {
      this.root.dispatchEvent(new CustomEvent('wui-color-cancel'));
    });
  }

  toHex() {
    const c = (this.val / 100) * (this.sat / 100);
    const x = c * (1 - Math.abs(((this.hue / 60) % 2) - 1));
    const m = (this.val / 100) - c;
    let r = 0, g = 0, b = 0;
    if (this.hue < 60) { r = c; g = x; }
    else if (this.hue < 120) { r = x; g = c; }
    else if (this.hue < 180) { g = c; b = x; }
    else if (this.hue < 240) { g = x; b = c; }
    else if (this.hue < 300) { r = x; b = c; }
    else { r = c; b = x; }
    const h = v => Math.round((v + m) * 255).toString(16).padStart(2, '0');
    return '#' + h(r) + h(g) + h(b);
  }

  update() {
    if (this.preview) this.preview.style.background = this.toHex();
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiColorPicker = WuiColorPicker;
document.querySelectorAll('[data-wui-colorpicker]').forEach(el => new WuiColorPicker(el));