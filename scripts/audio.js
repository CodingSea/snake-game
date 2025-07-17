let rockSFXEl;
let bgMusicEl;

function init()
{
    rockSFXEl = document.querySelector("#rockSFXEl");
    rockSFXEl.load();
    rockSFXEl.currentTime = 0;
}

function rockSound()
{
    rockSFXEl.pause();
    rockSFXEl.currentTime = 0;

    rockSFXEl.play();
}

document.addEventListener('DOMContentLoaded', init);