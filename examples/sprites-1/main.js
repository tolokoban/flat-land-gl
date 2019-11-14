const TYPES = {
    bol: newType(0, 0, 542, 318),
    corbeille: newType(0, 320, 402, 524),
    tasse: newType(401, 467, 122, 119),
    citron: newType(405, 675, 117, 110),
    croissant: newType(415, 785, 104, 72),
    framboise: newType(400, 617, 61, 58),
    noisette: newType(462, 589, 61, 85),
    the: newType(402, 316, 124, 149)
}

function start() {
    const canvas = document.getElementById("canvas")
    const scene = new FlatLand.Scene(canvas)
    scene.createAtlas({
        name: "atlas",
        image: "atlas.png"
    })
    scene.createAtlas({
        name: "background",
        image: "background.png"
    })
    const sprites = new FlatLand.Painter.Sprites({
        scene,
        atlas: "atlas"
    })
    new FlatLand.Painter.Background({
        scene,
        atlas: "background",
        align: "B"
    })

    const items = []
    add(sprites, items, "bol")
    add(sprites, items, "corbeille")
    add(sprites, items, "tasse", 12)
    add(sprites, items, "citron", 17)
    add(sprites, items, "croissant", 23)
    add(sprites, items, "framboise", 47)
    add(sprites, items, "noisette", 20)
    add(sprites, items, "the", 10)

    scene.onAnimation = (time) => {
        for (let k=0 ; k<items.length ; k++) {
            const item = items[k]
            const speed1 = item.extra.speed1
            const speed2 = item.extra.speed2
            const radius = (1 + Math.cos(time * speed1)) * 120 + 10
            const angle = time * speed2
            const x = 500 + radius * Math.cos(angle)
            const y = 500 + radius * Math.sin(angle)
            const z = radius / 500

            item.update({ x, y, z, scale: (radius + 250) / 1000 })
        }
    }
    scene.start()
}


function newType(x, y, w, h) {
    return {
        width: w,
        height: h,
        u0: x / 524,
        v0: y / 856,
        u1: (x + w) / 524,
        v1: (y + h) / 856
    }
}


function add(sprites, items, name, count = 1) {
    for (let k=0 ; k<count ; k++) {
        const type = TYPES[name]
        const item = sprites.createSprite(type)
        item.extra.speed1 = (1 + Math.random()) * 0.001
        item.extra.speed2 = (1 + Math.random()) * 0.001
        items.push(item)
    }
}
