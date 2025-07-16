let rockSFXEl;
let bgMusicEl;

function init()
{
    rockSFXEl = document.querySelector("#rockSFXEl");
    rockSFXEl.load();
    rockSFXEl.currentTime = 0;

    bgMusicEl = document.querySelector("#bgMusic");
    bgMusicEl.load();
    bgMusicEl.currentTime = 0;
    bgMusicEl.play();
}

function rockSound()
{
    rockSFXEl.pause();
    rockSFXEl.currentTime = 0;

    rockSFXEl.play();
    bgMusicEl.play();
}

document.addEventListener('DOMContentLoaded', init);