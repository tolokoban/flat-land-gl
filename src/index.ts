import Calc from './calc'
import Painter from './painter'
import Scene from './scene'

const FlatLand = {
    Calc,
    Painter,
    Scene,
}

export default FlatLand

// Global export for old vanilla Javascript users.
// tslint:disable-next-line:no-any
const global = window as { [key: string]: any }
global.FlatLandGL = FlatLand
