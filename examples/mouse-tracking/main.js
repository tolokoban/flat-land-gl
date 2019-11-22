"use strict"

const items = []

function addItem(x, y) {
    const item = { x, y, width: 50, height: 50, extra: { time: Date.now() } }
    items.push(item)
    return item
}

function start() {
    const canvas = document.getElementById("canvas")
    const scene = new FlatLand.Scene(canvas)
    scene.createAtlas({ name: "missile", image: "missile.png" })
    scene.createAtlas({ name: "background", image: "background.png" })
    const background = new FlatLand.Painter.Background({
        scene, atlas: "background", align: "B"
    })
    const sprites = new FlatLand.Painter.Sprites({
        scene, atlas: "missile"
    })
    const missile = sprites.createSprite({
        width: 387, height: 335,
        x: 512, y: 512
    })

    // Use painters in this order.
    // Rendering will be faster when the background is painted after everything else.
    scene.use([sprites, background])

    scene.onAnimation = time => {
        const ang = time

        const dx = 150 * FlatLand.Calc.cos(ang)
        const dy = 150 * FlatLand.Calc.sin(ang)
        missile.update({
            x: scene.pointer.x + dx,
            y: scene.pointer.y + dy,
            angle: -2 * ang
        })
    }

    scene.start()
}
