import { PitchDetector } from "pitchy";

// turn on the microphone, detect played note  and emit "note-played" 
AFRAME.registerComponent("mic-note-detector", {
  init() {
    this.audioContext = null;
    this.analyser = null;
    this.stream = null;
    this.timeData = null;
    this.detector = null;
    this.rafId = null;
    this.isListening = false;

    this.lastMidi = null;
    this.stableMidi = null;
    this.sameCount = 0;

    window.addEventListener("game-start", () => this.startListening());
    window.addEventListener("game-stop", () => this.stopListening());

  },

  remove() {
    this.stopListening();
  },

  //https://developer.mozislla.org/en-US/docs/Web/API/BaseAudioContext/createAnalyser
  async startListening() {
    if (this.isListening) return;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      await this.audioContext.resume();

      const src = this.audioContext.createMediaStreamSource(this.stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      src.connect(this.analyser);

      this.timeData = new Float32Array(this.analyser.fftSize);
      this.detector = PitchDetector.forFloat32Array(this.analyser.fftSize);

      this.lastMidi = this.stableMidi = null;
      this.sameCount = 0;
      this.isListening = true;

      this.loop();
    } catch (err) {
      console.error("Microphone access error:", err);
    }
  },

  stopListening() {
    this.isListening = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;

    if (this.audioContext) {
      try { this.audioContext.close(); } catch {}
      this.audioContext = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
  },

  loop() {
    if (!this.isListening) return;

    this.analyser.getFloatTimeDomainData(this.timeData);
    const [freq, clarity] = this.detector.findPitch(this.timeData, this.audioContext.sampleRate);

    let midi = null;
    if (Number.isFinite(freq) && clarity >= 0.8) {
      midi = hzToMidi(freq);
    }

    if (midi != null && midi === this.lastMidi) {
      this.sameCount++;
    } else {
      this.sameCount = 0;
    }
    this.lastMidi = midi;

    if (this.sameCount >= 4 && midi !== this.stableMidi) {
      this.stableMidi = midi;
      const nameNoOctave = midiToNameNoOctave(midi); // <- BEZ oktawy
      if (nameNoOctave) {

        window.dispatchEvent(new CustomEvent("note-played", {
          detail: { note: nameNoOctave }
        }));
        // the last note played:
        // console.log("Mic note:", nameNoOctave);
      }
    }

    this.rafId = requestAnimationFrame(() => this.loop());
  }
});

//https://inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies
function hzToMidi(f) {
  return f > 0 ? Math.round(69 + 12 * Math.log2(f / 440)) : null;
}

function midiToNameNoOctave(n) {
  if (n == null) return null;
  const names = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  // no octave, only the note
  return names[n % 12];
}
