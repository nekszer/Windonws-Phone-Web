/* ── SectionHeader ── */
class WuiSectionHeader {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-section');
    // Si el HTML ya tiene el contenido, no lo regeneramos
    if (!this.root.textContent.trim()) {
      this.root.textContent = root.dataset.title || 'Sección';
    }
    // Añadir meta si existe
    if (root.dataset.meta && !this.root.querySelector('.wui-section-meta')) {
      const meta = document.createElement('span');
      meta.className = 'wui-section-meta';
      meta.textContent = root.dataset.meta;
      this.root.appendChild(meta);
    }
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiSectionHeader = WuiSectionHeader;
document.querySelectorAll('[data-wui-section]').forEach(el => new WuiSectionHeader(el));