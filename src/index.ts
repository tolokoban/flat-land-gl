import Package from '../package.json'
import Calc from './calc'
import Painter from './painter'
import Scene from './scene'

const FlatLand = {
    Calc,
    Painter,
    Scene,
    version: Package.version
}

export default FlatLand
