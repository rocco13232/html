var reproductor = document.getElementById('reproductor');

  function reproducir() {
      reproductor.play();
  }
  const prevBtn = document.getElementById("prevBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.querySelector(".progress-bar");
const songTitle = document.getElementById("songTitle");

let isPlaying = false;
let progress = 0;

playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        playPauseBtn.textContent = "Play";
    } else {
        playPauseBtn.textContent = "Pause";
    }
    isPlaying = !isPlaying;
});

nextBtn.addEventListener("click", () => {
    // Cambiar a la siguiente canción
    updateSongInfo();
});

prevBtn.addEventListener("click", () => {
    // Cambiar a la canción anterior
    updateSongInfo();
});

function updateSongInfo() {
    // Actualizar el título de la canción
    songTitle.textContent = "Nueva canción";
}

// Simular el progreso de la canción
function updateProgressBar() {
    progress += 1;
    if (progress > 100) {
        progress = 0;
    }
    progressBar.style.width = `${progress}%`;
    requestAnimationFrame(updateProgressBar);
}

updateProgressBar();