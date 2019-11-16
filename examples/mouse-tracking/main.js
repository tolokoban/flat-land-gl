"use strict"

function start() {
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

        const dx = 150 * FlatLand.Calc.cos(ang)
        const dy = 150 * FlatLand.Calc.sin(ang)
        missile.update({
            x: scene.pointerX + dx,
            y: scene.pointerY + dy,
            angle: -2 * ang
        })
    }
    scene.start()
}
