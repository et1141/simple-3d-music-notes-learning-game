// components/game-settings-panel.js
AFRAME.registerComponent("game-settings-panel", {
  init() {
    // refs
    this.first_time_settings = true
    this.panel    = document.getElementById("settings-dialog");
    this.btnOpen  = document.getElementById("settings-button");
    this.btnSave  = document.getElementById("btn-settings-save");
    this.btnCancel= document.getElementById("btn-settings-cancel");
    this.startBtn = document.getElementById("start-game-button");

    // value displays
    this.txtInitial = document.getElementById("val-initial-time");
    this.txtBonus   = document.getElementById("val-time-bonus");

    // +/- buttons
    this.btnInitMinus  = document.getElementById("btn-init-minus");
    this.btnInitPlus   = document.getElementById("btn-init-plus");
    this.btnBonusMinus = document.getElementById("btn-bonus-minus");
    this.btnBonusPlus  = document.getElementById("btn-bonus-plus");
    this.gamePanel = document.getElementById("information-dialog");


    // defaults (fallbacks)
    const gs = (window.gameSettings ||= { initialTime: 15, timeBonus: 5 });
    this.initialTime = gs.initialTime ?? 15;
    this.timeBonus   = gs.timeBonus   ?? 5;

    this.refresh();

    // open every time (no animation baggage)
    this.btnOpen?.addEventListener("click", () => {
      // show panel
      this.panel?.setAttribute("scale", "1 1 1");
      // hide start game and setting buttons 
      setTimeout(() => this.startBtn.setAttribute("scale", "0 0 0"), 300);
      setTimeout(() => this.btnOpen.setAttribute("scale", "0 0 0"), 300);

    // save gamePanel scale as string and close it
    const scaleObj = this.gamePanel?.getAttribute("scale");
    if (scaleObj && typeof scaleObj === 'object') {
      this._prevGamePanelScale = `${scaleObj.x} ${scaleObj.y} ${scaleObj.z}`;
    } else {
      this._prevGamePanelScale = scaleObj || "1 1 1";
    }
    console.log('saved scale:', this._prevGamePanelScale);
    this.gamePanel.setAttribute("scale", "0 0 0");

    });

    // +/- handlers (keep it dumb-simple)
    this.btnInitMinus?.addEventListener("click", () => { this.setInitial(this.initialTime - 5); });
    this.btnInitPlus ?.addEventListener("click", () => { this.setInitial(this.initialTime + 5); });
    this.btnBonusMinus?.addEventListener("click", () => { this.setBonus(this.timeBonus - 1); });
    this.btnBonusPlus ?.addEventListener("click", () => { this.setBonus(this.timeBonus + 1); });

    // save -> publish + close
    this.btnSave?.addEventListener("click", () => {
      window.gameSettings = { initialTime: this.initialTime, timeBonus: this.timeBonus };
      window.dispatchEvent(new CustomEvent("settings-saved", { detail: window.gameSettings }));
      this.closePanel();
    });

    // cancel -> just close
    this.btnCancel?.addEventListener("click", () => this.closePanel());
  },

  // update displayed text
  refresh() {
    this.txtInitial?.setAttribute("value", String(this.initialTime));
    this.txtBonus  ?.setAttribute("value", String(this.timeBonus));
  },

  // clamp + step logic (nothing fancy)
  setInitial(v) {
    v = Math.max(5, Math.min(300, parseInt(v, 10) || 15));
    this.initialTime = v;
    this.refresh();
  },

  setBonus(v) {
    v = Math.max(1, Math.min(30, parseInt(v, 10) || 5));
    this.timeBonus = v;
    this.refresh();
  },

  closePanel() {
    this.panel?.setAttribute("scale", "0 0 0");
    this.startBtn?.setAttribute("scale", "1.5 1.5 1.5");
    this.btnOpen.setAttribute("scale", "1.5 1.5 1.5");
    // restore previous scale as string
    if (this._prevGamePanelScale) {
      this.gamePanel.setAttribute("scale", this._prevGamePanelScale);
      console.log('restored scale:', this._prevGamePanelScale);
    }
    console.log("ASFASF")
    console.log(this._prevGamePanelScale)
    this.gamePanel.setAttribute("scale", this._prevGamePanelScale);
    
  }
});
