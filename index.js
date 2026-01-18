/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});
/* -----------------------------------------
   Background Music Playlist Controller
----------------------------------------- */
const music = document.getElementById("bg-music");
const playBtn = document.getElementById("music-toggle");
const nextBtn = document.getElementById("next-track");
const prevBtn = document.getElementById("prev-track");

const playlist = [
  "./audio/Autobots.mp3",
  "./audio/Beethoven.mp3",
  "./audio/CornfieldChase.mp3",
  "./audio/MiaSebastiansTheme.mp3",
  "./audio/TheBlueDanubeWaltz.mp3",
];

let currentTrack = 0;
music.volume = 0.075;
music.preload = "auto";

function playTrack(index) {
  music.src = playlist[index];
  music.play();
  playBtn.textContent = "⏸";
}

playBtn.addEventListener("click", () => {
  if (music.paused) {
    playTrack(currentTrack);
  } else {
    music.pause();
    playBtn.textContent = "▶";
  }
});

nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  playTrack(currentTrack);
});

prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  playTrack(currentTrack);
});

music.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  playTrack(currentTrack);
});

