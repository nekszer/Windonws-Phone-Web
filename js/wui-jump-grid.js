/* ── JumpGrid ── */
class WuiJumpGrid {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-jump-grid');
    this.letters = JSON.parse(root.dataset.letters || '["a","b","c","d","e","f","g","h","i","j","k","l","m","n"]');
    this.active = root.dataset.active || this.letters[0];
    this.render();
  }

  render() {
    this.root.innerHTML = this.letters.map(l =>
      `<button class="wui-jump-cell${l === this.active ? ' active' : ''}" data-letter="${l}">${l}</button>`
    ).join('');
    this.root.querySelectorAll('.wui-jump-cell').forEach(el => {
      el.addEventListener('click', () => {
        this.root.querySelectorAll('.wui-jump-cell').forEach(c => c.classList.remove('active'));
        el.classList.add('active');
        this.root.dispatchEvent(new CustomEvent('wui-jump', {
          detail: { letter: el.dataset.letter }
        }));
      });
    });
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiJumpGrid = WuiJumpGrid;
document.querySelectorAll('[data-wui-jumpgrid]').forEach(el => new WuiJumpGrid(el));