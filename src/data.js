// agregamos las funciones a nuestro objeto global window
const arrSelect = (list) => {
  const array = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      array.push(list[i][j]);
    }
  }
  const newArray = array.filter((item, index, arr) => {
    return arr.indexOf(item) === index;
  });
  return newArray;
};

const searchType = (data, tipo) => {
  if (tipo === '0') {
    return data;
  } else {
    return data.filter(datum => datum.type[0] === tipo || datum.type[1] === tipo);
  }
};

const divideAtrapped = (array) => {
  let atrapado = 0;
  let noAtrapado = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].multipliers === null) {
      noAtrapado++;
    } else {
      atrapado++;
    }
  }
  return {
    atrapado: atrapado,
    noAtrapado: noAtrapado
  };
};

const searchWeakness = (data, weakness) => {
  if (weakness === '0') {
    return data;
  } else {
    return data.filter(obj => obj.weaknesses.indexOf(weakness) > -1);
  }
};

const searchEggs = (data) => {
  let count2 = data.filter(pok => (pok.egg === '2 km'));
  let count5 = data.filter(pok => (pok.egg === '5 km'));
  let count10 = data.filter(pok => (pok.egg === '10 km'));
  let ncount = data.filter(pok => (pok.egg === 'Not in Eggs'));

  return [
    count2,
    count5,
    count10,
    ncount,
  ];
};

const orderData = (array, condicion) => {
  let ordered = [];
  if (condicion === 'order-a-z') {
    ordered = array.sort((first, second) => (first.name > second.name ? 1 : -1));
  } else if (condicion === 'order-z-a') {
    ordered = array.sort((first, second) => (first.name < second.name ? 1 : -1));
  } else if (condicion === 'order-asc') {
    ordered = array.sort((first, second) => (first.spawn_chance > second.spawn_chance ? 1 : -1));
  } else if (condicion === 'order-des') {
    ordered = array.sort((first, second) => (first.spawn_chance < second.spawn_chance ? 1 : -1));
  } else {
    ordered = array.sort((first, second) => (first.num > second.num ? 1 : -1));
  }
  return ordered;
};

const pushTable = (array, index) => {
  const tabla = [];
  for (let i = 0; i < array[index].length; i++) {
    tabla.push([array[index][i].name, '<img class="width" src="' + array[index][i].img + '">', (array[index][i].spawn_chance)]);
  }
  return tabla;
};

window.searchType = searchType;
window.divideAtrapped = divideAtrapped;
window.searchWeakness = searchWeakness;
window.searchWeakness = searchWeakness;
window.searchEggs = searchEggs;
window.orderData = orderData;
window.pushTable = pushTable;
window.arrSelect = arrSelect;