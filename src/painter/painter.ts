/**
 * This is a virtual painter from which all the other will inherit.
 */

import Scene from '../scene'

export default class Painter {
    constructor(protected _name: string, protected scene: Scene) {}

    get name() { return this._name }

    render(time: number) {}
}
