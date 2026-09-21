const events = [
  {name:'Imagine Dragons', date:'20 Sep 2026', city:'Ciudad de México', venue:'Foro Sol', category:'Concierto', image:'assets/imagine.svg'},
  {name:'The Weeknd', date:'03 Oct 2026', city:'Monterrey', venue:'Estadio BBVA', category:'Concierto', image:'assets/weeknd.svg'},
  {name:'Olivia Rodrigo', date:'12 Nov 2026', city:'Guadalajara', venue:'Auditorio Telmex', category:'Concierto', image:'assets/olivia.svg'}
];

function goToEvents(value){
  const q = encodeURIComponent((value || '').trim());
  window.location.href = q ? `eventos.html?q=${q}` : 'eventos.html';
}

function setupHomeSearch(){
  const form = document.querySelector('#homeSearchForm');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    goToEvents(document.querySelector('#homeSearch').value);
  });
}

function renderEvents(){
  const list = document.querySelector('#eventList');
  if(!list) return;
  const input = document.querySelector('#eventSearch');
  const city = document.querySelector('#cityFilter');
  const category = document.querySelector('#categoryFilter');
  const params = new URLSearchParams(location.search);
  if(params.get('q')) input.value = params.get('q');

  function draw(){
    const q = input.value.trim().toLowerCase();
    const cityValue = city.value;
    const categoryValue = category.value;
    const filtered = events.filter(ev => {
      const matchText = !q || `${ev.name} ${ev.city} ${ev.venue}`.toLowerCase().includes(q);
      const matchCity = !cityValue || ev.city === cityValue;
      const matchCat = !categoryValue || ev.category === categoryValue;
      return matchText && matchCity && matchCat;
    });
    document.querySelector('#resultCount').textContent = `${filtered.length} evento${filtered.length===1?'':'s'} encontrado${filtered.length===1?'':'s'}`;
    list.innerHTML = filtered.map(ev => `
      <article class="result-card mb-3">
        <img src="${ev.image}" alt="${ev.name}">
        <div class="content">
          <h3>${ev.name}</h3>
          <div class="event-meta">📅 ${ev.date}<br>📍 ${ev.city}<br>🎵 ${ev.venue}</div>
        </div>
        <div class="align-self-center"><a class="btn btn-stage px-4" href="detalle.html">Ver detalles</a></div>
      </article>`).join('') || '<div class="alert alert-light border">No encontramos eventos con esos filtros.</div>';
  }
  document.querySelector('#filterForm').addEventListener('submit', e=>{e.preventDefault();draw();});
  city.addEventListener('change', draw); category.addEventListener('change', draw);
  draw();
}

document.addEventListener('DOMContentLoaded', ()=>{setupHomeSearch();renderEvents();});
