/* ── Slider ── */
class WuiSlider {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-slider');
    this.min = parseFloat(root.dataset.min || 0);
    this.max = parseFloat(root.dataset.max || 100);
    this.value = parseFloat(root.dataset.value || 50);
    this.render();
    this.bind();
    this.update();
  }

  render() {
    this.root.innerHTML = `
      <div class="wui-slider-meta">
        <span>${this.root.dataset.label || 'Valor'}</span>
        <span class="wui-slider-value">${Math.round(this.value)}</span>
      </div>
      <div class="wui-slider-track">
        <div class="wui-slider-fill"></div>
        <div class="wui-slider-thumb"></div>
      </div>
    `;
    this.track = this.root.querySelector('.wui-slider-track');
    this.fill = this.root.querySelector('.wui-slider-fill');
    this.thumb = this.root.querySelector('.wui-slider-thumb');
    this.valueEl = this.root.querySelector('.wui-slider-value');
  }

  bind() {
    this.track.addEventListener('pointerdown', (e) => {
      const move = (ev) => this.setFromEvent(ev);
      const up = () => {
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerup', up);
      };
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', up);
      this.setFromEvent(e);
    });
  }

  setFromEvent(e) {
    const rect = this.track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    this.value = this.min + ratio * (this.max - this.min);
    this.update();
    this.root.dispatchEvent(new CustomEvent('wui-slider', { detail: { value: this.value } }));
  }

  update() {
    const pct = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.fill.style.width = pct + '%';
    this.thumb.style.left = pct + '%';
    if (this.valueEl) this.valueEl.textContent = Math.round(this.value);
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiSlider = WuiSlider;
document.querySelectorAll('[data-wui-slider]').forEach(el => new WuiSlider(el));