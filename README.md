# flat-land-gl
WebGL library for flat images display management

## How to use it?

```js
import FlatLand from 'flat-land-gl'

const canvas = document.getElementById('my-canvas')
const flatLand = new FlatLand(canvas)

flatLand.loadImageFromURL("background", "assets/background.jpg")
flatLand.loadImageFromURL("mushroom", "assets/mushroom.png")

```
