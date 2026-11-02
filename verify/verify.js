// Renders /verify/XT-NNNN/ from /verify/register.json. Fetched with no-store so a revocation
// shows immediately (no service worker on these pages, on purpose).
(function () {
  var m = location.pathname.match(/\/verify\/(XT-\d{4})\/?$/i);
  var id = m ? m[1].toUpperCase() : null;
  var el = function (s) { return document.getElementById(s); };
  function show(state, title, detail) {
    document.body.dataset.state = state;
    el('status').textContent = title;
    el('detail').innerHTML = detail;
  }
  if (!id) { show('bad', 'Not a valid ID', 'Check the ID number printed on the card.'); return; }
  el('id').textContent = id;
  fetch('/verify/register.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (reg) {
      var p = reg[id];
      if (!p) { show('bad', 'Not a Xentovia ID', 'No card with this number has been issued. Do not deal with the bearer on our behalf.'); return; }
      el('name').textContent = p.name;
      if (p.photo) { var i = el('photo'); i.src = p.photo; i.alt = p.name; i.hidden = false; }
      if (p.status === 'active') {
        show('ok', 'Active ' + p.relation.toLowerCase(),
          p.relation + ' of Xentovia Tech Private Limited. The photo above must match the person and the card.<br>' +
          'Pay only against a company invoice, by bank transfer to Xentovia Tech Private Limited. Staff never collect cash.');
      } else {
        show('bad', 'Card no longer valid',
          'This person is not currently ' + (/^[aeiou]/i.test(p.relation) ? 'an ' : 'a ') + p.relation.toLowerCase() + ' of Xentovia. Do not deal with the bearer on our behalf.');
      }
    })
    .catch(function () { show('wait', 'Could not check right now', 'Please retry, or email hello@xentovia.ai with the ID number.'); });
})();
