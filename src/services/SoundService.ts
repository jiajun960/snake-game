class SoundService {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private isMuted: boolean = false;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    const soundFiles = {
      eat: '/sounds/eat.mp3',
      gameOver: '/sounds/game-over.mp3',
      move: '/sounds/move.mp3',
      start: '/sounds/start.mp3'
    };

    Object.entries(soundFiles).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      this.sounds.set(key, audio);
    });
  }

  play(soundName: string) {
    if (this.isMuted) return;
    
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // 处理浏览器可能阻止自动播放的情况
        console.log('Sound play failed');
      });
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
  }
}

export const soundService = new SoundService(); 