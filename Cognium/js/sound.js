// Sound System for COGNIUM
class SoundManager {
    constructor() {
        this.sounds = {
            // Windows 3.x sounds
            boot: 'assets/sounds/Windows3x/TADA.WAV',
            click: 'assets/sounds/Windows3x/DING.WAV',
            error: 'assets/sounds/Windows3x/CHORD.WAV',
            chimes: 'assets/sounds/Windows3x/CHIMES.WAV',
            ringin: 'assets/sounds/Windows3x/RINGIN.WAV',
            ringout: 'assets/sounds/Windows3x/RINGOUT.WAV',
            
            // xpAlto sounds
            startup: 'assets/sounds/xpAlto/xpAlto Start Windows.wav',
            shutdown: 'assets/sounds/xpAlto/xpAlto Shutdown.wav',
            maximize: 'assets/sounds/xpAlto/xpAlto Maximize.wav',
            minimize: 'assets/sounds/xpAlto/xpAlto Restore.wav',
            newMessage: 'assets/sounds/xpAlto/xpAlto NewMail.wav',
            notification: 'assets/sounds/xpAlto/xpAlto Notify.wav',
            question: 'assets/sounds/xpAlto/xpAlto Question.wav',
            exclamation: 'assets/sounds/xpAlto/xpAlto Exclamation.wav',
            menuPopup: 'assets/sounds/xpAlto/xpAlto Menu Popup.wav',
            select: 'assets/sounds/xpAlto/xpAlto Select.wav',
            navigate: 'assets/sounds/xpAlto/xpAlto Navigating.wav',
            hardwareInsert: 'assets/sounds/xpAlto/xpAlto Hardware Insert.wav',
            hardwareRemove: 'assets/sounds/xpAlto/xpAlto Hardware Remove.wav',
            recycle: 'assets/sounds/xpAlto/xpAlto Recycle.wav',
            criticalStop: 'assets/sounds/xpAlto/xpAlto Critical Stop.wav',
            balloon: 'assets/sounds/xpAlto/xpAlto Balloon.wav'
        };
        
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.7;
        this.initAudioContext();
    }
    
    initAudioContext() {
        // Don't create audio context here - wait for user interaction
        // The context will be created in play() method when needed
    }
    
    async play(soundName, volume = this.volume) {
        if (!this.enabled || !this.sounds[soundName]) {
            return;
        }
        
        // Don't create audio context until absolutely necessary
        // Just play the sound directly
        try {
            const audio = new Audio(this.sounds[soundName]);
            audio.volume = volume;
            
            // Handle user interaction requirement silently
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Silently handle autoplay policy - no console output
                });
            }
        } catch (error) {
            // Silently handle all audio errors
        }
    }
    
    playSequence(sounds, interval = 500) {
        sounds.forEach((sound, index) => {
            setTimeout(() => this.play(sound), index * interval);
        });
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
    
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
    
    // Special sound combinations for narrative events
    playBootSequence() {
        this.playSequence(['startup', 'chimes'], 1000);
    }
    
    playErrorSequence() {
        this.playSequence(['error', 'exclamation'], 300);
    }
    
    playJanusEvent() {
        this.playSequence(['notification', 'question'], 200);
    }
    
    playCorruptionEvent() {
        this.play('criticalStop');
        setTimeout(() => this.play('error'), 500);
    }
    
    playDiscoveryEvent() {
        this.playSequence(['balloon', 'newMessage'], 400);
    }
}

// Global sound manager instance
const soundManager = new SoundManager();

// Convenience function for backward compatibility
function playSound(soundName, volume) {
    soundManager.play(soundName, volume);
}

// Sound manager instance will be created when needed
window.soundManager = null;

// Export for use in other modules
window.soundManager = soundManager;
window.playSound = playSound;
