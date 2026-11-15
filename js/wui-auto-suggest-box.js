/* ── AutoSuggestBox ── */
class WuiAutoSuggestBox {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-auto-suggest');
    this.data = JSON.parse(root.dataset.suggestions || '[]');
    this.placeholder = root.dataset.placeholder || 'Buscar...';
    this.render();
    this.bind();
  }

  render() {
    this.root.innerHTML = `
      <input class="wui-asb-input" type="text" placeholder="${this.placeholder}" autocomplete="off">
      <div class="wui-asb-suggestions"></div>
    `;
    this.input = this.root.querySelector('.wui-asb-input');
    this.panel = this.root.querySelector('.wui-asb-suggestions');
  }

  bind() {
    this.input.addEventListener('input', () => this.filter());
    this.input.addEventListener('focus', () => this.filter());
    document.addEventListener('click', (e) => {
      if (!this.root.contains(e.target)) this.panel.classList.remove('open');
    });
  }

  filter() {
    const q = this.input.value.toLowerCase().trim();
    const matches = q ? this.data.filter(d => d.toLowerCase().includes(q)) : this.data;
    this.panel.innerHTML = matches.map(m => `<div class="wui-asb-item">${m}</div>`).join('');
    this.panel.classList.toggle('open', matches.length > 0);
    this.panel.querySelectorAll('.wui-asb-item').forEach(el => {
      el.addEventListener('click', () => {
        this.input.value = el.textContent;
        this.panel.classList.remove('open');
        this.root.dispatchEvent(new CustomEvent('wui-suggest-select', {
          detail: { value: el.textContent }
        }));
      });
    });
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiAutoSuggestBox = WuiAutoSuggestBox;
document.querySelectorAll('[data-wui-autosuggest]').forEach(el => new WuiAutoSuggestBox(el));