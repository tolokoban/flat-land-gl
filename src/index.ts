import Painter from "./painter"
import Scene from "./scene"

const FlatLand = {
    Painter,
    Scene
}

export default FlatLand

// Global export for old vanilla Javascript users.
window["FlatLand"] = FlatLand
