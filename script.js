const player = document.querySelector('.player'); 
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-period');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const playControls = document.querySelector('.play-controls');
const speed = document.querySelector('.player-speed');
const quality = document.querySelector('.player-quality');


// Play & Pause ----------------------------------- //
function videoEnded() {
    showPlayIcon();
}

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play')
}

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'pause')
    } else {
        video.pause();
        showPlayIcon();
    }
}

// On Video End, show play button icon
video.addEventListener('ended', videoEnded);

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

// Update progress bar as the video plays
function updateProgress() {
    progressBar.style.width = `${video.currentTime / video.duration * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

// click to seek within vide
function serProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

function mute(e) {
    if (volumeIcon.classList.contains('fa-volume-xmark')) {
        let muteVolume = 1;
        volumeBar.style.width = `${muteVolume * 100}%`;
        video.volume = muteVolume;
        volumeIcon.className = '';
        volumeIcon.classList.add('fa-solid', 'fa-volume-high');
        let a = false;
    } else {
        let muteVolume = 0;
        volumeBar.style.width = `${muteVolume * 100}%`;
        video.volume = muteVolume;
        volumeIcon.className = '';
        volumeIcon.classList.add('fa-solid', 'fa-volume-xmark');
        let a = true;
    }
}

// Volume bar

function changeVolume(e) {

    let volume = e.offsetX / volumeRange.offsetWidth;
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume;
    // Change icon depend on icon
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-high');
    } else if (volume < 0.7 && volume > 0.4) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-up');
    } else if (volume < 0.4 && volume > 0.1) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-low');
    } else if (volume < 0.1) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-xmark');
    }
}


// Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = speed.value;
}

// Change quality

function changeQuality(){
    video.src = quality.value;
    console.log(video.src);
}

// Fullscreen ------------------------------- //
// View in fullscreen
function openFullScreen(e) {
    if (e.requestFullscreen) {
        e.requestFullscreen();
    } else if (e.mozRequestFullScreen){
        e.mozRequestFullScreen();
    }else if (e.webkitRequestFullScreen){
        e.webkitRequestFullScreen();
    }else if (e.msRequestFullScreen){
        e.msRequestFullScreen();
    }
    video.classList.add('video-fullscreen');
}

// Close fullscreen
 function closeFullScreen(){
    if(document.exitFullscreen){
        document.exitFullscreen();
    }else if (document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    }else if (document.webkitExitFullScreen){
        document.webkitExitFullScreen();
    }else if (document.msExitFullScreen){
        document.msExitFullScreen();
    }
    video.classList.remove('video-fullscreen');
 }

 let fullscreen = false;

//  toggle fullscreen
function toggleFullScreen(){
    !fullscreen ? openFullScreen(player) : closeFullScreen();
    fullscreen = !fullscreen;
}

// Event listener 
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', serProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', mute);
speed.addEventListener('change', changeSpeed);
quality.addEventListener('change',changeQuality);
fullscreenBtn.addEventListener('click',toggleFullScreen);

