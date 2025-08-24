AFRAME.registerComponent("show-dialog", {
    init() {
        this.el.addEventListener("click", () => {
            const dialog = document
                .getElementById("quest-dialog")
                //dialog.setAttribute("scale", "1 1 1")
            dialog.setAttribute("animation", {
                property: "scale",
                to: { x: 1, y: 1, z: 1 },
                dur: 500
            })
        })
    }
})