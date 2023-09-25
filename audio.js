let maximo,
  barra,
  progreso,
  estado,
  pista,
  icono,
  dur,
  tiempo,
  maximo2 = 346;

pista = document.getElementById('audio');

// Almacena la última posición de reproducción
let ultimaPosicion = 0;

pista.addEventListener('loadeddata', function () {
  // La canción se ha cargado, ahora puedes intentar reproducirla.
  elementos();
});

function elementos() {
  barra = document.getElementById('barra');
  progreso = document.getElementById('progreso');
  icono = document.getElementById('estado');
  estado = document.getElementsByClassName('max')[0];
  dur = document.getElementsByClassName('dur')[0];
  tiempo = document.getElementsByClassName('pro')[0];
  maximo = barra.offsetWidth;

  pista.addEventListener('loadedmetadata', function () {
    // Llamar a la función dcion() aquí, después de que el audio se haya cargado
    dcion();
  });

  estado.addEventListener('click', reproduccion, false);
  barra.addEventListener('click', position, false);
  tmer = setInterval(time, 1000); // Iniciar el intervalo y almacenarlo en tmer
  updatePlayButton();
}

function reproduccion() {
  if (pista.paused || pista.ended) {
    // Reanuda desde la última posición almacenada
    pista.currentTime = ultimaPosicion;
    pista.play();
    icono.className = 'fa-solid fa-circle-pause';
  } else {
    // Almacena la posición actual antes de pausar
    ultimaPosicion = pista.currentTime;
    pista.pause();
    icono.className = 'fa-solid fa-circle-play';
  }
}

function position(posicion) {
  if (!pista.paused && !pista.ended) {
    let raton = posicion.pageX - barra.offsetLeft;
    let nuevoTiempo = (raton * pista.duration) / maximo;
    pista.currentTime = nuevoTiempo;
  }
}

function dcion() {
  let duracion = pista.duration;
  let minutos = Math.floor(duracion / 60);
  let segundos = Math.floor(duracion % 60);
  dur.innerHTML = minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
}

function time() {
  if (!pista.ended) {
    let minutosTranscurridos = Math.floor(pista.currentTime / 60);
    let segundosTranscurridos = Math.floor(pista.currentTime % 60);
    tiempo.innerHTML =
      minutosTranscurridos + ':' + (segundosTranscurridos < 10 ? '0' : '') + segundosTranscurridos;

    let duracion = pista.duration;
    let minutosRestantes = Math.floor((duracion - pista.currentTime) / 60);
    let segundosRestantes = Math.floor((duracion - pista.currentTime) % 60);
    dur.innerHTML = minutosRestantes + ':' + (segundosRestantes < 10 ? '0' : '') + segundosRestantes;

    // Actualizar la barra de progreso
    let progresoPorcentaje = (pista.currentTime / duracion) * 100;
    progreso.style.width = progresoPorcentaje + '%';
  } else if (pista.ended) {
    // Cuando la canción termine, muestra la duración total de la canción en la derecha
    let duracion = pista.duration;
    let minutos = Math.floor(duracion / 60);
    let segundos = Math.floor(duracion % 60);
    dur.innerHTML = minutos + ':' + (segundos < 10 ? '0' : '') + segundos;

    // Restablece los minutos y segundos en la izquierda a 0:00
    tiempo.innerHTML = '0:00';

    // Restablece la barra de progreso
    progreso.style.width = '0px';
  }
}

window.addEventListener('load', elementos, false);

function updatePlayButton() {
  if (!pista.paused && !pista.ended) {
    icono.className = 'fa-solid fa-circle-pause';
  } else {
    icono.className = 'fa-solid fa-circle-play';
  }
}

pista.addEventListener('play', updatePlayButton);
pista.addEventListener('pause', updatePlayButton);
pista.addEventListener('loadedmetadata', function () {
  // Llamar a la función updatePlayButton() aquí, después de que el audio se haya cargado
  updatePlayButton();
});

// Botones anterior y siguiente
const botonAnterior = document.getElementById('anterior');
const botonSiguiente = document.getElementById('siguiente');

botonAnterior.addEventListener('click', function (e) {
  e.preventDefault();
  cambiarCancion('anterior');
});

botonSiguiente.addEventListener('click', function (e) {
  e.preventDefault();
  cambiarCancion('siguiente');
});

// Lista de canciones
const canciones = [
  {
    titulo: 'Time',
    artista: 'Pink Floyd',
    archivo: './media/Pink Floyd  Time (Official Audio).mp3',
    portada: './imagenes/The_Dark_Side_of_the_Moon_Cover.png'
  },
  {
    titulo: 'Shine',
    artista: 'NoCopyrightSounds',
    archivo: './media/onlymp3.to - Spektrem Shine NCS Release -n4tK7LYFxI0-192k-1695347898.mp3',
    portada: './imagenes/ncs_portada.jpg'
  },
  {
    titulo: 'Why We Lose',
    artista: 'Cartoon, NoCopyrightSounds',
    archivo: './media/onlymp3.to - Cartoon Why We Lose feat. Coleman Trapp NCS Release -zyXmsVwZqX4-192k-1695386640.mp3',
    portada: './imagenes/why-we-lose-feat-coleman-trapp-1586946931-cMa5r9VQ4S.jpg'
  }
  
  
  // Agrega más canciones aquí
];

// Índice de la canción actual
let cancionActual = 0;

// Función para cargar y reproducir una canción por su índice
function cargarCancion(index) {
  if (index >= 0 && index < canciones.length) {
    // Pausa la canción actual si se está reproduciendo
    if (!pista.paused) {
      pista.pause();
    }

    // Carga la nueva canción
    pista.src = canciones[index].archivo;
    pista.load();

    // Inicializa la canción desde el principio
    pista.currentTime = 0;

    // Actualiza la información de la canción
    document.getElementById('nombre').innerText = canciones[index].titulo;
    document.getElementById('artista').innerText = canciones[index].artista;
    document.getElementById('portada-img').src = canciones[index].portada;

    // Inicia la reproducción si estaba reproduciendo antes
    if (icono.className === 'fa-solid fa-circle-pause') {
      pista.play();
    }

    // Actualiza el índice de la canción actual
    cancionActual = index;
  }
}

// Inicialmente, carga la primera canción
cargarCancion(cancionActual);

// Función para cambiar de canción (anterior o siguiente)
function cambiarCancion(direccion) {
  if (direccion === 'anterior') {
    cancionActual = (cancionActual - 1 + canciones.length) % canciones.length;
  } else if (direccion === 'siguiente') {
    cancionActual = (cancionActual + 1) % canciones.length;
  }
  cargarCancion(cancionActual);
}
