# flat-land-gl
WebGL library for flat images display management.

## Principle
The rendering is made by __Painters__.
Each painter work in a virtual 3D space:
* `x` and `y` are defined between 0 and 1024,
* and `z` is defined between -1 (background) and +1 (foreground).

## How to use it?
### Vanilla Javascript

Download the [`flat-land-gl.js`](https://raw.githubusercontent.com/tolokoban/flat-land-gl/master/dist/flat-land-gl.js) file and save it in the same folder as your main HTML file: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>The best game in the World!</title>
    <style>
        html, body, canvas {
            position: absolute;
            left: 0; top: 0;
            width: 100%; height: 100%;
            padding: 0; margin: 0;
            overflow: hidden;
        }
    </style>
</head>
<body onload="start()">
    <canvas id="canvas"></canvas>    
    <script src="flat-land-gl.js"></script>
    <script src="main.js"></script>
</body>
</html>
```

Now you only need to create the `main.js` file with all your code.
You will find a variable called __`FlatGl`__ in your global space.

```js
function start() {
    const canvas = document.getElementById("canvas")
    const scene = new FlatLand.Scene(canvas)
    scene.createAtlas({
        name: "atlas",
        image: "jumping-mushrooms.png"
    })
    const sprites = new FlatLand.Painter.Sprites({
        scene, atlas: "atlas"
    })
    const mushroom = sprites.createSprite({
        width: 75, height: 120
    })
    scene.createAtlas({
        name: "background", image: "ferry-forest.jpg"
    })
    new FlatLand.Painter.Background({
        scene, atlas: "background"
    })
    scene.onAnimation = (time) => {
        const ang = time * 0.001
        const x = 512 + 0.5 * scene.width * Math.cos(ang)
        const y = 512 + 0.5 * scene.height * Math.sin(ang)
        mushroom.update({ x, y })
    }
    scene.start()
}
```

## More
Read the [manual](https://tolokoban.github.io/flat-land-gl/) for more details.
