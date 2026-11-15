# WindowsUI SDK

[![Estado](https://img.shields.io/badge/estado-activo-brightgreen)](#)
[![Licencia](https://img.shields.io/badge/licencia-MIT-blue)](#-licencia)
[![Controles](https://img.shields.io/badge/controles-22-orange)](#-controles-disponibles)
[![Sin dependencias](https://img.shields.io/badge/dependencias-0-success)](#-características)

> SDK ligero basado en **HTML, CSS y JavaScript puro** para construir interfaces que replican fielmente los controles de **Windows Phone 8.1 (Metro UI)**, **Windows 10 Mobile** y **Windows 11 (Fluent / WinUI 3)** en la web.

El SDK está diseñado para ser **modular, reutilizable y funcional**: cada control vive en su propio archivo CSS y JS, emite eventos, expone métodos públicos y se adapta automáticamente al sistema operativo y tema activos.

---

## 📑 Índice

1. [Características](#-características)
2. [Estructura del proyecto](#-estructura-del-proyecto)
3. [Instalación](#-instalación)
4. [Uso básico](#-uso-básico)
5. [Controles disponibles](#-controles-disponibles)
6. [Eventos personalizados](#-eventos-personalizados)
7. [API pública (WUI)](#-api-pública-wui)
8. [Uso de los controles principales](#-uso-de-los-controles-principales)
9. [Demo interactiva](#-demo-interactiva-indexhtml)
10. [Fidelidad visual por era](#-fidelidad-visual-por-era)
11. [Notas de fidelidad histórica](#-notas-de-fidelidad-histórica)
12. [Contribuir](#-contribuir)
13. [Licencia](#-licencia)
14. [Créditos](#-créditos)

---

## ✨ Características

- **22 controles** implementados en tres eras visuales.
- **Cambio global de OS** con una sola línea: `<body data-wui-os="wp8|wp10|wp11">`.
- **Temas claro / oscuro** con `<html data-wui-theme="dark|light">`.
- **Acento dinámico** mediante variables CSS (`--wui-accent`).
- **Arquitectura modular**: un archivo CSS + un archivo JS por control.
- **API pública por instancia**: métodos como `setMode()`, `setValue()`, `toggle()`.
- **Eventos personalizados**: `wui-toggle`, `wui-choice`, `wui-command`, `wui-color-confirm`, etc.
- **Sincronización automática** entre la página maestra y los iframes de demo.
- **Sin dependencias**: solo HTML, CSS y JS nativo.

---

## 📁 Estructura del proyecto

```
windowsui-sdk/
├── index.html                 ← Demo maestro con iframes
├── README.md
│
├── css/
│   ├── wui-core.css           ← Tokens, temas, reset, layout
│   ├── wui-auto-suggest-box.css
│   ├── wui-choice.css
│   ├── wui-color-picker.css
│   ├── wui-command-bar.css
│   ├── wui-context-menu.css
│   ├── wui-date-picker.css
│   ├── wui-dialog.css
│   ├── wui-hub.css
│   ├── wui-info-sheet.css
│   ├── wui-jump-grid.css
│   ├── wui-list-item.css
│   ├── wui-list-picker-flyout.css
│   ├── wui-long-list-selector.css
│   ├── wui-picker-flyout.css
│   ├── wui-pivot.css
│   ├── wui-progress-ring.css
│   ├── wui-section-header.css
│   ├── wui-semantic-zoom.css
│   ├── wui-slider.css
│   ├── wui-swatch-grid.css
│   ├── wui-time-picker.css
│   └── wui-toggle.css
│
├── js/
│   ├── wui-core.js            ← Namespace WUI, tema, OS, acento
│   ├── wui-auto-suggest-box.js
│   ├── wui-choice.js
│   ├── wui-color-picker.js
│   ├── wui-command-bar.js
│   ├── wui-context-menu.js
│   ├── wui-date-picker.js
│   ├── wui-dialog.js
│   ├── wui-hub.js
│   ├── wui-info-sheet.js
│   ├── wui-jump-grid.js
│   ├── wui-list-item.js
│   ├── wui-list-picker-flyout.js
│   ├── wui-long-list-selector.js
│   ├── wui-picker-flyout.js
│   ├── wui-pivot.js
│   ├── wui-progress-ring.js
│   ├── wui-section-header.js
│   ├── wui-semantic-zoom.js
│   ├── wui-slider.js
│   ├── wui-swatch-grid.js
│   ├── wui-time-picker.js
│   └── wui-toggle.js
│
└── controls/
    ├── auto-suggest-box.html
    ├── choice.html
    ├── color-picker.html
    ├── command-bar.html
    ├── context-menu.html
    ├── date-picker.html
    ├── dialog.html
    ├── hub.html
    ├── info-sheet.html
    ├── jump-grid.html
    ├── list-item.html
    ├── list-picker-flyout.html
    ├── long-list-selector.html
    ├── picker-flyout.html
    ├── pivot.html
    ├── progress-ring.html
    ├── section-header.html
    ├── semantic-zoom.html
    ├── slider.html
    ├── swatch-grid.html
    ├── time-picker.html
    └── toggle.html
```

---

## 🚀 Instalación

### 1. Descarga o clona el repositorio

```bash
git clone https://github.com/tu-usuario/windowsui-sdk.git
cd windowsui-sdk

# Opción 1: abrir directamente
open index.html

# Opción 2: servidor local (recomendado para iframes)
npx serve .
# o
python -m http.server 8000
```

### 2. Incluye los archivos del SDK en tu página

```html
<!DOCTYPE html>
<html data-wui-theme="dark" lang="es">
<head>
  <link rel="stylesheet" href="css/wui-core.css">
  <link rel="stylesheet" href="css/wui-toggle.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Segoe+UI+Variable+Display:wght@300;400;500;600;700&family=Segoe+UI+Variable+Text:wght@300;400;500;600&family=Cascadia+Code:wght@400;500&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
</head>
<body data-wui-os="wp8">

  <div class="wui-toggle" data-wui-toggle data-on-text="On" data-off-text="Off">
    <span class="wui-toggle-label">On</span>
    <div class="wui-toggle-track checked">
      <div class="wui-toggle-thumb"></div>
    </div>
  </div>

  <script src="js/wui-core.js"></script>
  <script src="js/wui-toggle.js"></script>
</body>
</html>
```

> **Importante:** `wui-core.js` debe cargarse **antes** que cualquier control.

---

## 🎨 Uso básico

### Cambiar de sistema operativo

El OS activo se define en `<body>` y afecta a todos los controles:

```html
<body data-wui-os="wp8">   <!-- Windows Phone 8.1 (Metro) -->
<body data-wui-os="wp10">  <!-- Windows 10 Mobile -->
<body data-wui-os="wp11">  <!-- Windows 11 (Fluent) -->
```

Programáticamente:

```javascript
WUI.OS.set('wp10');
WUI.OS.get();      // → 'wp10'
WUI.OS.list();     // → ['wp8', 'wp10', 'wp11']
```

### Cambiar de tema

```html
<html data-wui-theme="dark">
<html data-wui-theme="light">
```

```javascript
WUI.Theme.set('light');
WUI.Theme.toggle();
WUI.Theme.get();   // → 'light'
```

### Cambiar el color de acento

```javascript
WUI.Accent.set('#f7630c');
WUI.Accent.get();                    // → '#f7630c'
WUI.Accent.palettes;                 // → { windows, lumia, xbox, crimson, purple, teal }
```

---

## 🧩 Controles disponibles

| Control              | Selector HTML             | Archivos CSS/JS            |
| -------------------- | ------------------------- | -------------------------- |
| AutoSuggestBox       | `[data-wui-autosuggest]`  | `wui-auto-suggest-box.*`   |
| Checkbox / Radio     | `[data-wui-choice]`       | `wui-choice.*`             |
| ColorPicker          | `[data-wui-colorpicker]`  | `wui-color-picker.*`       |
| CommandBar           | `[data-wui-commandbar]`   | `wui-command-bar.*`       |
| ContextMenu          | `[data-wui-contextmenu]`  | `wui-context-menu.*`      |
| DatePicker           | `[data-wui-datepicker]`   | `wui-date-picker.*`       |
| ContentDialog        | `[data-wui-dialog]`       | `wui-dialog.*`            |
| Hub                  | `[data-wui-hub]`          | `wui-hub.*`               |
| InfoSheet            | `[data-wui-infosheet]`    | `wui-info-sheet.*`        |
| JumpGrid             | `[data-wui-jumpgrid]`      | `wui-jump-grid.*`         |
| ListItem             | `[data-wui-listitem]`     | `wui-list-item.*`         |
| ListPickerFlyout     | `[data-wui-listpicker]`   | `wui-list-picker-flyout.*`|
| LongListSelector     | `[data-wui-lls]`          | `wui-long-list-selector.*`|
| PickerFlyout         | `[data-wui-picker]`       | `wui-picker-flyout.*`     |
| Pivot                | `[data-wui-pivot]`        | `wui-pivot.*`             |
| ProgressRing         | `[data-wui-progressring]` | `wui-progress-ring.*`     |
| SectionHeader        | `[data-wui-section]`      | `wui-section-header.*`   |
| SemanticZoom         | `[data-wui-semanticzoom]` | `wui-semantic-zoom.*`     |
| Slider               | `[data-wui-slider]`       | `wui-slider.*`            |
| SwatchGrid           | `[data-wui-swatchgrid]`   | `wui-swatch-grid.*`       |
| TimePicker           | `[data-wui-timepicker]`   | `wui-time-picker.*`       |
| Toggle               | `[data-wui-toggle]`       | `wui-toggle.*`            |

Cada control se inicializa automáticamente al cargar su JS. También puedes obtener la instancia:

```javascript
const toggle = document.querySelector('[data-wui-toggle]').__wui;
toggle.toggle();
```

---

## 📡 Eventos personalizados

Todos los controles emiten eventos que puedes escuchar globalmente:

```javascript
document.addEventListener('wui-toggle', e => {
  console.log('Toggle:', e.detail.checked);
});

document.addEventListener('wui-choice', e => {
  console.log('Choice:', e.detail.checked);
});

document.addEventListener('wui-command', e => {
  console.log('Comando:', e.detail.action);
});

document.addEventListener('wui-cmdbar-mode', e => {
  console.log('Modo CommandBar:', e.detail.mode);
});

document.addEventListener('wui-color-confirm', e => {
  console.log('Color elegido:', e.detail.hex);
});

document.addEventListener('wui-date-change', e => {
  console.log('Fecha:', e.detail);   // { day, month, year }
});

document.addEventListener('wui-time-change', e => {
  console.log('Hora:', e.detail);    // { hour, minute, second }
});

document.addEventListener('wui-menu', e => {
  console.log('Menú:', e.detail.action);
});

document.addEventListener('wui-jump', e => {
  console.log('Letra:', e.detail.letter);
});

document.addEventListener('wui-swatch-select', e => {
  console.log('Color:', e.detail.color);
});

document.addEventListener('wui-suggest-select', e => {
  console.log('Sugerencia:', e.detail.value);
});
```

### Eventos globales del SDK

```javascript
document.addEventListener('wui-ready', () => { /* SDK listo */ });
document.addEventListener('wui-theme-change', e => console.log(e.detail.theme));
document.addEventListener('wui-os-change',    e => console.log(e.detail.os));
document.addEventListener('wui-accent-change', e => console.log(e.detail.color));
```

---

## 🔌 API pública (WUI)

```javascript
// Tema
WUI.Theme.set('light');
WUI.Theme.get();
WUI.Theme.toggle();

// Sistema operativo
WUI.OS.set('wp10');
WUI.OS.get();
WUI.OS.list();

// Acento
WUI.Accent.set('#00b294');
WUI.Accent.get();
WUI.Accent.palettes;

// Registro de controles (uso interno y extensiones)
WUI.register('MiControl', MiClase, '[data-mi-control]');

// Sincronizar estado a iframes (útil en el index maestro)
WUI.syncToIframes();

// Utilidades DOM
WUI.$(selector);
WUI.$$(selector);
WUI.on(el, 'click', fn);
WUI.emit(el, 'mi-evento', { data: 1 });

// Registro de clases
WUI.classes;   // { WuiToggle, WuiSlider, ... }
```

---

## 🎛️ Uso de los controles principales

### Toggle

```html
<div class="wui-toggle" data-wui-toggle data-on-text="On" data-off-text="Off">
  <span class="wui-toggle-label">On</span>
  <div class="wui-toggle-track checked">
    <div class="wui-toggle-thumb"></div>
  </div>
</div>
```

### CommandBar (3 modos)

```html
<div data-wui-commandbar
     data-mode="sticky"
     data-mock="Contenido de la app"
     data-actions='[{"icon":"edit","label":"editar"},{"icon":"add","label":"nuevo"},{"icon":"share","label":"compartir"}]'
     data-menu='[{"label":"seleccionar todo"},{"label":"configuración"}]'></div>
```

```javascript
const cmdbar = document.querySelector('[data-wui-commandbar]').__wui;
cmdbar.setMode('collapsed');   // 'collapsed' | 'sticky' | 'expand'
```

### Slider

```html
<div data-wui-slider data-label="Brillo" data-value="65" data-min="0" data-max="100"></div>
```

### SwatchGrid (30+ colores)

```html
<div data-wui-swatchgrid
     data-active="#0078d4"
     data-colors='["#0078d4","#f7630c","#107c10","#e81123"]'></div>
```

```javascript
const grid = document.querySelector('[data-wui-swatchgrid]').__wui;
grid.setColor('#00b294');
```

### DatePicker / TimePicker

```html
<div data-wui-datepicker data-day="14" data-month="oct" data-year="2024"></div>
<div data-wui-timepicker data-hour="09" data-minute="15" data-second="30"></div>
```

### ListPickerFlyout

```html
<div data-wui-listpicker
     data-title="Seleccionar opción"
     data-value="Nokia Tune"
     data-items='["Nokia Tune","Pure","Lumia Breeze"]'></div>
```

```javascript
const picker = document.querySelector('[data-wui-listpicker]').__wui;
picker.setValue('Pure');
picker.setItems(['A', 'B', 'C']);
```

---

## 🖼️ Demo interactiva (index.html)

El archivo `index.html` incluye:

- Selector de OS implementado como **WuiListPickerFlyout** real.
- Selector de tema implementado como **3 WuiChoice radio** (Automático | Claro | Oscuro).
- Selector de acento implementado como **WuiSwatchGrid ampliado** (30+ colores).
- **Grid de 22 tarjetas** que cargan cada control en un iframe aislado.
- **Sincronización automática** de OS, tema y acento a todos los iframes.

---

## 🎨 Fidelidad visual por era

| Era                | Características principales                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **WP 8 (Metro)**   | 0px radius, bordes 2.5px, tipografía Segoe Light, mayúsculas sostenidas, inversión de color en `:active`, alto contraste     |
| **WP 10 (Mobile)** | 2px radius, bordes 2px, flat accent, tipografía Semibold, labels uppercase, menús hacia arriba                               |
| **Win 11 (Fluent)** | 4–8px radius, Acrylic (`backdrop-filter: blur`), Mica, micro-sombras, labels sentence-case, animaciones spring              |

---

## ⚠️ Notas de fidelidad histórica

Algunos controles se conservan como **legado acumulativo** aunque no existieran nativamente en todas las eras:

- **ColorPicker**: solo existió nativamente en WinUI 3 (Win 11). Se muestra en las tres eras por compatibilidad de la API.
- **InfoSheet / BottomFlyout**: en WP 8 se renderiza como panel lateral de acento (Flyout), en WP 10 como bottom sheet y en Win 11 como Acrylic con drag handle.
- **LongListSelector**: nativo de WP 8.0, reemplazado por SemanticZoom en 8.1. Se conserva como recreación.
- **JumpGrid**: representa el JumpList del LongListSelector, no un control independiente.
- **ProgressRing**:
  - **WP 8**: 5 puntos en línea (Metro).
  - **WP 10**: anillo orbital de 6 puntos discontinuos con fade (builds RTM ~2015).
  - **Win 11**: arco continuo "C" con `stroke-dasharray`.

---

## 🤝 Contribuir

1. **Fork** del repositorio.
2. Crea una rama: `git checkout -b feature/nuevo-control`
3. Añade el CSS, JS y HTML del control siguiendo la estructura existente.
4. Registra la clase en `WUI.classes` y en `wui-core.js`.
5. Añade la demo en `controls/` y enlázala en `index.html`.
6. Abre un **Pull Request**.

### Estructura de un nuevo control

```
css/wui-nuevo-control.css       ← usa var(--era-*) y var(--wui-*)
js/wui-nuevo-control.js         ← clase WuiNuevoControl registrada en WUI.classes
controls/nuevo-control.html     ← demo aislada con data-wui-os por defecto
```

---

## 📄 Licencia

**MIT**. Puedes usar, modificar y distribuir el SDK libremente, siempre que se mantenga la atribución.

---

## 🙏 Créditos

- Inspirado en la documentación oficial de **Microsoft Learn** sobre WinUI 3, UWP y Windows Phone.
- **Tipografías**: Segoe UI Variable y Material Symbols Outlined vía Google Fonts.
- **Iconografía**: Material Symbols de Google.

---

> *WindowsUI SDK — Replicando fielmente la evolución de la interfaz de Windows en la web.*
