class PomodoroTimer {
    constructor() {
        this.defaultMinutes = 25;
        this.timeLeft = this.defaultMinutes * 60;
        this.totalTime = this.defaultMinutes * 60;
        this.timerId = null;
        this.isRunning = false;
        this.audioContext = null;

        // DOM Elements
        this.timeDisplay = document.getElementById('time-display');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.circle = document.querySelector('.progress-ring__circle');
        this.customTimeInput = document.getElementById('custom-time');

        // Circle Setup
        this.radius = this.circle.r.baseVal.value;
        this.circumference = 2 * Math.PI * this.radius;

        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circle.style.strokeDashoffset = 0;

        // Bind Events
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.customTimeInput.addEventListener('change', () => this.updateCustomTime());

        this.updateDisplay();
    }

    // Audio Context Setup
    initAudio() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playSound() {
        if (this.audioContext) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime); // A5
            oscillator.frequency.exponentialRampToValueAtTime(440, this.audioContext.currentTime + 0.5); // Drop to A4

            gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.5);
        }
    }

    updateCustomTime() {
        let minutes = parseInt(this.customTimeInput.value);
        if (isNaN(minutes) || minutes < 1) minutes = 1;
        if (minutes > 60) minutes = 60;

        this.customTimeInput.value = minutes;
        this.defaultMinutes = minutes;

        if (!this.isRunning) {
            this.timeLeft = minutes * 60;
            this.totalTime = minutes * 60;
            this.updateDisplay();
            this.setProgress(0); // Reset progress ring visually to full
        }
    }

    setProgress(percent) {
        const offset = this.circumference - (percent / 100) * this.circumference;
        this.circle.style.strokeDashoffset = offset;
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Calculate progress based on elapsed time vs total time
        // When full (start), percent is 100. As time ticking down, percent decreases.
        // Wait, logically: 
        // timeLeft = totalTime -> 100%
        // timeLeft = 0 -> 0%
        const percent = (this.timeLeft / this.totalTime) * 100;
        this.setProgress(percent);
    }

    start() {
        this.initAudio(); // Initialize audio context on user interaction
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        if (this.isRunning) return;

        this.isRunning = true;
        this.startBtn.disabled = true; // Disable Start
        this.pauseBtn.disabled = false; // Enable Pause
        this.customTimeInput.disabled = true; // Disable input while running

        this.timerId = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.updateDisplay();
            } else {
                this.finish();
            }
        }, 1000);
    }

    pause() {
        if (!this.isRunning) return;

        this.isRunning = false;
        clearInterval(this.timerId);
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.customTimeInput.disabled = false;
    }

    reset() {
        this.pause();
        this.timeLeft = this.defaultMinutes * 60;
        this.totalTime = this.defaultMinutes * 60;
        this.updateDisplay();
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.customTimeInput.disabled = false;
        this.setProgress(100);
    }

    finish() {
        this.pause();
        this.timeLeft = 0;
        this.updateDisplay();
        this.playSound();
        alert('Pomodoro completed!');
        this.reset();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});
