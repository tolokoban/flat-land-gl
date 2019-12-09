"use strict"

const FS = require("fs")
const Path = require("path")

const EXTENSIONS = ['.vert', '.frag']

if (process.argv.length < 4) {
  console.error(`
Usage:
  node copy-assets.js SRC DST

`)
  process.exit(1)
}

const srcRoot = Path.resolve(process.argv[2])
const dstRoot = Path.resolve(process.argv[3])
const copies = []

function copy(src, dst) {
  if (!FS.existsSync(dst)) {
    FS.mkdirSync(dst)
  }
  const files = FS.readdirSync(src)
  for (const file of files) {
    const path = Path.resolve(src, file)
    const stats = FS.statSync(path)
    if (stats.isDirectory()) {
      copy(
        Path.resolve(src, file),
        Path.resolve(dst, file)
      )
    } else {
      for (const ext of EXTENSIONS) {
        if (file.endsWith(ext)) {
          copies.push(FS.promises.copyFile(path, Path.resolve(dst, file)))
          break
        }
      }
    }
  }
}

copy(srcRoot, dstRoot)
Promise.all(copies).then(arr => {
  console.log('Number of assets:', arr.length)
})
