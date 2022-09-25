window.onload = function () {
    document.querySelector('body').classList.add('no-overflow');
    document.querySelector('html').classList.add('no-overflow');
    setTimeout(load, 4000);
}

window.onscroll = function () {
    if (document.body.scrollTop > 570 || document.documentElement.scrollTop > 570) {
        changeNav.classList.add('change-nav');
        topButton.classList.add('show-btn');
    } else {
        changeNav.classList.remove('change-nav');
        topButton.classList.remove('show-btn');
    }
};

// Global variables
let fireAudio = new Audio('audio/missile-launch.wav');
const changeNav = document.querySelector("nav");

// Global: target
const targetStatus = document.querySelector(".target-status");
const targetStatusText = document.querySelector(".target-status span:nth-of-type(1)");
const targetStatusEmoji = document.querySelector(".target-status span:nth-of-type(2)");

// Global: modal 
const modal = document.querySelector('.modals');
const topButton = document.querySelector('.top-btn');
let targetDestroyed = 0;
let targetMissed = 0;

// Global: hamburger
const domHeader = document.querySelector('header');
const burgerBtn = document.querySelector('.burger button');

// Remove default animation
const nudgeAnimation = document.querySelector('.crosshair');
nudgeAnimation.classList.remove('nudge');

// Loading animations
function load() {
    document.querySelector('.loading-content').style.opacity = 0;
    setTimeout(logo, 1000);
}

function logo() {
    document.querySelector('.promo-content').style.opacity = 1;
    setTimeout(logoOut, 1500);
}

function logoOut() {
    document.querySelector('.promo-content').style.opacity = 0;
    setTimeout(mv, 1500);
}

function mv() {
    document.querySelector('.mistervaliant').style.opacity = 1;
    setTimeout(mvOut, 1500);
}

function mvOut() {
    document.querySelector('.mistervaliant').style.opacity = 0;
    setTimeout(blink, 1500);
}

function blink() {
    modal.classList.add('modalout');
    document.querySelector('body').classList.remove('no-overflow');
    document.querySelector('html').classList.remove('no-overflow');
    document.querySelector('.hero').classList.add('blink3s');
    setTimeout(heroGUI, 2500);
    hamburger();
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

    targetStatusText.textContent = 'Target Down -- ';
    targetStatusEmoji.innerHTML = '<i class="ri-fire-fill"></i>';
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
    targetStatusText.textContent = 'Target Missed -- ';
    targetStatusEmoji.innerHTML = '<i class="ri-plane-fill"></i>';

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
    targetStatusText.textContent = 'Engage Target -- ';
    targetStatusEmoji.innerHTML = '<i class="ri-plane-fill"></i>';

    const missileLoaded = document.querySelector(".missile-loaded")
    missileLoaded.textContent = 1;
    missileLoaded.classList.remove('blink');
    document.querySelector('.neutralised').classList.remove('blink');
    document.querySelector('.missile-missed').classList.remove('blink');
}

// Modals
function credits() {
    modal.classList.remove('modalout');
    modal.classList.add('credits-modal');
    document.querySelector('.credits-modal').style.opacity = 1;
    hideBurger();
}

function videoModal() {
    modal.classList.remove('modalout');
    modal.classList.add('video-modal');
    document.querySelector('.video-modal').style.opacity = 1;
}

function closeVideo() {
    document.querySelector('.video-modal').style.opacity = 0;
    modal.classList.remove('video-modal');
    modal.classList.add('modalout');
    // Add ?enablejsapi=1 to iframe src
    document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
}

function closeCredits() {
    document.querySelector('.credits-modal').style.opacity = 0;
    modal.classList.remove('credits-modal');
    modal.classList.add('modalout');
}

// Scroll to top
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Hamburger
window.addEventListener("resize", function () {
    hamburger();
});

function hamburger() {
    if (window.matchMedia("(max-width: 850px)").matches) {
        domHeader.classList.add('ham');
    } else {
        domHeader.classList.remove('ham');
    }
}

function toggleBurger() {
    if (burgerBtn.classList.contains('is-active')) {
        hideBurger();
    } else {
        burgerBtn.classList.add('is-active');
        domHeader.classList.add('ham-active');
    }
}

document.querySelector('main').addEventListener('click', hideBurger);

function hideBurger() {
    if (burgerBtn.classList.contains('is-active')) {
        burgerBtn.classList.remove('is-active');
        domHeader.classList.remove('ham-active');
    }
}


