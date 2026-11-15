/* ── DatePicker (fiel al HTML: baldosas + in-place) ── */
class WuiDatePicker {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-datepicker');
    this.current = {
      day: root.dataset.day || '14',
      month: root.dataset.month || 'oct',
      year: root.dataset.year || '2024'
    };
    this.render();
    this.bind();
  }

  render() {
    this.root.innerHTML = `
      <div class="wui-dtp-section">
        <div class="wui-dtp-section-label">date</div>
        <div class="wui-dtp-tiles" data-tiles>
          <div class="wui-dtp-tile" data-part="day">
            <span class="wui-dtp-tile-num" data-val="day">${this.current.day}</span>
            <span class="wui-dtp-tile-lbl">day</span>
          </div>
          <div class="wui-dtp-tile" data-part="month">
            <span class="wui-dtp-tile-num" data-val="month">${this.current.month}</span>
            <span class="wui-dtp-tile-lbl">month</span>
          </div>
          <div class="wui-dtp-tile" data-part="year">
            <span class="wui-dtp-tile-num" data-val="year">${this.current.year}</span>
            <span class="wui-dtp-tile-lbl">year</span>
          </div>
        </div>
        <div class="wui-dtp-hint">toca una baldosa para editar la fecha</div>
        <div class="wui-dtp-inplace" data-inplace>
          <div class="wui-dtp-inplace-title">select date</div>
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
    this.root.querySelectorAll('.wui-dtp-tile').forEach(t => {
      t.addEventListener('click', () => this.openInPlace());
    });
    this.root.querySelector('[data-action="confirm"]').addEventListener('click', () => this.confirm());
    this.root.querySelector('[data-action="cancel"]').addEventListener('click', () => this.close());
  }

  openInPlace() {
    const opts = {
      day: ['12','13','14','15','16'],
      month: ['sep','oct','nov','dec'],
      year: ['2023','2024','2025']
    };
    this.temp = { ...this.current };
    this.cols.innerHTML = Object.keys(opts).map(k => `
      <div class="wui-dtp-inplace-col">
        ${opts[k].map(v =>
          `<div class="wui-dtp-opt${v === this.current[k] ? ' selected' : ''}" data-key="${k}" data-value="${v}">${v}</div>`
        ).join('')}
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
    ['day', 'month', 'year'].forEach(k => {
      this.root.querySelector(`[data-val="${k}"]`).textContent = this.current[k];
    });
    this.close();
    this.root.dispatchEvent(new CustomEvent('wui-date-change', { detail: this.current }));
  }

  close() {
    this.inplace.classList.remove('open');
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiDatePicker = WuiDatePicker;
document.querySelectorAll('[data-wui-datepicker]').forEach(el => new WuiDatePicker(el));