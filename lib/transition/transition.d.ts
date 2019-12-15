interface IStates {
    [key: string]: Float32Array;
}
export default class Transition {
    private readonly states;
    private readonly value;
    private srcValue;
    private dstValue;
    private startTime;
    private travelTime;
    constructor(dimension: number, states: IStates);
    getValue(time: number): Float32Array;
    /**
     * Transition to another state in a defined time.
     * @param  time - Current time in milliseconds.
     * @param  stateName - Name of the destination state.
     * @param  travelTime - Time (in msec) to reach the destination state.
     */
    exec(time: number, srcStateName: string, dstStateName: string, travelTime: number): void;
    getAlpha(time: number): number;
}
export {};
