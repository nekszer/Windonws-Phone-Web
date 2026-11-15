class WuiTimePicker {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-timepicker');
    this.current = { hour: root.dataset.hour || '09', minute: root.dataset.minute || '15', second: root.dataset.second || '30' };
    this.render();
    this.bind();
  }

  render() {
    this.root.innerHTML = `
      <div class="wui-dtp-section">
        <div class="wui-dtp-section-label">time</div>
        <div class="wui-dtp-tiles" data-tiles>
          <div class="wui-dtp-tile" data-part="hour"><span class="wui-dtp-tile-num" data-val="hour">${this.current.hour}</span><span class="wui-dtp-tile-lbl">hour</span></div>
          <div class="wui-dtp-tile" data-part="minute"><span class="wui-dtp-tile-num" data-val="minute">${this.current.minute}</span><span class="wui-dtp-tile-lbl">minute</span></div>
          <div class="wui-dtp-tile" data-part="second"><span class="wui-dtp-tile-num" data-val="second">${this.current.second}</span><span class="wui-dtp-tile-lbl">second</span></div>
        </div>
        <div class="wui-dtp-hint">toca una baldosa para editar la hora</div>
        <div class="wui-dtp-inplace" data-inplace>
          <div class="wui-dtp-inplace-title">select time</div>
          <div class="wui-dtp-inplace-cols" data-cols></div>
          <div class="wui-dtp-inplace-actions">
            <button class="wui-dtp-circle-btn" data-action="confirm">✓</button>
            <button class="wui-dtp-circle-btn" data-action="cancel">✕</button>
          </div>
        </div>
      </div>
    `;
    this.inplace = this.root.querySelector('[data-inplace]');
    this.cols = this.root.querySelector('[data-cols]');
  }

  bind() {
    this.root.querySelectorAll('.wui-dtp-tile').forEach(t => t.addEventListener('click', () => this.openInPlace()));
    this.root.querySelector('[data-action="confirm"]').addEventListener('click', () => this.confirm());
    this.root.querySelector('[data-action="cancel"]').addEventListener('click', () => this.close());
  }

  openInPlace() {
    const opts = { hour: ['08','09','10','11','12'], minute: ['15','30','45'], second: ['00','15','30'] };
    this.temp = { ...this.current };
    this.cols.innerHTML = Object.keys(opts).map(k => `
      <div class="wui-dtp-inplace-col">
        ${opts[k].map(v => `<div class="wui-dtp-opt${v === this.current[k] ? ' selected' : ''}" data-key="${k}" data-value="${v}">${v}</div>`).join('')}
      </div>
    `).join('');
    this.cols.querySelectorAll('.wui-dtp-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        this.temp[opt.dataset.key] = opt.dataset.value;
        opt.parentElement.querySelectorAll('.wui-dtp-opt').forEach(x => x.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });
    this.inplace.classList.add('open');
  }

  confirm() {
    this.current = { ...this.temp };
    ['hour', 'minute', 'second'].forEach(k => { this.root.querySelector(`[data-val="${k}"]`).textContent = this.current[k]; });
    this.close();
    this.root.dispatchEvent(new CustomEvent('wui-time-change', { detail: this.current }));
  }

  close() { this.inplace.classList.remove('open'); }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiTimePicker = WuiTimePicker;
document.querySelectorAll('[data-wui-timepicker]').forEach(el => new WuiTimePicker(el));