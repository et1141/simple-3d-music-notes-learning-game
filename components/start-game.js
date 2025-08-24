import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();


const IMG_EXT = ".png"; 
function imgNameFromNote(note) {
  // 'C'  -> 'c4', 'C#' -> 'cs4', 'D#' -> 'ds4' ... const octave 4
  return note.toLowerCase().replace('#','s') + '4';
}


window.gameSettings = window.gameSettings || { initialTime: 15, timeBonus: 5 };

AFRAME.registerComponent("start-game", {
  init() {
    this.buttonEndGame = document.getElementById("end-game-button");

    this.buttonSettings = document.getElementById("settings-button");
    this.buttonStartGame = document.getElementById("start-game-button");
    this.dialog = document.getElementById("information-dialog");
    this.noteText  = this.dialog.querySelectorAll("a-text")[0];
    this.scoreText = this.dialog.querySelectorAll("a-text")[1];
    this.timeText  = this.dialog.querySelectorAll("a-text")[2];
    this.noteImg = this.dialog.querySelector("#information-dialog-noteimg");

    this.buttonStartGame?.addEventListener('click', () => {
      this.buttonSettings.setAttribute("scale", "0 0 0");
      this.dialog.setAttribute("scale", "1 1 1");
      this.buttonEndGame.setAttribute("scale", "1 1 1");
        setTimeout(() => this.buttonStartGame.setAttribute("scale", "0 0 0"), 300);

    });

    this.buttonEndGame?.addEventListener('click', () => {
        this.stopGame(false)
    }
    );

    this.notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    this.timeLeft = window.gameSettings?.initialTime ?? 30;
    this.score = 0;
    this.currentNote = "";

    this.el.addEventListener("click", () => this.startGame());

    window.addEventListener("note-played", (e) => {
      const note = e.detail.note;
      if (note === this.currentNote) {
        this.score++;
        const bonus = window.gameSettings?.timeBonus ?? 5; 
        this.timeLeft += bonus;
        this.pickNote();
        this.updateDisplay();
      }
    });
  },

  startGame() {
    this.timeLeft = window.gameSettings?.initialTime ?? 15;
    this.score = 0;
    this.pickNote();
    this.updateDisplay();
    this.dialog.setAttribute("animation", {
      property: "scale",
      to: { x: 1, y: 1, z: 1 },
      dur: 500
    });

    window.dispatchEvent(new Event("game-start"));

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.stopGame(true); 
        return;
      }
      this.updateDisplay();
    }, 1000);
  },

  stopGame(lost = false) {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.timeLeft = 0;

    window.dispatchEvent(new Event("game-stop"));

      if (lost) {
        this.noteText.setAttribute("value", "You Lost!");
        this.scoreText.setAttribute("value", `Final Score: ${this.score}`);
      } else {
        this.noteText.setAttribute("value", "Game Ended");
        this.scoreText.setAttribute("value", `Final Score: ${this.score}`);
      }
    this.timeText.setAttribute("value", "");
    setTimeout(() => this.buttonStartGame.setAttribute("scale", "1.5 1.5 1.5"), 300);
    setTimeout(() => this.buttonSettings.setAttribute("scale", "1.5 1.5 1.5"), 300);
    setTimeout(() => this.buttonEndGame.setAttribute("scale", "0 0 0"), 300);
    if (this.noteImg) this.noteImg.setAttribute("visible", "false");


    if (this.buttonStartGame) {
      this.buttonStartGame.setAttribute("content", "Play Again");
    }

  },

  pickNote() {
    const note = this.notes[Math.floor(Math.random() * this.notes.length)];
    this.currentNote = note;

    if (this.noteImg) {
        const fname = imgNameFromNote(note);
        this.noteImg.setAttribute("src", `/notes/${fname}${IMG_EXT}`);
        this.noteImg.setAttribute("visible", "true");
    }

    //this.noteText.setAttribute("value", `Note: ${note}`); //prev version, no image just text
  },

  updateDisplay() {
    this.scoreText.setAttribute("value", `Score: ${this.score}`);
    this.timeText.setAttribute("value", `Time Left: ${this.timeLeft}s`);
  }
});
