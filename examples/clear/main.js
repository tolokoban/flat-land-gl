"use strict"

function start() {
    const canvas = document.getElementById("canvas")
    const scene = new FlatLand.Scene(canvas)
    const clear = new FlatLand.Painter.Clear()

    scene.onAnimation = time => {
        clear.red = Math.abs(Math.cos(time * 0.0011))
        clear.green = Math.abs(Math.cos(time * 0.0013))
        clear.blue = Math.abs(Math.cos(time * 0.0017))
    }
    scene.use([ clear ])
    scene.start()
}
