/* ============================================================
   WindowsUI SDK v3.0 — Core
   Inicializa el namespace WUI, gestiona tema/OS/acento
   y expone utilidades compartidas.
   ============================================================ */

(function (global) {
  'use strict';

  /* ── Namespace ── */
  const WUI = global.WUI || {};
  WUI.classes = WUI.classes || {};
  global.WUI = WUI;

  /* ── Utilidades DOM ── */
  WUI.$ = (sel, ctx = document) => ctx.querySelector(sel);
  WUI.$$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  WUI.on = (el, ev, fn) => el && el.addEventListener(ev, fn);
  WUI.emit = (el, name, detail) =>
    el && el.dispatchEvent(new CustomEvent(name, { detail }));

  /* ============================================================
     GESTIÓN DE TEMA (dark / light)
     Persiste en localStorage['wui-theme']
     ============================================================ */
  WUI.Theme = {
    get() {
      return document.documentElement.dataset.wuiTheme || 'dark';
    },
    set(theme) {
      if (!['dark', 'light'].includes(theme)) return;
      document.documentElement.dataset.wuiTheme = theme;
      try { localStorage.setItem('wui-theme', theme); } catch (e) {}
      document.dispatchEvent(new CustomEvent('wui-theme-change', { detail: { theme } }));
    },
    toggle() {
      this.set(this.get() === 'dark' ? 'light' : 'dark');
    }
  };

  /* ============================================================
     GESTIÓN DE OS (wp8 / wp10 / wp11)
     Persiste en localStorage['wui-os']
     ============================================================ */
  WUI.OS = {
    get() {
      return document.body.dataset.wuiOs || 'wp8';
    },
    set(os) {
      if (!['wp8', 'wp10', 'wp11'].includes(os)) return;
      document.body.dataset.wuiOs = os;
      try { localStorage.setItem('wui-os', os); } catch (e) {}
      document.dispatchEvent(new CustomEvent('wui-os-change', { detail: { os } }));
    },
    list() {
      return ['wp8', 'wp10', 'wp11'];
    }
  };

  /* ============================================================
     GESTIÓN DE ACENTO
     Modifica las custom properties --wui-accent*
     ============================================================ */
  WUI.Accent = {
    get() {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--wui-accent')
        .trim() || '#0078d4';
    },
    set(color) {
      if (!color) return;
      const root = document.documentElement;
      root.style.setProperty('--wui-accent', color);
      root.style.setProperty('--wui-accent-soft', color + '26');
      root.style.setProperty('--wui-accent-border', color + '73');
      try { localStorage.setItem('wui-accent', color); } catch (e) {}
      document.dispatchEvent(new CustomEvent('wui-accent-change', { detail: { color } }));
    },
    palettes: {
      windows: '#0078d4',
      lumia:   '#f7630c',
      xbox:    '#107c10',
      crimson: '#e81123',
      purple:  '#8764b8',
      teal:    '#00b294'
    }
  };

  /* ============================================================
     REGISTRO DE CONTROLES
     Cada archivo de control hace:
       WUI.register('WuiToggle', WuiToggle, '[data-wui-toggle]');
     ============================================================ */
  WUI.register = function (name, Class, selector) {
    if (!name || !Class) return;
    WUI.classes[name] = Class;
    if (selector) {
      WUI.$$(selector).forEach(el => {
        if (!el.__wui) {
          el.__wui = new Class(el);
        }
      });
    }
  };

  /* ============================================================
     SINCRONIZACIÓN ENTRE PADRE E IFRAMES
     Cuando index.html cambia OS/tema/acento, propaga a iframes.
     ============================================================ */
  WUI.syncToIframes = function () {
    const os = WUI.OS.get();
    const theme = WUI.Theme.get();
    const accent = WUI.Accent.get();

    WUI.$$('iframe[data-control]').forEach(iframe => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        doc.body.dataset.wuiOs = os;
        doc.documentElement.dataset.wuiTheme = theme;
        doc.documentElement.style.setProperty('--wui-accent', accent);
        doc.documentElement.style.setProperty('--wui-accent-soft', accent + '26');
        doc.documentElement.style.setProperty('--wui-accent-border', accent + '73');
      } catch (e) {
        // iframe bloqueado por cross-origin
      }
    });
  };

  /* ============================================================
     HOOK AUTOMÁTICO
     Cada iframe de control, al terminar de cargar, hereda el
     OS/tema/acento del padre si existe.
     ============================================================ */
  WUI.$$('iframe[data-control]').forEach(iframe => {
    iframe.addEventListener('load', () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        doc.body.dataset.wuiOs = WUI.OS.get();
        doc.documentElement.dataset.wuiTheme = WUI.Theme.get();
        const accent = WUI.Accent.get();
        doc.documentElement.style.setProperty('--wui-accent', accent);
        doc.documentElement.style.setProperty('--wui-accent-soft', accent + '26');
        doc.documentElement.style.setProperty('--wui-accent-border', accent + '73');
      } catch (e) {}
    });
  });

  /* ============================================================
     INICIALIZACIÓN
     Restaura estado desde localStorage y engancha listeners
     ============================================================ */
  WUI.init = function () {
    // Restaurar tema
    try {
      const savedTheme = localStorage.getItem('wui-theme');
      if (savedTheme) document.documentElement.dataset.wuiTheme = savedTheme;
      else if (!document.documentElement.dataset.wuiTheme)
        document.documentElement.dataset.wuiTheme = 'dark';
    } catch (e) {}

    // Restaurar OS
    try {
      const savedOs = localStorage.getItem('wui-os');
      if (savedOs) document.body.dataset.wuiOs = savedOs;
      else if (!document.body.dataset.wuiOs)
        document.body.dataset.wuiOs = 'wp8';
    } catch (e) {}

    // Restaurar acento
    try {
      const savedAccent = localStorage.getItem('wui-accent');
      if (savedAccent) WUI.Accent.set(savedAccent);
    } catch (e) {}

    // Notificar
    document.dispatchEvent(new CustomEvent('wui-ready'));
  };

  /* ── Auto-init ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', WUI.init);
  } else {
    WUI.init();
  }

})(window);