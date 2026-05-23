// Builds a MECARD payload (a vCard-lite format recognised by iOS Camera
// and Google Lens — scans trigger a native "Add to Contacts" prompt).
// Spec: https://en.wikipedia.org/wiki/MeCard_(QR_code)
function buildMECARD(c) {
  const esc = (s) => String(s).replace(/([\\;,])/g, '\\$1');
  const parts = [
    `N:${esc(c.last)},${esc(c.first)}`,
    `ORG:Xentovia`,
  ];
  if (c.phone) parts.push(`TEL:${esc(c.phone)}`);
  parts.push(`EMAIL:${esc(c.email)}`);
  parts.push(`URL:${esc(c.website)}`);
  parts.push(`NOTE:${esc(c.title)}`);
  return 'MECARD:' + parts.join(';') + ';;';
}

// Renders the payload as an inline SVG inside `target` (a DOM element).
// SVG nodes are constructed via createElementNS — no innerHTML, no string
// interpolation into markup, so no XSS surface even if the payload changes.
function renderQR(payload, target) {
  if (typeof qrcode !== 'function') {
    target.textContent = 'QR library failed to load';
    return false;
  }
  const qr = qrcode(0, 'M'); // 0 = auto-size, M = error correction
  qr.addData(payload);
  qr.make();
  const count = qr.getModuleCount();
  const dark = '#0A1128';
  const NS = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('xmlns', NS);
  svg.setAttribute('viewBox', `0 0 ${count} ${count}`);
  svg.setAttribute('shape-rendering', 'crispEdges');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Contact QR code');

  for (let r = 0; r < count; r++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(r, col)) {
        const rect = document.createElementNS(NS, 'rect');
        rect.setAttribute('x', String(col));
        rect.setAttribute('y', String(r));
        rect.setAttribute('width', '1');
        rect.setAttribute('height', '1');
        rect.setAttribute('fill', dark);
        svg.appendChild(rect);
      }
    }
  }

  while (target.firstChild) target.removeChild(target.firstChild);
  target.appendChild(svg);
  return true;
}

window.buildMECARD = buildMECARD;
window.renderQR = renderQR;
