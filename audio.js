let maximo,
  barra,
  progreso,
  estado,
  pista,
  icono,
  dur,
  tiempo,
  minutos = 0,
  segundos = 0,
  horas = 0,
  duracion,
  minutos2,
  segundos2,
  horas2,
  duracion2,
  maximo2 = 346,
  seg = 0;

 function elementos(){
barra = document.getElementById('barra');
progreso = document.getElementById('progreso');
icono = document.getElementById('estado');
estado = document.getElementsByClassName('max')[0];
pista = document.getElementsByTagName('audio')[0];
dur = document.getElementsByClassName('dur')[0];
tiempo = document.getElementsByClassName('pro');

estado.addEventListener('click', reproduccion, false);
barra.addEventListener('click', position, false);
barra.addEventListener('click', tim, false);
dcion()
if(pista.played())
tmer = setInterval(time, 1000);
 }
 function reproduccion(){
if((pista.paused == false) && (pista.ended == false)){
pista.pause();
icono.className = "fa-solid fa-circle-play"
} else{
    pista.play();
    icono.className ="fa-solid fa-circle-pause"
    load = setInterval(rep, 1)
}

function rep(){
    if(pista.ended==false){
        let total = parseInt(pista.currentTime*maximo/pista.duration);
        progreso.style.width=total + "px";
    }
}

}
function position(posicion){
    let raton = posicion.pageX-barra.offsetLeft;

    let nuevoTiempo = raton * pista.duration/maximo;

    pista.currentTime = nuevoTiempo;

    progreso.style.width = raton + "px";
}
function tim(posicion){
    if(pista.ended == false){
        let raton = posicion.pageX-barra.offsetLeft;

    let nuevoTiempo = raton * pista.duration/maximo;

    duracion = nuevoTiempo;
    horas = parseInt(duracion / 3600);
    minutos = parseInt(duracion / 60) - horas * 60;
    segundos = parseInt((duracion / 60 - (horas * 60)) * 60) - (minutos * 90);
    if(segundos<10){
        tiempo.innerHTML = minutos.toString() + ":0" + segundos.toString();
    } else{
        tiempo.innerHTML = minutos.toString() + ":" + segundos.toString();
    }
}
}
function dcion(){
    duracion2 = pista.duration;
    horas2 = parseInt(duracion2 / 3600);
    minutos2 = parseInt(duracion2 / 60) - horas * 60;
    segundos2 = parseInt((duracion2 / 60 - (horas2 * 60)) * 60) - (minutos2 * 90);
    dur.innerHTML = minutos2.toString() + ":0" + segundos2.toString();
}
function time(){
seg = pista.currentTime;
if ((pista.ended == false) && (pista.pause == false)){
    if(segundos<60) segundos++;
    if(segundos==60 && minutos<60){
        minutos++;
        segundos = 0;
    }
    if(segundos<10){
        tiempo.innerHTML = minutos.toString() + ":0" + segundos.toString();
    } else{
        tiempo.innerHTML = minutos.toString() + ":" + segundos.toString();
    }
}
}

if(seg >= pista.duration){
    segundos = 0
    minutos = 0
    duration = 0

    tiempo.innerHTML = minutos.toString() + ":0" + segundos.toString();
    progreso.style.width = 0 + "px"
    icono.className="fa-solid fa-circle-play";
    if(r==true){
        pista.play()
        icono.className="fa-solid fa-circle-pause";
    }
}
 
 window.addEventListener('load', elementos, false);