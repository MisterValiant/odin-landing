var fireAudio = new Audio('audio/missile-launch.wav');

function fire() {
    if (fireAudio.paused) {
        fireAudio.volume = 0.1;
        fireAudio.currentTime = 0;
        fireAudio.play();
    }else{
        var denyAudio = new Audio('audio/deny-launch.wav');
        denyAudio.volume = 0.3;
        denyAudio.currentTime = 0;
        denyAudio.play();
    }
}