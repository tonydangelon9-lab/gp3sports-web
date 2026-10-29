/* GP3 CAV · pestaña "Temporada 2027" en la sección Calendario.
   Aditivo: no modifica CAL ni el calendario 2026; solo agrega dos pestañas y el calendario 2027 (provisorio). */
(function () {
  'use strict';
  var CAL27 = [
    { n: 1, f: '19 – 21 Marzo', l: 'Buenos Aires', p: 'Autódromo Oscar y Juan Gálvez · Buenos Aires, Argentina' },
    { n: 2, f: '14 – 16 Mayo', l: 'San Juan', p: 'Autódromo El Villicum · San Juan, Argentina' },
    { n: 3, f: '25 – 27 Junio', l: 'Termas de Río Hondo', p: 'Autódromo Termas de Río Hondo · Santiago del Estero, Argentina' },
    { n: 4, f: '20 – 22 Agosto', l: 'Buenos Aires', p: 'Autódromo Oscar y Juan Gálvez · Buenos Aires, Argentina' },
    { n: 5, f: '17 – 19 Septiembre', l: 'Termas de Río Hondo', p: 'Autódromo Termas de Río Hondo · Santiago del Estero, Argentina' },
    { n: 6, f: '22 – 24 Octubre', l: 'San Juan', p: 'Autódromo El Villicum · San Juan, Argentina' },
    { n: 7, f: '12 – 14 Noviembre', l: 'San Juan', p: 'Autódromo El Villicum · San Juan, Argentina' },
    { n: 8, f: '10 – 12 Diciembre', l: 'Buenos Aires', p: 'Autódromo Oscar y Juan Gálvez · Buenos Aires, Argentina', final: true }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function init() {
    var sec = document.getElementById('calendario');
    var grid = document.getElementById('calGrid');
    if (!sec || !grid || document.getElementById('calTabs')) return false;
    var head = sec.querySelector('.sechead');
    if (!head) return false;
    var k = head.querySelector('.k');
    var p = head.querySelector('p');
    if (!k || !p) return false;

    // calGrid (2026) no se toca: se oculta/muestra. Las tarjetas 2027 van en su propio contenedor.
    var k26 = k.innerHTML;
    var p26 = p.innerHTML;

    var st = document.createElement('style');
    st.textContent =
      '.calc .estado.prov{background:rgba(255,200,60,.16);color:#ffc83c}' +
      '.calc.final{border-left-color:#ffc83c}.calc.final .rnd{color:#ffc83c}' +
      '.cal[hidden]{display:none}';
    document.head.appendChild(st);

    var grid27 = document.createElement('div');
    grid27.className = 'cal';
    grid27.id = 'calGrid27';
    grid27.hidden = true;
    grid27.innerHTML = CAL27.map(function (c) {
      return '<div class="calc' + (c.final ? ' final' : '') + '">' +
        '<span class="estado prov">' + (c.final ? 'Gran Final · Provisorio' : 'Provisorio') + '</span>' +
        '<div class="rnd">Fecha ' + c.n + '</div>' +
        '<div class="fecha">' + esc(c.f) + '</div>' +
        '<div class="lugar">' + esc(c.l) + '</div>' +
        '<div class="pais">' + esc(c.p) + '</div></div>';
    }).join('');
    grid.insertAdjacentElement('afterend', grid27);

    var tabs = document.createElement('div');
    tabs.className = 'tabs';
    tabs.id = 'calTabs';
    tabs.innerHTML =
      '<button type="button" aria-pressed="true" class="tab active" data-s="2026">Temporada 2026</button>' +
      '<button type="button" aria-pressed="false" class="tab" data-s="2027">Temporada 2027</button>';
    head.insertAdjacentElement('afterend', tabs);

    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('.tab');
      if (!b || !tabs.contains(b)) return;
      var all = tabs.querySelectorAll('.tab');
      for (var i = 0; i < all.length; i++) {
        all[i].classList.remove('active');
        all[i].setAttribute('aria-pressed', 'false');
      }
      b.classList.add('active');
      b.setAttribute('aria-pressed', 'true');
      var es27 = b.getAttribute('data-s') === '2027';
      grid.hidden = es27;
      grid27.hidden = !es27;
      if (es27) {
        k.textContent = 'Temporada 2027';
        p.textContent = 'Ocho fechas del Campeonato Argentino de Velocidad 2027. Calendario provisorio.';
      } else {
        k.innerHTML = k26;
        p.innerHTML = p26;
      }
    });
    return true;
  }

  function start() {
    if (init()) return;
    var tries = 0;
    var t = setInterval(function () {
      tries++;
      if (init() || tries > 20) clearInterval(t);
    }, 250);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
