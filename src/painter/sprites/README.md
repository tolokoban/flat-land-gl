# Sprites Painter
## Usage
Here is a little example. You click to add/remove mushrooms.
```js
import FlatLand from "flat-land-gl"

const canvas = document.getElementById("my-canvas")
const scene = new FlatLand(canvas)
const atlas = Scene.createAtlas({ image: "./atlas.png"})
const spritesPainter = new FlatLand.Painter.Sprites({ atlas })
const mushrooms = [spritesPainter.create({
  x: 320, y: 1024,
  width: 96, height: 128,
  originX: 48, originY: 128,
  u0: 0, v0: 0, u1: 0.5, v1: 1
})]
const tree = spritesPainter.create({
  x: 800, y: 1024,
  width: 128, height: 512,
  originX: 64, originY: 512,
  u0: 0.5, v0: 0, u1: 1, v1: 1
})
scene.use([ spritesPainter ])
scene.onAnimation = time => {
  // Moving tree. That's insane but it shows how to update a sprite.
  tree.update({ x: time % 2048 - 1024 })
  // Msuhrooms management.
  if( scene.pointer.eventDown) {
    for (const mushy of mushrooms) {
      if (Math.abs(mushy.x - scene.pointer.x) < mushy.width / 2) {
        // There is already a mushroom in this column: destroy it!
        mushy.destroy()
        return
      }
    }
    // There is enough space here to create a mushroom.
    spritesPainter.create({
      x: scene.pointer.x, y: 1024,
      width: 96, height: 128,
      originX: 48, originY: 128,
      u0: 0, v0: 0, u1: 0.5, v1: 1
    })    
  }
}
scene.start()
```
