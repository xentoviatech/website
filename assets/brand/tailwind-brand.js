/*
 * Xentovia brand palette for the Tailwind Play CDN — the utility-class half of
 * /assets/brand/brand.css (keep the two in step; BRAND.md in xv-platform is the source).
 *
 * Load it after the page's own `tailwind.config = {…}` script. It merges the brand
 * palette over the page config, so every existing utility resolves to a brand colour:
 *   indigo / violet / purple / fuchsia  -> purple–lilac scale (300 = lilac #C9A6D6, 600 = purple #6B2178)
 *   blue / sky / cyan / teal            -> navy scale (700 = navy #13296B, 300 = light navy tint)
 *   space / accent / glow (site tokens) -> navy / purple / lilac
 *   slate-500, gray-500                 -> lifted so small text passes WCAG AA on navy
 */
(function () {
  var purple = {
    50: '#F7F1F9', 100: '#EEE2F2', 200: '#E3D2EA', 300: '#C9A6D6', 400: '#B48AC6',
    500: '#8E4A9C', 600: '#6B2178', 700: '#571A62', 800: '#43144C', 900: '#300E37', 950: '#1F0924'
  };
  var navy = {
    50: '#F5F6FA', 100: '#E6EAF4', 200: '#CBD4EA', 300: '#A7B5DA', 400: '#8FA0CF',
    500: '#5A70AE', 600: '#34498A', 700: '#13296B', 800: '#0E2059', 900: '#0B1A4D', 950: '#07102C'
  };
  var slate500 = '#9AA5C4';

  var brand = {
    navy: navy,
    brand: purple,
    lilac: { DEFAULT: '#C9A6D6', soft: '#E3D2EA' },
    indigo: purple, violet: purple, purple: purple, fuchsia: purple,
    blue: navy, sky: navy, cyan: navy, teal: navy,
    space: { 950: '#13296B', 900: '#13296B', 800: '#0E2059', 700: '#0E2059' },
    accent: { 400: '#C9A6D6', 500: '#6B2178', 600: '#571A62' },
    glow: { purple: '#B48AC6', blue: '#C9A6D6', cyan: '#C9A6D6' },  // text accents on navy: keep AA
    slate: { 500: slate500 },
    gray: { 500: slate500 }
  };

  function merge(target, src) {
    for (var k in src) {
      var v = src[k];
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        target[k] = merge(target[k] && typeof target[k] === 'object' ? target[k] : {}, v);
      } else {
        target[k] = v;
      }
    }
    return target;
  }

  var tw = window.tailwind = window.tailwind || {};
  var cfg = tw.config || {};
  cfg.theme = cfg.theme || {};
  cfg.theme.extend = cfg.theme.extend || {};
  cfg.theme.extend.colors = merge(cfg.theme.extend.colors || {}, brand);
  cfg.theme.extend.fontFamily = merge(cfg.theme.extend.fontFamily || {}, {
    heading: ['Liberation Serif', 'Times New Roman', 'Times', 'serif']
  });
  tw.config = cfg;
})();
