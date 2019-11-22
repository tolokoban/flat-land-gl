"use strict"

const NB_INVADERS = 256

function start() {
    const canvas = document.getElementById("canvas")
    const scene = new FlatLand.Scene(canvas)
    scene.createAtlas({ name: "hero", image: "hero.png" })
    scene.createAtlas({ name: "background", image: "background.png" })
    const sprites = new FlatLand.Painter.Sprites({ scene, atlas: "hero" })
    const background = new FlatLand.Painter.Background({
        atlas: "background", align: "B" })
    const heros = []
    for (let loop = 0; loop < NB_INVADERS; loop++) {
        const hero = sprites.createSprite({
            z: Math.random(),
            width: 64, height: 128,
            originX: 32, originY: 128,
            u0: 0, v0: 0, u1: 0.5, v1: 1
        })
        hero.extra.x = Math.random() * 1024 - 512
        hero.extra.speed = 50 + Math.random() * 300
        hero.extra.time = 0
        hero.extra.alive = true
        heros.push(hero)
    }

    let lastTime = 0
    scene.onAnimation = time => {
        if (lastTime === 0) {
            lastTime = time
            return
        }
        const deltaTime = time - lastTime
        lastTime = time

        if (scene.pointer.eventDown || scene.pointer.eventUp) {
            console.log("Down: ", time)
            let hitHero = null
            const pointerX = scene.pointer.x
            const pointerY = scene.pointer.y
            for (const hero of heros) {
                if (!hero.extra.alive || hero.y < pointerY) continue
                const minY = hero.y - hero.height * hero.z
                if (minY > pointerY) continue
                const minX = hero.x - (hero.width * hero.z * 0.5)
                const maxX = hero.x + (hero.width * hero.z * 0.5)
                if (minX > pointerX || maxX < pointerX) continue
                if (!hitHero || hitHero.z < hero.z) {
                    hitHero = hero
                }
            }

            if (hitHero) {
                hitHero.extra.alive = false
                hitHero.extra.death = time
            }
        }

        for (const hero of heros) {
            let u0 = hero.u0
            let u1 = hero.u1
            if (hero.extra.time === 0) {
                hero.extra.time = time + hero.extra.speed
            } else if (time > hero.extra.time) {
                const n = Math.ceil((time - hero.extra.time) / hero.extra.speed)
                hero.extra.time += hero.extra.speed * n
                u0 = 0.5 - u0
                u1 = 1.5 - u1
            }

            if (!hero.extra.alive) {
                const y = hero.y - 10 * hero.z * deltaTime / hero.extra.speed
                hero.update({ u0, u1, y, angle: time * (4 - hero.extra.speed * 0.001) })
                if (time - hero.extra.death > 1000) {
                    sprites.removeSprite(hero)
                }
                continue
            }

            let z = hero.z + 0.01 * deltaTime / hero.extra.speed
            if (z > 1) z = 0
            hero.update({
                x: hero.extra.x * z + 512,
                y: 2048 / (2 - z) - 1024,
                z,
                u0, u1,
                scale: 0.25 + z * 0.75
            })
        }
    }

    scene.use([ sprites, background ])
    scene.start()
}
