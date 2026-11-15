/* ── ListItem ── */
class WuiListItem {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-list-item');
    this.bind();
  }

  bind() {
    this.root.addEventListener('click', () => {
      // En WP 11 alternamos el estado selected
      if (document.body.dataset.wuiOs === 'wp11') {
        this.root.classList.toggle('selected');
      }
      this.root.dispatchEvent(new CustomEvent('wui-list-select', {
        detail: { selected: this.root.classList.contains('selected') }
      }));
    });
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiListItem = WuiListItem;
document.querySelectorAll('[data-wui-listitem]').forEach(el => new WuiListItem(el));