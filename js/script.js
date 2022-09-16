var fireAudio = new Audio('audio/missile-launch.wav');
var targetStatus = document.querySelector(".target-status");
var targetDestroyed = 0;
var targetMissed = 0;

window.onload = function () {
    document.querySelector('.hero').classList.add('blink');
    setTimeout(heroGUI, 2500);
}

function heroGUI(){
    document.querySelector('.hero').classList.remove('blink');
}

// Jet Fighter Minigame
function fire() {
    targetDestroyed = document.querySelector('.neutralised').textContent;
    targetMissed = document.querySelector('.missile-missed').textContent;

    if (isNaN(parseInt(targetDestroyed)) || isNaN(parseInt(targetMissed))) {
        console.log('Intruder detected in the system! Tampered with Integer ⚠');
        alert('Intruder detected in the system! Tampered with Integer ⚠');
    } else {
        if (fireAudio.paused) {
            fireAudio.volume = 0.2;
            fireAudio.currentTime = 0;
            fireAudio.play();

            targetDestroyed = parseInt(targetDestroyed);
            targetMissed = parseInt(targetMissed);

            stats();

            if (Math.floor(Math.random() * (3 - 1 + 1) + 1) == 1) {
                setTimeout(explosion, 1260);
                setTimeout(destroy, 1600);
                setTimeout(resetHUD, 3000);
            } else {
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
}

// Jet Fighter Minigame: sub-functions
function explosion() {
    targetStatus.classList.add("blink");
    targetStatus.classList.add("destroyed");

    var boom = document.querySelector('.neutralised');
    targetDestroyed++;
    boom.classList.add('blink');
    boom.textContent = targetDestroyed;

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

    if (targetDestroyed == 5) {
        setTimeout(fiveDestroyed, 1000);
    }
}

function fiveDestroyed() {
    console.log('Woohoo! 5 enemies neutralised! Osea is saved ヽ(•‿•)ノ');
    alert('Woohoo! 5 enemies neutralised! Osea is saved ヽ(•‿•)ノ');
    resetStats();
}

function miss() {
    targetStatus.classList.add("blink");
    targetStatus.classList.add("missed");
    targetStatus.textContent = 'Target Missed --🛦';

    var boom = document.querySelector('.missile-missed');
    targetMissed++;
    boom.classList.add('blink');
    boom.textContent = targetMissed;

    if (targetMissed == 10) {
        setTimeout(tenMissed, 1100);
    }
}

function tenMissed() {
    console.log('We have sustained too much damage! Retreat to the Kestrel ⚐');
    alert('We have sustained too much damage! Retreat to the Kestrel ⚐');
    resetStats();
}

function stats() {
    var missileLoaded = document.querySelector(".missile-loaded");
    missileLoaded.textContent = 0;
    missileLoaded.classList.add('blink');
}

function resetStats() {
    document.querySelector(".missile-loaded").textContent = 1;
    document.querySelector(".neutralised").textContent = 0;
    document.querySelector(".missile-missed").textContent = 0;
}

function resetHUD() {
    targetStatus.classList.remove("blink");
    targetStatus.classList.remove("destroyed");
    targetStatus.classList.remove("missed");
    targetStatus.textContent = 'Engage Target --🛦';

    var missileLoaded = document.querySelector(".missile-loaded")
    missileLoaded.textContent = 1;
    missileLoaded.classList.remove('blink');
    document.querySelector('.neutralised').classList.remove('blink');
    document.querySelector('.missile-missed').classList.remove('blink');
}

// Credits modal
function credits() {

}