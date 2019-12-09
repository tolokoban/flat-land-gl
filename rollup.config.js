"use strict"

const Glsl = require('rollup-plugin-glsl')
const Resolve = require('rollup-plugin-node-resolve')
import {terser} from 'rollup-plugin-terser'

module.exports = {
  input: 'lib/index.js',
  output: {
    sourcemap: true,
    file: 'dist/flat-land-gl.js',
    format: 'iife',
    name: "FlatLandGL",
    plugins: [terser()]
  },
  plugins: [
    Resolve(),
    Glsl({
      include: [
        "**/*.vert",
        "**/*.frag"
      ]
    })
  ]
}
