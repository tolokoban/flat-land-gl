"use strict"

function start() {
    let scale = 1
    const canvas = document.getElementById("canvas")
    const scene = new FlatLand.Scene(canvas)
    scene.createAtlas({ name: "missile", image: "missile.png" })
    scene.createAtlas({ name: "background", image: "background.png" })
    const sprites = new FlatLand.Painter.Sprites({
        scene, atlas: "missile"
    })
    new FlatLand.Painter.Background({
        scene, atlas: "background", align: "B"
    })
    const missile = sprites.createSprite({
        width: 387, height: 335
    })
    scene.onAnimation = time => {
        const ang = time

        const dx = 100 * FlatLand.Calc.cos(ang)
        const dy = 100 * FlatLand.Calc.sin(ang)

        if (scene.pointer.down) {
            if (scale > 0.5) scale -= 0.01
        }
        else {
            if (scale < 1) scale += 0.01
        }

        missile.update({
            x: scene.pointer.x + dx,
            y: scene.pointer.y + dy,
            scale,
            angle: -2 * ang
        })
    }
    scene.start()
}
