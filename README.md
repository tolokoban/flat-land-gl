# flat-land-gl
WebGL library for flat images display management

## How to use it?

```js
import FlatLand from 'flat-land-gl'

const canvas = document.getElementById('my-canvas')
const flatLand = new FlatLand(canvas)

flatLand.loadImageFromURL("background", "assets/background.jpg")
flatLand.loadImageFromURL("mushroom", "assets/mushroom.png")

const background = flatLand.createFrame({
  image: "background",
  width: 1000,
  height: 1000,
  z: 1
})

const MUSHROOMS_COUNT = 1000

const mushrooms = []
for (let i=0 ; i<MUSHROOMS_COUNT ; i++) {
  // Sprites are slower than frames,
  // but they can rotate.
  const mushroom = flatLand.createSprite({
    image: "mushroom",
    width: 64,
    height: 64,
    centerX: 32,
    centerY: 64,
    x: i / 1000,
    z: i / MUSHROOMS_COUNT
  })
}

flatLand.onRender = (time) => {
  const height = flatLang.height
  
  for (const mushroom of mushrooms) {
    const angle1 = time * 0.027
    const angle2 = time * 0.019
    const angle3 = time * 0.023
    const angle4 = time * 0.017
    
    mushroom.y = height * (1 - Math.abs(Math.cos(angle1)))
    mushroom.rotation = angle2
    mushroom.scaleX = 1 + Math.sin(angle2)
    mushroom.scaleY = 1 + Math.sin(angle3)
    
    time += 2
  }
}

let isRunning = true

// Click on the canvas to start/stop rendering.
canvas.onClick = () => {
  if (isRunning) {
    flatLand.stop()
    isRunning = false
  } else {
    flatLand.start()
    isRunning = true
  }
}

// Start rendering.
flatLand.start()
```
