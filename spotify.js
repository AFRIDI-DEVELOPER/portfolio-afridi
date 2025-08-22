const songs = [{
        title: "Blinding Lights",
        artist: "The Weeknd",
        src: "audio/jaan song.mp3",
        cover: "gokku.png"
    },
    {
        title: "Levitating",
        artist: "Dua Lipa",
        src: "audio/levitating.mp3",
        cover: "goku.jpg"
    },
    {
        title: "Peaches",
        artist: "Justin Bieber",
        src: "audio/peaches.mp3",
        cover: "boy.jpg"
    }
];

let currentSong = 0;
const audio = new Audio();
let isPlaying = false;

window.onload = function() {
    renderPlaylist();
    loadSong(currentSong);
    setupEventListeners();
    setupSidebarToggle();
};

function renderPlaylist() {
    const playlist = document.querySelector('.playlist');
    if (!playlist) return;
    playlist.innerHTML = '';
    songs.forEach((song, idx) => {
        const li = document.createElement('li');
        li.dataset.index = idx;
        li.innerHTML = `
      <img src="${song.cover}" alt="${song.title}" />
      <div>
        <div class="song-title">${song.title}</div>
        <div class="artist">${song.artist}</div>
      </div>
    `;
        if (idx === currentSong) li.classList.add('active');
        li.onclick = () => playSongFromPlaylist(idx);
        playlist.appendChild(li);
    });
}

function playSongFromPlaylist(idx) {
    currentSong = idx;
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();
    highlightActiveSong();
}

function loadSong(index) {
    const song = songs[index];
    // Update player bar info
    document.querySelector('.player-info .album-art').src = song.cover;
    document.querySelector('.player-info .song-title').textContent = song.title;
    document.querySelector('.player-info .artist').textContent = song.artist;
    // For legacy: update first .song-title/.artist (if present)
    const mainTitle = document.querySelector('.song-title');
    const mainArtist = document.querySelector('.artist');
    if (mainTitle && mainArtist) {
        mainTitle.textContent = song.title;
        mainArtist.textContent = song.artist;
    }
    audio.src = song.src;
    audio.load();
    highlightActiveSong();
}

function setupEventListeners() {
    document.querySelector('.play').onclick = togglePlay;
    document.querySelector('.prev').onclick = playPrev;
    document.querySelector('.next').onclick = playNext;
    audio.ontimeupdate = updateProgress;
    audio.onended = playNext;
    document.querySelector('.progress-container').onclick = setProgress;
    document.addEventListener('keydown', handleKeyboard);
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
    } else {
        audio.pause();
        isPlaying = false;
    }
    updatePlayPauseIcon();
}

function updatePlayPauseIcon() {
    const playBtn = document.querySelector('.play');
    playBtn.innerHTML = audio.paused ? '▶️' : '⏸️';
}

function playPrev() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();
}

function playNext() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();
}

function updateProgress() {
    const progress = document.querySelector('.progress');
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
    document.querySelector('.current').textContent = formatTime(audio.currentTime);
    document.querySelector('.duration').textContent = formatTime(audio.duration);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

function highlightActiveSong() {
    document.querySelectorAll('.playlist li').forEach((li, idx) => {
        li.classList.toggle('active', idx === currentSong);
    });
}

function handleKeyboard(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowRight') {
        playNext();
    } else if (e.code === 'ArrowLeft') {
        playPrev();
    }
}



const texts = [
    "Hii I am SAHIDAFRIDI !",
    "I am a FULLSTACK DEVELOPER",
    "Thanks for visit !!!",
];

let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type() {
    if (count === texts.length) {
        count = 0;
    }

    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById('typewriter').textContent = letter;

    if (letter.length === currentText.length) {
        setTimeout(() => {
            index = 0;
            count++;
            setTimeout(type, 1000); // pause before next line
        }, 2000); // delay before starting new sentence
    } else {
        setTimeout(type, 100); // typing speed
    }
}

type();

// Scroll Animation for AFRIDI Name Section
function checkScroll() {
    const nameElement = document.querySelector('.name');
    const hiiElement = document.querySelector('.hii');

    if (nameElement && hiiElement) {
        const nameRect = nameElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the name element is in view (when 50% of it is visible)
        if (nameRect.top < windowHeight * 0.8 && nameRect.bottom > 0) {
            nameElement.classList.add('visible');
            hiiElement.classList.add('visible');
        }
    }
}

// Add scroll event listener
window.addEventListener('scroll', checkScroll);

// Sidebar Toggle Functionality
function setupSidebarToggle() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');

    if (hamburgerBtn && sidebar) {
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            sidebar.classList.toggle('hidden');
        });
    }
}

// Check on page load in case the element is already visible
window.addEventListener('load', checkScroll);