"use strict"

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas")
  const scene = new FlatLandGL.Scene(canvas)
  const backgroundAtlas = scene.createAtlas({ image: "background.jpg" })
  const backgroundPainter = new FlatLandGL.Painter.Background({
    atlas: backgroundAtlas
  })
  const fireAtlas = scene.createAtlas({ image: "fire.png" })
  const firePainter = new FlatLandGL.Painter.Sprites({
    atlas: fireAtlas
  })

  const fire = firePainter.create({
    width: 128, height: 256, x: 512, y: 512,
    originX: 64, originY: 256
  })

  scene.onAnimation = time => {
    const ANIM_DURATION = 1100
    const index = Math.floor(16 * (time % ANIM_DURATION) / ANIM_DURATION)
    const row = Math.floor(index / 4)
    const col = index % 4
    fire.update({
      u0: 0.25 * col, v0: 0.25 * row,
      u1: 0.25 * (1 + col), v1: 0.25 * (1 + row),
      angle: 200 * Math.cos(time * 0.000845) * Math.sin(time * 0.0007145),
      scale: 1 + 0.2 * Math.cos(time * 0.00147) * Math.sin(time * 0.000745)
    })
  }

  scene.use([ firePainter, backgroundPainter ])
  scene.start()
});
