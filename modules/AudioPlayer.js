// AudioPlayer.js
export default class AudioPlayer {
  constructor(audioSelector, options = {}) {
    this.audio = document.querySelector(audioSelector);
    this.volume = options.volume || 0.3;

    if (!this.audio) return;

    document.addEventListener("click", () => this.play(), { once: true });
    document.addEventListener("touchstart", () => this.play(), { once: true });
  }

  play() {
    if (!this.audio) return;
    this.audio.volume = 0;
    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          let vol = 0;
          const fade = setInterval(() => {
            if (vol < this.volume) {
              vol += 0.02;
              this.audio.volume = vol;
            } else {
              clearInterval(fade);
            }
          }, 200);
        })
        .catch(err => console.log("⚠️ Autoplay blocked:", err));
    }
  }
}
