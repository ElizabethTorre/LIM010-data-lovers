const usuario = document.getElementById('user');
const password = document.getElementById('pass');
const ingresar = document.getElementById('ingresar');
const screenLogin = document.getElementById('screen-login');
const screenHome = document.getElementById('screen-home');
const screenPokemon = document.getElementById('screen-pokemon');
const screenEclosionEgg = document.getElementById('screen-eclosion-egg');
const errorPass = document.getElementById('error-pass');
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const pokFiltrados = document.getElementById('pok-filtrados');
const searchByName = document.getElementById('search-by-name');
let data = '';
let eggs = '';
fetch('https://raw.githubusercontent.com/Laboratoria/LIM010-data-lovers/master/src/data/pokemon/pokemon.json')
  .then((promise) => {
    return promise.json();
  }).then((dataFetch) => {
    data = dataFetch.pokemon;
    eggs = searchEggs(data);
    document.getElementById('filter').innerHTML = optionSelect(arrSelect(data.map(pok => pok.type)));
    document.getElementById('weakness').innerHTML = optionSelect(arrSelect(data.map(pok => pok.weaknesses)));
  }).catch((error) => {
    console.log(error);
  });

let cont = 1;
screenLogin.addEventListener('submit', (enter) => {
  enter.preventDefault();
  const user = usuario.value;
  const pass = password.value;
  if (pass === 'LABORATORIA' && user === 'LABORATORIA') {
    header.classList.remove('hide');
    footer.classList.remove('hide');
    screenHome.classList.remove('hide');
    screenLogin.classList.add('hide');
    home.classList.add('active');
    const count = divideAtrapped(data);
    document.getElementById('count-trapped').innerHTML = 'Atrapados: ' + count.atrapado;
    document.getElementById('count-no-trapped').innerHTML = 'No atrapados: ' + count.noAtrapado;
    showImg(data);
  } else if (cont > 2) {
    errorPass.innerHTML = ' Ha intentado demasiadas veces.';
    usuario.value = '';
    password.value = '';
    ingresar.disabled = true;
    usuario.disabled = true;
    password.disabled = true;
  } else {
    errorPass.innerHTML = ' ERROR! Introduzca una clave válida.';
    usuario.value = '';
    password.value = '';
    usuario.focus();
    password.focus();
    cont++;
  }
});

const home = document.getElementById('home');
home.addEventListener('click', () => {
  screenHome.classList.remove('hide');
  screenPokemon.classList.add('hide');
  screenEclosionEgg.classList.add('hide');
  home.classList.add('active');
  seePokemons.classList.remove('active');
  document.getElementById('filter').classList.add('hide');
  eggsKm.classList.remove('active');
  searchByName.classList.add('hide');
});

const optionSelect = (array) => {
  let options = '<option value=0>Todos</option>';
  for (let i = 0; i < array.length; i++) {
    options += `<option value='${array[i]}'>${array[i]}</option>`;
  }
  return options;
};

filter.addEventListener('change', () => {
  document.getElementById('form').classList.remove('hide');
  document.getElementById('container-trap').classList.remove('hide');
  document.getElementById('search').value = '';
  const x = document.getElementById('filter').value;
  const debil = document.getElementById('weakness').value;
  const order = document.getElementById('order').value;
  if (searchWeakness(searchType(data, x), debil).length === 0) {
    pokFiltrados.innerHTML = '<img src="https://vignette.wikia.nocookie.net/pokpiruleta/images/e/e0/Squirtle_XY.gif/revision/latest?cb=20140624162904&path-prefix=es"><p class="white">No se encontraron resultados.</p>';
    document.getElementById('container-trap').classList.add('hide');
  } else {
    const count = divideAtrapped(searchWeakness(searchType(data, x), debil));
    document.getElementById('count-trapped').innerHTML = 'Atrapados: ' + count.atrapado;
    document.getElementById('count-no-trapped').innerHTML = 'No atrapados: ' + count.noAtrapado;
    showImg(orderData(searchWeakness(searchType(data, x), debil), order));
  }
});

weakness.addEventListener('change', () => {
  document.getElementById('form').classList.remove('hide');
  document.getElementById('container-trap').classList.remove('hide');
  document.getElementById('search').value = '';
  const x = document.getElementById('filter').value;
  const debil = document.getElementById('weakness').value;
  const order = document.getElementById('order').value;
  if (searchWeakness(searchType(data, x), debil).length === 0) {
    pokFiltrados.innerHTML = '<img src="https://vignette.wikia.nocookie.net/pokpiruleta/images/e/e0/Squirtle_XY.gif/revision/latest?cb=20140624162904&path-prefix=es"><p class="white">No se encontraron resultados.</p>';
    document.getElementById('container-trap').classList.add('hide');
  } else {
    const count = divideAtrapped(searchWeakness(searchType(data, x), debil));
    document.getElementById('count-trapped').innerHTML = 'Atrapados: ' + count.atrapado;
    document.getElementById('count-no-trapped').innerHTML = 'No atrapados: ' + count.noAtrapado;
    showImg(orderData(searchWeakness(searchType(data, x), debil), order));
  }
});

order.addEventListener('change', () => {
  document.getElementById('form').classList.remove('hide');
  document.getElementById('container-trap').classList.remove('hide');
  document.getElementById('search').value = '';
  const x = document.getElementById('filter').value;
  const debil = document.getElementById('weakness').value;
  const order = document.getElementById('order').value;
  const count = divideAtrapped(searchWeakness(searchType(data, x), debil), order);
  document.getElementById('count-trapped').innerHTML = 'Atrapados: ' + count.atrapado;
  document.getElementById('count-no-trapped').innerHTML = 'No atrapados: ' + count.noAtrapado;
  showImg(orderData(searchWeakness(searchType(data, x), debil), order));
});

const seePokemons = document.getElementById('see-pokemons');
seePokemons.addEventListener('click', () => {
  document.getElementById('form').classList.remove('hide');
  document.getElementById('container-trap').classList.remove('hide');
  screenHome.classList.add('hide');
  screenPokemon.classList.remove('hide');
  screenEclosionEgg.classList.add('hide');
  searchByName.classList.remove('hide');
  document.getElementById('filter').classList.remove('hide');
  home.classList.remove('active');
  seePokemons.classList.add('active');
  eggsKm.classList.remove('active');
  document.getElementById('search').value = '';
});

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  pokFiltrados.innerHTML = '';
  const inputName = data.filter(pok => pok.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0);
  if (event.target.value.length > 0) {
    document.getElementById('form').classList.add('hide');
    document.getElementById('container-trap').classList.add('hide');
    if (inputName.length !== 0) {
      showImg(inputName);
    } else {
      pokFiltrados.innerHTML = '<img src="https://vignette.wikia.nocookie.net/pokpiruleta/images/e/e0/Squirtle_XY.gif/revision/latest?cb=20140624162904&path-prefix=es"><p class="white">No se encontraron resultados.</p>';
    }
  } else {
    document.getElementById('form').classList.remove('hide');
    document.getElementById('container-trap').classList.remove('hide');
    document.getElementById('order').selectedIndex = 0;
    document.getElementById('filter').selectedIndex = 0;
    document.getElementById('weakness').selectedIndex = 0;
    const count = divideAtrapped(data);
    document.getElementById('count-trapped').innerHTML = 'Atrapados: ' + count.atrapado;
    document.getElementById('count-no-trapped').innerHTML = 'No atrapados: ' + count.noAtrapado;
    showImg(data);
  }
});

const showImg = (array) => {
  let list = '';
  for (let i = 0; i < array.length; i++) {
    if (array[i].multipliers === null) {
      let card = `
      <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front-no">
              <p class="num">` + 'N.º ' + array[i].num + `</p>
              <p class="data-value white"><span class="data-type">Estado:</span>` + 'NO ATRAPADO' + `</p>
              <p class="data-value white"><span class="data-type">Frec. aparición:</span>` + array[i].spawn_chance + '%' + `</p>
              <img class="img-pok" src="` + array[i].img + `"/>
              <p class="nom orange">` + array[i].name + `</p>
              <p class="data-value white"><span class="data-type">Tipo:</span>` + array[i].type.join(' - ') + `</p>
          </div>
          <div class="flip-card-back">
            <p class="nom black">` + array[i].name + `</p>          
            <p class="data-value"><span class="data-type">Estatura:</span>` + array[i].height + `</p>
            <p class="data-value"><span class="data-type">Peso:</span>` + array[i].weight + `</p>
            <p class="data-value"><span class="data-type">Huevos:</span>` + array[i].egg + `</p>
            <p class="data-value"><span class="data-type">Tiempo de aparición:</span>` + array[i].spawn_time + `</p>
            <p class="data-value"><span class="data-type">Debilidades:</span>` + array[i].weaknesses.join(' - ') + '</p>';

      if (array[i].hasOwnProperty('prev_evolution')) {
        card += '<p class="data-value"><span class="data-type">Pre-evoluciones:</span>' + array[i].prev_evolution.map(evo => evo.name).join(' - ') + '</p>';
      } else {
        card += '<p class="data-value"><span class="data-type">Pre-evoluciones:</span>' + 'No tiene pre evoluciones' + '</p>';
      }

      if (array[i].hasOwnProperty('next_evolution')) {
        card += '<p class="data-value"><span class="data-type">Evoluciones:</span>' + array[i].next_evolution.map(evo => evo.name).join(' - ') + '</p>';
      } else {
        card += '<p class="data-value"><span class="data-type">Evoluciones:</span>' + 'No tiene evoluciones' + '</p>';
      }
      card += ` </div>
        </div>
        </div>
            `;
      list += card;
    } else {
      let card = `
      <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
              <p class="num">` + 'N.º ' + array[i].num + `</p>
              <p class="data-value blue"><span class="data-type">Estado:</span>` + 'ATRAPADO' + `</p>
              <p class="data-value blue"><span class="data-type">Frec. aparición:</span>` + array[i].spawn_chance + '%' + `</p>
              <img class="img-pok" src="` + array[i].img + `"/>
              <p class="nom orange">` + array[i].name + `</p>
              <p class="data-value blue"><span class="data-type">Tipo:</span>` + array[i].type.join(' - ') + `</p>
          </div>
          <div class="flip-card-back">
              <p class="nom black">` + array[i].name + `</p>   
              <p class="data-value"><span class="data-type">CP:</span>` + array[i].multipliers.join(' - ') + `</p>       
              <p class="data-value"><span class="data-type">Estatura:</span>` + array[i].height + `</p>
              <p class="data-value"><span class="data-type">Peso:</span>` + array[i].weight + `</p>
              <p class="data-value"><span class="data-type">Cant. caramelos:</span>` + array[i].candy_count + `</p>
              <p class="data-value"><span class="data-type">Huevos:</span>` + array[i].egg + `</p>
              <p class="data-value"><span class="data-type">Tiempo de aparición:</span>` + array[i].spawn_time + `</p>
              <p class="data-value"><span class="data-type">Debilidades:</span>` + array[i].weaknesses.join(' - ') + '</p>';

      if (array[i].hasOwnProperty('prev_evolution')) {
        card += '<p class="data-value"><span class="data-type">Pre-evoluciones:</span>' + array[i].prev_evolution.map(evo => evo.name).join(' - ') + '</p>';
      } else {
        card += '<p class="data-value"><span class="data-type">Pre-evoluciones:</span>' + 'No tiene pre evoluciones' + '</p>';
      }

      if (array[i].hasOwnProperty('next_evolution')) {
        card += '<p class="data-value"><span class="data-type">Evoluciones:</span>' + array[i].next_evolution.map(evo => evo.name).join(' - ') + '</p>';
      } else {
        card += '<p class="data-value"><span class="data-type">Evoluciones:</span>' + 'No tiene evoluciones' + '</p>';
      }
      card += ` </div>
        </div>
        </div>
            `;
      list += card;
    }
  }
  return document.getElementById('pok-filtrados').innerHTML = list;
};

google.load('visualization', '1.0', { 'packages': ['corechart'] });
google.load('visualization', '1.0', { 'packages': ['table'] });
const eggsKm = document.getElementById('eggs-km');
eggsKm.addEventListener('click', () => {
  google.setOnLoadCallback(eggsKm);
  screenHome.classList.add('hide');
  screenPokemon.classList.add('hide');
  screenEclosionEgg.classList.remove('hide');
  searchByName.classList.add('hide');
  document.getElementById('filter').classList.add('hide');
  home.classList.remove('active');
  seePokemons.classList.remove('active');
  eggsKm.classList.add('active');
  graphicPie();
});

const egg2 = document.getElementById('2km');
egg2.addEventListener('click', () => {
  document.getElementById('2km').classList.add('kmActive');
  document.getElementById('5km').classList.remove('kmActive');
  document.getElementById('10km').classList.remove('kmActive');
  graphicPie();
  buildGraphic(0);
});

const egg5 = document.getElementById('5km');
egg5.addEventListener('click', () => {
  document.getElementById('2km').classList.remove('kmActive');
  document.getElementById('5km').classList.add('kmActive');
  document.getElementById('10km').classList.remove('kmActive');
  graphicPie();
  buildGraphic(1);
});

const egg10 = document.getElementById('10km');
egg10.addEventListener('click', () => {
  document.getElementById('2km').classList.remove('kmActive');
  document.getElementById('5km').classList.remove('kmActive');
  document.getElementById('10km').classList.add('kmActive');
  graphicPie();
  buildGraphic(2);
});

const buildGraphic = (index) => {
  const dataDraw = new google.visualization.DataTable();
  dataDraw.addColumn('string', 'Nombre');
  dataDraw.addColumn('string', 'Pokemon');
  dataDraw.addColumn('number', '% de aparición');

  let tabla = [];
  tabla = pushTable(eggs, index);

  dataDraw.addRows(tabla);

  const opciones = {
    'allowHtml': true,
    'showRowNumber': true,
    'width': '95%',
    'height': 410
  };
  const grafica = new google.visualization.Table(document.getElementById('table'));
  grafica.draw(dataDraw, opciones);
};

const graphicPie = () => {
  const dataDr = new google.visualization.DataTable();
  dataDr.addColumn('string', 'km');
  dataDr.addColumn('number', 'count');
  dataDr.addRows(
    [
      ['Huevos de 2km', eggs[0].length],
      ['Huevos de 5km', eggs[1].length],
      ['Huevos de 10km', eggs[2].length],
      ['No tiene huevos', eggs[3].length + 1]

    ]
  );

  const opc = {
    'title': 'Porcentaje de huevos a eclosionar por tipo de km',
    'width': 450,
    'height': 220,
  };
  const graphic = new google.visualization.PieChart(document.getElementById('charts'));
  graphic.draw(dataDr, opc);
  const eggs3 = eggs[3].length + 1;
  document.getElementById('count-egg').innerHTML = 'Huevos de 2km: ' + eggs[0].length + '<br>' + 'Huevos de 5km: ' + eggs[1].length + '<br>' +
    ' Huevos de 10km: ' + eggs[2].length + '<br>' + ' No tienen huevos: ' + eggs3;
};

const up = document.querySelector('#up');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    up.classList.remove('hide');
  } else {
    up.classList.add('hide');
  }
});

up.addEventListener('click', () => {
  window.scrollTo(0, 0);
});