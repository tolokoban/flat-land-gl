import Calc from "../calc"

// If we ask to got to another state in less than MIN_TRAVEL_TIME milliseconds,
// then then transition must be done right now.
const MIN_TRAVEL_TIME = 1

interface IStates {
  [key: string]: Float32Array
}

export default class Transition {
  private readonly states: IStates
  private readonly value: Float32Array
  private srcValue: Float32Array
  private dstValue: Float32Array
  private startTime = 0
  private travelTime = 0

  constructor(dimension: number, states: IStates) {
    this.value = new Float32Array(dimension)
    this.states = states
    for (const stateName of Object.keys(states)) {
      const state = states[stateName]
      if (state instanceof Float32Array) {
        const array = state as Float32Array
        if (array.length !== dimension) {
          throw Error(`State "${stateName}" must be of dimension ${dimension}, but its value is ${JSON.stringify(state)}!`)
        }
      } else {
        throw Error(`State "${stateName}" must be a Float32Array!`)
      }
    }
    const firstStateName = Object.keys(states)[0]
    this.srcValue = states[firstStateName]
    this.dstValue = states[firstStateName]
  }

  getValue(time: number) {
    const alpha = this.getAlpha(time)
    const src = 1 - alpha
    const dst = 1 - src
    const { srcValue, dstValue, value } = this
    for (let idx = 0; idx < srcValue.length; idx++) {
      value[idx] = src * srcValue[idx] + dst * dstValue[idx]
    }
    return this.value
  }

  /**
   * Transition to another state in a defined time.
   * @param  time - Current time in milliseconds.
   * @param  stateName - Name of the destination state.
   * @param  travelTime - Time (in msec) to reach the destination state.
   */
  exec(time: number, srcStateName: string, dstStateName: string, travelTime: number) {
    const srcState = this.states[srcStateName] as Float32Array
    if (!srcState) {
      throw Error(`Source state "${srcStateName}" does not exist! Try one of ${JSON.stringify(Object.keys(this.states))}.`)
    }
    const dstState = this.states[dstStateName] as Float32Array
    if (!dstState) {
      throw Error(`Destination state "${dstStateName}" does not exist! Try one of ${JSON.stringify(Object.keys(this.states))}.`)
    }
    this.startTime = time
    this.travelTime = travelTime
    this.srcValue = srcState
    this.dstValue = dstState
  }

  getAlpha(time: number) {
    const { startTime, travelTime } = this
    if (travelTime < MIN_TRAVEL_TIME) return 1
    return Calc.clamp((time - startTime) / travelTime)
  }
}
