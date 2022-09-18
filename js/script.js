let fireAudio = new Audio('audio/missile-launch.wav');
const targetStatus = document.querySelector(".target-status");
let targetDestroyed = 0;
let targetMissed = 0;

const nudgeAnimation = document.querySelector('.crosshair');
nudgeAnimation.classList.remove('nudge');

window.onload = function () {
    document.querySelector('.hero').classList.add('blink3s');
    setTimeout(heroGUI, 2500);
}

function heroGUI() {
    document.querySelector('.hero').classList.remove('blink3s');
    nudgeAnimation.classList.add('nudge');
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

            const missileLoaded = document.querySelector(".missile-loaded");
            missileLoaded.textContent = 0;
            missileLoaded.classList.add('blink');

            if (Math.floor(Math.random() * (3 - 1 + 1) + 1) == 1) {
                setTimeout(explosion, 1260);
                setTimeout(destroy, 1600);
                setTimeout(resetHUD, 3000);
            } else {
                setTimeout(miss, 1260);
                setTimeout(resetHUD, 3000);
            }

        } else {
            const denyAudio = new Audio('audio/deny-launch.wav');
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

    const boom = document.querySelector('.neutralised');
    targetDestroyed++;
    boom.classList.add('blink');
    boom.textContent = targetDestroyed;

    targetStatus.textContent = 'Target Down --✴';
    const destroyAudio = new Audio('audio/explosion.wav');
    fireAudio.volume = 0.09;
    destroyAudio.volume = 0.18;
    destroyAudio.currentTime = 0;
    destroyAudio.play();
}

function destroy() {
    const destroyAudio = new Audio('audio/neutralised.mp3');
    destroyAudio.volume = 0.3;
    destroyAudio.currentTime = 0;
    destroyAudio.play();

    if (targetDestroyed == 5) {
        setTimeout(fiveDestroyed, 1000);
    }
}

// Minigame: Win
function fiveDestroyed() {
    console.log('Woohoo! 5 enemies neutralised. Osea is saved ヽ(•‿•)ノ');
    alert('Woohoo! 5 enemies neutralised. Osea is saved ヽ(•‿•)ノ');
    resetStats();
}

function miss() {
    targetStatus.classList.add("blink");
    targetStatus.classList.add("missed");
    targetStatus.textContent = 'Target Missed --🛦';

    const boom = document.querySelector('.missile-missed');
    targetMissed++;
    boom.classList.add('blink');
    boom.textContent = targetMissed;

    if (targetMissed == 10) {
        setTimeout(tenMissed, 1100);
    }
}

// Minigame: Lose
function tenMissed() {
    console.log('We have sustained too much damage! Retreat to the Kestrel ⚐');
    alert('We have sustained too much damage! Retreat to the Kestrel ⚐');
    resetStats();
}

// Reset
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

    const missileLoaded = document.querySelector(".missile-loaded")
    missileLoaded.textContent = 1;
    missileLoaded.classList.remove('blink');
    document.querySelector('.neutralised').classList.remove('blink');
    document.querySelector('.missile-missed').classList.remove('blink');
}

// Credits: modal
function credits() {

}