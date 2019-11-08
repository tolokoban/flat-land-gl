var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Program from './webgl/program';
import { fetchAssets } from './webgl/tools';
import FrameVertexShader from './shader/frame.vert';
import FrameFragmentShader from './shader/frame.frag';
var FlatLand = /** @class */ (function () {
    function FlatLand(canvas) {
        var _this = this;
        this.canvas = canvas;
        this.isRendering = false;
        this.asyncActions = [];
        this.isProcessingAsynActions = false;
        this.render = function (time) {
            if (_this.isRendering)
                window.requestAnimationFrame(_this.render);
            else
                return;
            // @TODO
        };
        var gl = canvas.getContext("webgl", {
        // Specify WebGL options.
        });
        if (!gl)
            throw "Unable to create a WegGL context!";
        this.gl = gl;
        this.atlases = new Map();
        this.programs = new Map();
        this.pushAsyncAction({
            type: "program",
            name: "_frame",
            vertURL: FrameVertexShader,
            fragURL: FrameFragmentShader
        });
    }
    FlatLand.prototype.pushAsyncAction = function (action) {
        this.asyncActions.push(action);
        if (!this.isProcessingAsynActions) {
            window.requestAnimationFrame(this.processAsyncActions);
        }
    };
    FlatLand.prototype.processAsyncActions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isProcessingAsynActions = true;
                        _a.label = 1;
                    case 1:
                        if (!(this.asyncActions.length > 0)) return [3 /*break*/, 4];
                        action = this.asyncActions.shift();
                        if (!action)
                            return [3 /*break*/, 1];
                        if (!(action.type === "atlas")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.processAsyncActionAtlas(action)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FlatLand.prototype.processAsyncActionAtlas = function (action) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    FlatLand.prototype.processAsyncActionProgram = function (action) {
        return __awaiter(this, void 0, void 0, function () {
            var shaders, prg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchAssets({
                            vert: action.vertURL,
                            frag: action.fragURL
                        })];
                    case 1:
                        shaders = _a.sent();
                        prg = new Program(shaders);
                        this.programs.set('_frame', prg);
                        return [2 /*return*/];
                }
            });
        });
    };
    FlatLand.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.isInitialized)
                    return [2 /*return*/];
                this.initBuff();
                this.isInitialized = true;
                return [2 /*return*/];
            });
        });
    };
    FlatLand.prototype.initBuff = function () {
    };
    FlatLand.prototype.createFrame = function (opt) {
        this.ensureInit();
        if (!this.textures.has(opt.image)) {
            throw Error("[flat-land-gl/createFrame()] Image \"\" does not exist yet!");
        }
        var prg = this.programs.get("_frame");
        var frame = __assign(__assign({ x: 0, y: 0, z: 0, width: 300, height: 200, visible: true }, opt), { $: {
                texture: this.textures.gt(opt.image),
                program: prg
            } });
        this.frames.push(frame);
        return frame;
    };
    FlatLand.prototype.start = function () {
        if (this.isRendering)
            return;
        this.isRendering = true;
        window.requestAnimationFrame(this.render);
    };
    FlatLand.prototype.stop = function () {
        this.isRendering = false;
    };
    return FlatLand;
}());
export default FlatLand;
function sleep(timeInMilliseconds) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return window.setTimeout(resolve, timeInMilliseconds); })];
        });
    });
}
//# sourceMappingURL=flat-land.js.map