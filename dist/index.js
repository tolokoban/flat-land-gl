
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./flat-land-gl.cjs.production.min.js')
} else {
  module.exports = require('./flat-land-gl.cjs.development.js')
}
