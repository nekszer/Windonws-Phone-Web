/* ── SwatchGrid ── */
class WuiSwatchGrid {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-swatch-grid');

    // Paleta extendida: WP8 + WP10 + extendidos
    this.defaultColors = [
      // Windows Phone 8
      '#0078d7', '#f7630c', '#107c10', '#e81123', '#8764b8', '#00b294',
      '#ffb900', '#e3008c', '#00aba9', '#6a0dad',
      // Windows 10 Mobile
      '#0078d4', '#ffb900', '#e81123', '#00b294', '#8764b8', '#f7630c',
      '#7a7574', '#4c4a48', '#767676', '#00b7c3',
      // Extendidos
      '#ff4343', '#00cc6a', '#0099bc', '#8764b8', '#b146c2', '#e74856',
      '#ff8c00', '#498205', '#00bcf2', '#6b69d6', '#c239b3', '#9a0089'
    ];

    const custom = root.dataset.colors ? JSON.parse(root.dataset.colors) : null;
    this.colors = custom || this.defaultColors;
    this.active = root.dataset.active || this.colors[0];
    this.render();
  }

  render() {
    this.root.innerHTML = this.colors.map(c =>
      `<button class="wui-swatch${c === this.active ? ' active' : ''}" style="background:${c}" data-color="${c}" title="${c}"></button>`
    ).join('');
    this.root.querySelectorAll('.wui-swatch').forEach(el => {
      el.addEventListener('click', () => {
        this.root.querySelectorAll('.wui-swatch').forEach(s => s.classList.remove('active'));
        el.classList.add('active');
        this.active = el.dataset.color;
        WUI.Accent.set(this.active);
        this.root.dispatchEvent(new CustomEvent('wui-swatch-select', {
          detail: { color: el.dataset.color }
        }));
      });
    });
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiSwatchGrid = WuiSwatchGrid;
document.querySelectorAll('[data-wui-swatchgrid]').forEach(el => new WuiSwatchGrid(el));