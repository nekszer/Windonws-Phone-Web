/* ── LongListSelector (GroupStyle + JumpList) ── */
class WuiLongListSelector {
  constructor(root) {
    this.root = root;
    this.root.classList.add('wui-lls');
    this.items = JSON.parse(root.dataset.items || '[]');
    this.render();
  }

  render() {
    const groups = {};
    this.items.forEach(it => {
      const letter = it.name[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(it);
    });

    const list = document.createElement('div');
    list.className = 'wui-lls-groups';
    Object.keys(groups).sort().forEach(letter => {
      const group = document.createElement('div');
      group.className = 'wui-lls-group';
      group.id = 'lls-group-' + letter;
      group.innerHTML = `<div class="wui-lls-group-header">${letter}</div>`;
      groups[letter].forEach(item => {
        const el = document.createElement('div');
        el.className = 'wui-lls-item';
        el.textContent = item.name;
        el.addEventListener('click', () => {
          this.root.dispatchEvent(new CustomEvent('wui-lls-select', { detail: item }));
        });
        group.appendChild(el);
      });
      list.appendChild(group);
    });
    this.root.appendChild(list);

    // JumpList lateral
    const jump = document.createElement('div');
    jump.className = 'wui-lls-jumplist';
    Object.keys(groups).sort().forEach(letter => {
      const j = document.createElement('div');
      j.className = 'wui-lls-jumplist-item';
      j.textContent = letter;
      j.addEventListener('click', () => {
        document.getElementById('lls-group-' + letter)?.scrollIntoView({ behavior: 'smooth' });
        jump.querySelectorAll('.wui-lls-jumplist-item').forEach(x => x.classList.remove('active'));
        j.classList.add('active');
      });
      jump.appendChild(j);
    });
    this.root.appendChild(jump);
  }
}

WUI.classes = WUI.classes || {};
WUI.classes.WuiLongListSelector = WuiLongListSelector;
document.querySelectorAll('[data-wui-lls]').forEach(el => new WuiLongListSelector(el));