/* ── SemanticZoom ── */
class WuiSemanticZoom {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-semantic-zoom');
    this.items = JSON.parse(root.dataset.items || '[]');
    this.render();
    this.bind();
  }

  render() {
    // Vista ZoomIn: lista agrupada
    const groups = {};
    this.items.forEach(it => {
      const letter = it.name[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(it);
    });

    const zoomIn = Object.keys(groups).sort().map(letter => `
      <div class="wui-lls-group">
        <div class="wui-lls-group-header">${letter}</div>
        ${groups[letter].map(item => `<div class="wui-lls-item">${item.name}</div>`).join('')}
      </div>
    `).join('');

    // Vista ZoomOut: grid de letras
    const zoomOut = Object.keys(groups).sort().map(letter =>
      `<div class="wui-sz-cell">${letter}</div>`
    ).join('');

    this.root.innerHTML = `
      <div class="wui-sz-view wui-sz-zoom-in">${zoomIn}</div>
      <div class="wui-sz-view wui-sz-zoom-out"><div class="wui-sz-grid">${zoomOut}</div></div>
    `;
  }

  bind() {
    this.root.addEventListener('dblclick', () => this.toggle());
    this.root.querySelector('.wui-sz-grid').addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.root.classList.toggle('zoomed');
    this.root.dispatchEvent(new CustomEvent('wui-semanticzoom-toggle', {
      detail: { zoomed: this.root.classList.contains('zoomed') }
    }));
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiSemanticZoom = WuiSemanticZoom;
document.querySelectorAll('[data-wui-semanticzoom]').forEach(el => new WuiSemanticZoom(el));