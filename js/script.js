var fireAudio = new Audio('audio/missile-launch.wav');
var targetStatus = document.querySelector(".target-status");

// Jet Fighter Minigame
function fire() {
    if (fireAudio.paused) {
        fireAudio.volume = 0.2;
        fireAudio.currentTime = 0;
        fireAudio.play();

        if (Math.floor(Math.random() * (3 - 1 + 1) + 1) == 1) {
            setTimeout(explosion, 1260);
            setTimeout(destroy, 1600);
            setTimeout(resetHUD, 3000);
        }else{
            setTimeout(miss, 1260);
            setTimeout(resetHUD, 3000);
        }

    } else {
        var denyAudio = new Audio('audio/deny-launch.wav');
        denyAudio.volume = 0.5;
        denyAudio.currentTime = 0;
        denyAudio.play();
    }
}

function explosion() {
    targetStatus.classList.add("blink");
    targetStatus.classList.add("destroyed");
    targetStatus.textContent = 'Target Down --✴';
    var destroyAudio = new Audio('audio/explosion.wav');
    fireAudio.volume = 0.09;
    destroyAudio.volume = 0.18;
    destroyAudio.currentTime = 0;
    destroyAudio.play();
}

function destroy() {
    var destroyAudio = new Audio('audio/neutralised.mp3');
    destroyAudio.volume = 0.3;
    destroyAudio.currentTime = 0;
    destroyAudio.play();
}

function miss(){
    targetStatus.classList.add("blink");
    targetStatus.classList.add("missed");
    targetStatus.textContent = 'Target Missed --🛦';
}

function resetHUD(){
    targetStatus.classList.remove("blink");
    targetStatus.classList.remove("destroyed");
    targetStatus.classList.remove("missed");
    targetStatus.textContent = 'Engage Target --🛦';
}

// Credits modal
function credits(){

}