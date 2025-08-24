AFRAME.registerComponent("close-dialog", {
    init() {
        this.el.addEventListener("click", () => {
            const dialog = document.getElementById("information-dialog")
            dialog.setAttribute("scale", "0,0,0")
        })
    }
})