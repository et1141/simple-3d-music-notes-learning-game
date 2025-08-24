AFRAME.registerComponent("end-game", {
    init() {
        this.el.addEventListener("click", () => {

            const dialog = document.getElementById("information-dialog");
            const texts = dialog.querySelectorAll("a-text");
            const buttonStartGame = document.getElementById("start-game-button");
            const buttonEndGame = document.getElementById("end-game-button");
            const buttonSettings = document.getElementById("settings-button");
         
            setTimeout(() => buttonEndGame.setAttribute("scale", "0 0 0"), 300);
            setTimeout(() => buttonSettings.setAttribute("scale", "1.5 1.5 1.5"), 300);
            setTimeout(() => buttonStartGame.setAttribute("scale", "1.5 1.5 1.5"), 300);


            if (window._gameTimer) {
                clearInterval(window._gameTimer);
                window._gameTimer = null;
            }

            if (texts[0]) texts[0].setAttribute("value", "GAME ENDED");
                buttonSettings.setAttribute("scale", "1.5 1.5 1.5");
                buttonStartGame.setAttribute("scale", "1.5 1.5 1.5")
                window.dispatchEvent(new Event("game-stop"));
                window._gameEnded = true;
            });
    }
});