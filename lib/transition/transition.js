import { __values } from "tslib";
import Calc from "../calc";
// If we ask to got to another state in less than MIN_TRAVEL_TIME milliseconds,
// then then transition must be done right now.
var MIN_TRAVEL_TIME = 1;
var Transition = /** @class */ (function () {
    function Transition(dimension, states) {
        var e_1, _a;
        this.startTime = 0;
        this.travelTime = 0;
        this.value = new Float32Array(dimension);
        this.states = states;
        try {
            for (var _b = __values(Object.keys(states)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var stateName = _c.value;
                var state = states[stateName];
                if (state instanceof Float32Array) {
                    var array = state;
                    if (array.length !== dimension) {
                        throw Error("State \"" + stateName + "\" must be of dimension " + dimension + ", but its value is " + JSON.stringify(state) + "!");
                    }
                }
                else {
                    throw Error("State \"" + stateName + "\" must be a Float32Array!");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var firstStateName = Object.keys(states)[0];
        this.srcValue = states[firstStateName];
        this.dstValue = states[firstStateName];
    }
    Transition.prototype.getValue = function (time) {
        var alpha = this.getAlpha(time);
        var src = 1 - alpha;
        var dst = 1 - src;
        var _a = this, srcValue = _a.srcValue, dstValue = _a.dstValue, value = _a.value;
        for (var idx = 0; idx < srcValue.length; idx++) {
            value[idx] = src * srcValue[idx] + dst * dstValue[idx];
        }
        return this.value;
    };
    /**
     * Transition to another state in a defined time.
     * @param  time - Current time in milliseconds.
     * @param  stateName - Name of the destination state.
     * @param  travelTime - Time (in msec) to reach the destination state.
     */
    Transition.prototype.exec = function (time, srcStateName, dstStateName, travelTime) {
        var srcState = this.states[srcStateName];
        if (!srcState) {
            throw Error("Source state \"" + srcStateName + "\" does not exist! Try one of " + JSON.stringify(Object.keys(this.states)) + ".");
        }
        var dstState = this.states[dstStateName];
        if (!dstState) {
            throw Error("Destination state \"" + dstStateName + "\" does not exist! Try one of " + JSON.stringify(Object.keys(this.states)) + ".");
        }
        this.startTime = time;
        this.travelTime = travelTime;
        this.srcValue = srcState;
        this.dstValue = dstState;
    };
    Transition.prototype.getAlpha = function (time) {
        var _a = this, startTime = _a.startTime, travelTime = _a.travelTime;
        if (travelTime < MIN_TRAVEL_TIME)
            return 1;
        return Calc.clamp((time - startTime) / travelTime);
    };
    return Transition;
}());
export default Transition;
//# sourceMappingURL=transition.js.map