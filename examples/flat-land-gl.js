/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/atlas.ts":
/*!**********************!*\
  !*** ./src/atlas.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
var Atlas = /** @class */ (function () {
    function Atlas(gl, _name) {
        this.gl = gl;
        this._name = _name;
        this._ready = false;
        this._width = 0;
        this._height = 0;
        var texture = gl.createTexture();
        if (!texture) {
            throw new Error("Unable to create a new texture!");
        }
        this.texture = texture;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }
    Object.defineProperty(Atlas.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Atlas.prototype, "width", {
        get: function () { return this._width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Atlas.prototype, "height", {
        get: function () { return this._height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Atlas.prototype, "ready", {
        /**
         * Return `true` as soon as an image has been loaded into the graphic card.
         */
        get: function () { return this._ready; },
        enumerable: true,
        configurable: true
    });
    /**
     * Remove the texture from the graphic card memory.
     */
    Atlas.prototype.destroy = function () {
        this._ready = false;
        var _a = this, gl = _a.gl, texture = _a.texture;
        gl.deleteTexture(texture);
    };
    Atlas.prototype.activate = function (unit) {
        if (unit === void 0) { unit = 0; }
        var _a = this, gl = _a.gl, texture = _a.texture;
        var UNITS = [
            gl.TEXTURE0,
            gl.TEXTURE1,
            gl.TEXTURE2,
            gl.TEXTURE3,
            gl.TEXTURE4,
            gl.TEXTURE5,
            gl.TEXTURE6,
            gl.TEXTURE7,
        ];
        gl.activeTexture(UNITS[Math.abs(unit) % UNITS.length]);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    };
    Atlas.prototype.load = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._ready = false;
                return [2 /*return*/, this.loadImage(params.image)];
            });
        });
    };
    Atlas.prototype.loadImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                that = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var img = new Image();
                        that._ready = false;
                        img.onload = function () {
                            var gl = that.gl, texture = that.texture;
                            gl.bindTexture(gl.TEXTURE_2D, texture);
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                            that._ready = true;
                            that._width = img.width;
                            that._height = img.height;
                            resolve();
                        };
                        img.onerror = function () {
                            console.error("Unable to load image \"" + name + "\": ", url);
                            reject();
                        };
                        img.src = url;
                    })];
            });
        });
    };
    return Atlas;
}());
/* harmony default export */ __webpack_exports__["default"] = (Atlas);


/***/ }),

/***/ "./src/calc.ts":
/*!*********************!*\
  !*** ./src/calc.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var COS = new Float32Array(4096);
var SIN = new Float32Array(4096);
// Prepare acceleration table for COS and SIN.
for (var i = 0; i < 4096; i++) {
    var angle = Math.PI * i / 2048;
    COS[i] = Math.cos(angle);
    SIN[i] = Math.sin(angle);
}
/* harmony default export */ __webpack_exports__["default"] = ({ cos: cos, sin: sin });
/**
 * Fast cosine.
 * Angle is define between 0 and 4095.
 * * PI/2  <=>  1023
 * * PI  <=>  2047
 * * 3*PI/2  <=>  3071
 */
function cos(angle) {
    return COS[(angle | 0) & 4095];
}
/**
 * Fast sine.
 * Angle is define between 0 and 4095.
 * * PI/2  <=>  1023
 * * PI  <=>  2047
 * * 3*PI/2  <=>  3071
 */
function sin(angle) {
    return SIN[(angle | 0) & 4095];
}


/***/ }),

/***/ "./src/converter/string.ts":
/*!*********************************!*\
  !*** ./src/converter/string.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return castString; });
function castString(value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ""; }
    var t = typeof value;
    if (t === "number" && !isNaN(value)) {
        return "" + value;
    }
    if (t === "string") {
        return value;
    }
    return defaultValue;
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calc */ "./src/calc.ts");
/* harmony import */ var _painter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./painter */ "./src/painter/index.ts");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scene */ "./src/scene.ts");



var FlatLand = {
    Calc: _calc__WEBPACK_IMPORTED_MODULE_0__["default"],
    Painter: _painter__WEBPACK_IMPORTED_MODULE_1__["default"],
    Scene: _scene__WEBPACK_IMPORTED_MODULE_2__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (FlatLand);
// Global export for old vanilla Javascript users.
window["FlatLand"] = FlatLand;


/***/ }),

/***/ "./src/painter/background/background.ts":
/*!**********************************************!*\
  !*** ./src/painter/background/background.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _converter_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../converter/string */ "./src/converter/string.ts");
/* harmony import */ var _painter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../painter */ "./src/painter/painter.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var BackgroundPainter = /** @class */ (function (_super) {
    __extends(BackgroundPainter, _super);
    /**
     * params: { atlas, align }
     * - align: if undefined, the background will be centered.
     *          "R" means that the Right edge of the background is always visible.
     *          "L" means the same for Left.
     *          "T" for Top.
     *          "B" for "Bottom".
     */
    function BackgroundPainter(params) {
        var _this = _super.call(this, params) || this;
        var scene = params.scene, atlas = params.atlas;
        var atlasObj = scene.getAtlas(atlas);
        if (!atlasObj) {
            throw _this.fatal("Atlas \"" + atlas + "\" not found!");
        }
        _this.atlas = atlasObj;
        _this.prg = _this.createProgram({
            frag: FRAG,
            vert: getVert(Object(_converter_string__WEBPACK_IMPORTED_MODULE_0__["default"])(params.align).toUpperCase()),
        });
        var gl = scene.gl;
        var buff = gl.createBuffer();
        if (!buff) {
            throw _this.fatal("Not enough memory to create an array buffer!");
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 0, 0, 1, 1, 0, 1, 1,
        ]), gl.STATIC_DRAW);
        _this.buff = buff;
        return _this;
    }
    BackgroundPainter.prototype.render = function () {
        var _a = this, scene = _a.scene, prg = _a.prg, atlas = _a.atlas, buff = _a.buff;
        var gl = scene.gl;
        gl.enable(gl.DEPTH_TEST);
        prg.use();
        atlas.activate();
        var uniforms = prg;
        uniforms.$uniTexture = 0;
        prg.setUniform("uniAspectRatio", scene.width / scene.height);
        prg.bindAttribs(buff, "attXY");
        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    return BackgroundPainter;
}(_painter__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (BackgroundPainter);
function getVert(align) {
    var x = "";
    var y = "";
    if (align.indexOf("B") !== -1) {
        y = "location.y -= uniAspectRatio - 1.0;";
    }
    else if (align.indexOf("T") !== -1) {
        y = "location.y += uniAspectRatio - 1.0;";
    }
    if (align.indexOf("R") !== -1) {
        x = "location.x -= 1.0 / uniAspectRatio - 1.0;";
    }
    else if (align.indexOf("L") !== -1) {
        x = "location.x += 1.0 / uniAspectRatio - 1.0;";
    }
    return "uniform float uniAspectRatio;\nattribute vec2 attXY;\nvarying vec2 varUV;\n\nvoid main() {\n  varUV = attXY;\n  vec2 location = 2.0 * (attXY - vec2(0.5, 0.5));\n\n  if (uniAspectRatio > 1.0) {\n    location.y *= uniAspectRatio;" + y + "\n  } else {\n    location.x /= uniAspectRatio;" + x + "\n  }\n\n  gl_Position = vec4(location.x, -location.y, -1.0, 1.0);\n}";
}
var FRAG = "precision mediump float;\nuniform sampler2D uniTexture;\nvarying vec2 varUV;\n\nvoid main() {\n  vec4 color = texture2D( uniTexture, varUV );\n  gl_FragColor = color;\n}";


/***/ }),

/***/ "./src/painter/background/index.ts":
/*!*****************************************!*\
  !*** ./src/painter/background/index.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background */ "./src/painter/background/background.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _background__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/painter/clear.ts":
/*!******************************!*\
  !*** ./src/painter/clear.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webgl_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../webgl/color */ "./src/webgl/color.ts");
/* harmony import */ var _painter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./painter */ "./src/painter/painter.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Clear the screen by filling it with a plain color.
 * This color is defined by attributes red, gree, blue and alpha, which must be between 0 and 1.
 */


var ClearPainter = /** @class */ (function (_super) {
    __extends(ClearPainter, _super);
    function ClearPainter(params) {
        var _this = _super.call(this, params) || this;
        _this._red = 0.8;
        _this._green = 0.4;
        _this._blue = 0.2;
        _this._alpha = 1;
        _this.color = params.color || "#d72";
        return _this;
    }
    Object.defineProperty(ClearPainter.prototype, "red", {
        get: function () { return this._red; },
        set: function (v) { this._red = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClearPainter.prototype, "green", {
        get: function () { return this._green; },
        set: function (v) { this._green = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClearPainter.prototype, "blue", {
        get: function () { return this._blue; },
        set: function (v) { this._blue = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClearPainter.prototype, "alpha", {
        get: function () { return this._alpha; },
        set: function (v) { this._alpha = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClearPainter.prototype, "color", {
        get: function () {
            var color = new _webgl_color__WEBPACK_IMPORTED_MODULE_0__["default"]();
            color.R = this._red;
            color.G = this._green;
            color.B = this._blue;
            color.A = this._alpha;
            return color.stringify();
        },
        set: function (cssColor) {
            var color = new _webgl_color__WEBPACK_IMPORTED_MODULE_0__["default"](cssColor);
            this._red = color.R;
            this._green = color.G;
            this._blue = color.B;
            this._alpha = color.A;
        },
        enumerable: true,
        configurable: true
    });
    ClearPainter.prototype.render = function () {
        var gl = this.scene.gl;
        gl.clearColor(this._red, this._green, this._blue, this._alpha);
        gl.clear(gl.COLOR_BUFFER_BIT);
    };
    return ClearPainter;
}(_painter__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ClearPainter);


/***/ }),

/***/ "./src/painter/index.ts":
/*!******************************!*\
  !*** ./src/painter/index.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background */ "./src/painter/background/index.ts");
/* harmony import */ var _clear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clear */ "./src/painter/clear.ts");
/* harmony import */ var _painter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./painter */ "./src/painter/painter.ts");
/* harmony import */ var _sprites__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sprites */ "./src/painter/sprites/index.ts");




/* harmony default export */ __webpack_exports__["default"] = ({
    Background: _background__WEBPACK_IMPORTED_MODULE_0__["default"],
    Clear: _clear__WEBPACK_IMPORTED_MODULE_1__["default"],
    Painter: _painter__WEBPACK_IMPORTED_MODULE_2__["default"],
    Sprites: _sprites__WEBPACK_IMPORTED_MODULE_3__["default"],
});


/***/ }),

/***/ "./src/painter/painter.ts":
/*!********************************!*\
  !*** ./src/painter/painter.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webgl_program__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../webgl/program */ "./src/webgl/program.ts");
/**
 * This is a virtual painter from which all the other will inherit.
 */

var ID = 0;
var Painter = /** @class */ (function () {
    function Painter(params) {
        this._name = "" + ID++;
        if (!params.scene) {
            throw Error('Argument "params.scene" is mandatory!');
        }
        this.scene = params.scene;
        if (typeof params.name === "string" && params.name.length > 0) {
            this._name = params.name;
        }
        this.scene.$attachPainter(this);
    }
    Object.defineProperty(Painter.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Painter.prototype.destroy = function () {
        this.scene.$detachPainter(this.name);
    };
    Painter.prototype.createProgram = function (shaders, includes) {
        if (includes === void 0) { includes = {}; }
        return new _webgl_program__WEBPACK_IMPORTED_MODULE_0__["default"](this.scene.gl, shaders, includes);
    };
    Painter.prototype.fatal = function (message) {
        console.error("Fatal error in Painter \"" + this.name + "\":", message);
        return new Error(message);
    };
    return Painter;
}());
/* harmony default export */ __webpack_exports__["default"] = (Painter);


/***/ }),

/***/ "./src/painter/sprites/index.ts":
/*!**************************************!*\
  !*** ./src/painter/sprites/index.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sprites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprites */ "./src/painter/sprites/sprites.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _sprites__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./src/painter/sprites/sprite.ts":
/*!***************************************!*\
  !*** ./src/painter/sprites/sprite.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../calc */ "./src/calc.ts");
var __assign = (undefined && undefined.__assign) || function () {
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

var Sprite = /** @class */ (function () {
    function Sprite(index, getData, params) {
        this.getData = getData;
        this.extra = {};
        this.$index = 0;
        this.$index = index;
        var width = params.width || 50;
        var height = params.height || 50;
        this.params = __assign({ x: 0, y: 0, z: 0, width: width, height: height, originX: width / 2, originY: height / 2, u0: 0, v0: 0, u1: 1, v1: 1, scale: 1, angle: 0 }, params);
        this.update(this.params);
    }
    Object.defineProperty(Sprite.prototype, "x", {
        get: function () { return this.params.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "y", {
        get: function () { return this.params.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "z", {
        get: function () { return this.params.z; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "width", {
        get: function () { return this.params.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () { return this.params.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "originX", {
        get: function () { return this.params.originX; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "originY", {
        get: function () { return this.params.originY; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "u0", {
        get: function () { return this.params.u0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "v0", {
        get: function () { return this.params.v0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "u1", {
        get: function () { return this.params.u1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "v1", {
        get: function () { return this.params.v1; },
        enumerable: true,
        configurable: true
    });
    Sprite.prototype.update = function (newParams) {
        this.params = __assign(__assign({}, this.params), newParams);
        var _a = this, getData = _a.getData, $index = _a.$index, params = _a.params;
        var data = getData();
        var x = params.x, y = params.y, z = params.z, originX = params.originX, originY = params.originY, width = params.width, height = params.height, u0 = params.u0, v0 = params.v0, u1 = params.u1, v1 = params.v1, scale = params.scale, angle = params.angle;
        var xxA = -originX;
        var yyA = -originY;
        var xxB = xxA + width;
        var yyB = yyA;
        var xxC = xxA + width;
        var yyC = yyA + height;
        var xxD = xxA;
        var yyD = yyA + height;
        var xA = xxA * scale;
        var yA = yyA * scale;
        var xB = xxB * scale;
        var yB = yyB * scale;
        var xC = xxC * scale;
        var yC = yyC * scale;
        var xD = xxD * scale;
        var yD = yyD * scale;
        if ((angle | 0) !== 0) {
            var C = _calc__WEBPACK_IMPORTED_MODULE_0__["default"].cos(angle);
            var S = _calc__WEBPACK_IMPORTED_MODULE_0__["default"].sin(angle);
            xA = (xxA * C + yyA * S) * scale;
            yA = (yyA * C - xxA * S) * scale;
            xB = (xxB * C + yyB * S) * scale;
            yB = (yyB * C - xxB * S) * scale;
            xC = (xxC * C + yyC * S) * scale;
            yC = (yyC * C - xxC * S) * scale;
            xD = (xxD * C + yyD * S) * scale;
            yD = (yyD * C - xxD * S) * scale;
        }
        data[$index + 0] = xA + x;
        data[$index + 1] = yA + y;
        data[$index + 2] = z;
        data[$index + 3] = u0;
        data[$index + 4] = v0;
        data[$index + 5] = xB + x;
        data[$index + 6] = yB + y;
        data[$index + 7] = z;
        data[$index + 8] = u1;
        data[$index + 9] = v0;
        data[$index + 10] = xC + x;
        data[$index + 11] = yC + y;
        data[$index + 12] = z;
        data[$index + 13] = u1;
        data[$index + 14] = v1;
        data[$index + 15] = xD + x;
        data[$index + 16] = yD + y;
        data[$index + 17] = z;
        data[$index + 18] = u0;
        data[$index + 19] = v1;
    };
    return Sprite;
}());
/* harmony default export */ __webpack_exports__["default"] = (Sprite);


/***/ }),

/***/ "./src/painter/sprites/sprites.frag":
/*!******************************************!*\
  !*** ./src/painter/sprites/sprites.frag ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("precision mediump float;\nuniform sampler2D uniTexture;\nvarying vec2 varUV;\n\nvoid main() {\n  vec4 color = texture2D( uniTexture, varUV );\n  if (color.a < 1.0) discard;\n  gl_FragColor = color;\n}\n");

/***/ }),

/***/ "./src/painter/sprites/sprites.ts":
/*!****************************************!*\
  !*** ./src/painter/sprites/sprites.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _painter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../painter */ "./src/painter/painter.ts");
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprite */ "./src/painter/sprites/sprite.ts");
/* harmony import */ var _sprites_frag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sprites.frag */ "./src/painter/sprites/sprites.frag");
/* harmony import */ var _sprites_vert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sprites.vert */ "./src/painter/sprites/sprites.vert");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
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




// Allocations will be done by pieces of BLOCK Sprites.
var BLOCK = 64;
var NB_ATTRIBS = 6; // attXYZ and attUV and attAngle.
var NB_CORNERS = 4;
var CHUNK = NB_ATTRIBS * NB_CORNERS;
var SpritesPainter = /** @class */ (function (_super) {
    __extends(SpritesPainter, _super);
    function SpritesPainter(params) {
        var _this = _super.call(this, params) || this;
        _this.dataVert = new Float32Array(BLOCK * CHUNK);
        _this.sprites = [];
        _this.count = 0;
        _this.capacity = BLOCK;
        /**
         * Since the vertex array can be reallocated, we cannot give a reference to the Float32Array
         * to any Sprite. Instead, we will give them this function that will return the current array.
         */
        _this.getData = function () { return _this.dataVert; };
        var scene = params.scene, atlas = params.atlas;
        var atlasObj = scene.getAtlas(atlas);
        if (!atlasObj) {
            throw _this.fatal("Atlas \"" + atlas + "\" not found!");
        }
        _this.atlas = atlasObj;
        _this.prg = _this.createProgram({ vert: _sprites_vert__WEBPACK_IMPORTED_MODULE_3__["default"], frag: _sprites_frag__WEBPACK_IMPORTED_MODULE_2__["default"] });
        var gl = scene.gl;
        var buffVert = gl.createBuffer();
        if (!buffVert) {
            throw _this.fatal("Not enough memory to create an array buffer!");
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffVert);
        gl.bufferData(gl.ARRAY_BUFFER, _this.dataVert, gl.DYNAMIC_DRAW);
        _this.buffVert = buffVert;
        var buffElem = gl.createBuffer();
        if (!buffElem) {
            throw _this.fatal("Not enough memory to create an array buffer!");
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, createElements(BLOCK), gl.DYNAMIC_DRAW);
        _this.buffElem = buffElem;
        return _this;
    }
    SpritesPainter.prototype.createSprite = function (params) {
        var index = this.count * CHUNK;
        this.count++;
        if (this.count >= this.capacity) {
            // Allocate a new block.
            this.allocateNewBlock();
        }
        var _a = this.atlas, width = _a.width, height = _a.height;
        var sprite = new _sprite__WEBPACK_IMPORTED_MODULE_1__["default"](index, this.getData, __assign({ width: width,
            height: height }, params));
        this.sprites.push(sprite);
        return sprite;
    };
    SpritesPainter.prototype.render = function () {
        var _a = this, scene = _a.scene, prg = _a.prg, atlas = _a.atlas, buffVert = _a.buffVert, buffElem = _a.buffElem;
        var gl = scene.gl;
        // Update sprites' attributes.
        gl.bindBuffer(gl.ARRAY_BUFFER, buffVert);
        gl.bufferData(gl.ARRAY_BUFFER, this.dataVert, gl.DYNAMIC_DRAW);
        gl.enable(gl.DEPTH_TEST);
        prg.use();
        atlas.activate();
        var uniforms = prg;
        uniforms.$uniTexture = 0;
        uniforms.$uniWidth = scene.width;
        uniforms.$uniHeight = scene.height;
        prg.bindAttribs(buffVert, "attXYZ", "attUV");
        gl.bindBuffer(gl.ARRAY_BUFFER, buffVert);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem);
        gl.drawElements(gl.TRIANGLES, 6 * this.count, gl.UNSIGNED_SHORT, 0);
    };
    SpritesPainter.prototype.allocateNewBlock = function () {
        this.capacity += BLOCK;
        var scene = this.scene;
        var gl = scene.gl;
        var buffElem = this.buffElem;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, createElements(this.capacity), gl.DYNAMIC_DRAW);
        var dataVert = new Float32Array(this.capacity * CHUNK);
        dataVert.set(this.dataVert);
        this.dataVert = dataVert;
    };
    return SpritesPainter;
}(_painter__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (SpritesPainter);
/**
 * A--B
 * |  |
 * D--C
 */
function createElements(capacity) {
    var dataElem = new Uint16Array(6 * capacity);
    var i = 0;
    var a = 0;
    for (var k = 0; k < capacity; k++) {
        var b = a + 1;
        var c = a + 2;
        var d = a + 3;
        dataElem[i + 0] = a;
        dataElem[i + 1] = d;
        dataElem[i + 2] = b;
        dataElem[i + 3] = b;
        dataElem[i + 4] = d;
        dataElem[i + 5] = c;
        a += 4;
        i += 6;
    }
    return dataElem;
}


/***/ }),

/***/ "./src/painter/sprites/sprites.vert":
/*!******************************************!*\
  !*** ./src/painter/sprites/sprites.vert ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("uniform float uniWidth;\nuniform float uniHeight;\nattribute vec3 attXYZ;\nattribute vec2 attUV;\nvarying vec2 varUV;\n\nconst float RESOLUTION = 500.0;\nconst float INV_RESOLUTION = 1.0 / RESOLUTION;\n\nvoid main() {\n  varUV = attUV;\n  float widestSide = max(uniWidth, uniHeight);\n  float w = widestSide / uniWidth;\n  float h = widestSide / uniHeight;\n  float x = w * (attXYZ.x - RESOLUTION) * INV_RESOLUTION;\n  float y = h * (attXYZ.y - RESOLUTION) * INV_RESOLUTION;\n\n  gl_Position = vec4(x, -y, attXYZ.z, 1.0);\n}\n");

/***/ }),

/***/ "./src/scene.ts":
/*!**********************!*\
  !*** ./src/scene.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _atlas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./atlas */ "./src/atlas.ts");
/* harmony import */ var _webgl_resize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webgl/resize */ "./src/webgl/resize.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};


var FlatLand = /** @class */ (function () {
    function FlatLand(canvas) {
        var _this = this;
        this.resolution = 1;
        this.onAnimation = null;
        this.activePainters = [];
        this.isRendering = false;
        this._pointerX = -1024;
        this._pointerY = -1024;
        this.render = function (time) {
            var e_1, _a;
            if (_this.isRendering) {
                window.requestAnimationFrame(_this.render);
            }
            else {
                return;
            }
            var gl = _this.gl;
            Object(_webgl_resize__WEBPACK_IMPORTED_MODULE_1__["default"])(gl, _this.resolution);
            gl.clearDepth(-1);
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.depthFunc(gl.GEQUAL);
            try {
                try {
                    for (var _b = __values(_this.activePainters), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var painter = _c.value;
                        painter.render(time);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var onAnimation = _this.onAnimation;
                if (typeof onAnimation === "function") {
                    onAnimation(time);
                }
            }
            catch (ex) {
                console.error(ex);
                _this.stop();
                console.error("###############################");
                console.error("# Rendering has been stopped! #");
                console.error("###############################");
            }
        };
        canvas.addEventListener("mousemove", function (evt) {
            _this.computeCoords(evt);
        }, true);
        var gl = canvas.getContext("webgl", {
        // Specify WebGL options.
        });
        if (!gl) {
            throw new Error("Unable to create a WegGL context!");
        }
        this._gl = gl;
        this.atlases = new Map();
        this.painters = new Map();
    }
    Object.defineProperty(FlatLand.prototype, "gl", {
        get: function () {
            return this._gl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlatLand.prototype, "width", {
        /**
         * Visible width. Between 0 and 1024.
         */
        get: function () {
            return this.gl.drawingBufferWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlatLand.prototype, "height", {
        /**
         * Visible height. Between 0 and 1024.
         */
        get: function () {
            return this.gl.drawingBufferHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlatLand.prototype, "pointerX", {
        /**
         * Last X position of the pointer between 0 and 1024.
         */
        get: function () {
            return this._pointerX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlatLand.prototype, "pointerY", {
        /**
         * Last Y position of the pointer between 0 and 1024.
         */
        get: function () {
            return this._pointerY;
        },
        enumerable: true,
        configurable: true
    });
    FlatLand.prototype.getAtlas = function (name) {
        var atlases = this.atlases;
        return atlases.get(name) || null;
    };
    FlatLand.prototype.createAtlas = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var name, atlas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = params.name;
                        atlas = new _atlas__WEBPACK_IMPORTED_MODULE_0__["default"](this.gl, name);
                        this.atlases.set(name, atlas);
                        return [4 /*yield*/, atlas.load(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, atlas];
                }
            });
        });
    };
    FlatLand.prototype.destroyAtlas = function (name) {
        var atlases = this.atlases;
        var atlas = atlases.get(name);
        if (!atlas) {
            return false;
        }
        atlases.delete(name);
        atlas.destroy();
        return true;
    };
    /**
     * @hidden
     * If a painter with the same name already exists, return false and don't add the new one.
     */
    FlatLand.prototype.$attachPainter = function (painter) {
        if (this.painters.has(painter.name)) {
            return false;
        }
        this.painters.set(painter.name, painter);
        this.activePainters = this.activePainters
            .filter(function (p) { return p.name; });
        this.activePainters.push(painter);
        return true;
    };
    /**
     * @hidden
     */
    FlatLand.prototype.$detachPainter = function (name) {
        if (this.painters.has(name)) {
            return false;
        }
        this.painters.delete(name);
        this.activePainters = this.activePainters
            .filter(function (p) { return p.name; });
        return true;
    };
    /**
     * Start rendering.
     * When a frame is rendered, the function `onAnimation( time: number )` is called.
     */
    FlatLand.prototype.start = function () {
        if (this.isRendering) {
            return;
        }
        this.isRendering = true;
        window.requestAnimationFrame(this.render);
    };
    /**
     * Stop rendering.
     */
    FlatLand.prototype.stop = function () {
        this.isRendering = false;
    };
    FlatLand.prototype.computeCoords = function (evt) {
        var canvas = evt.target;
        var rect = canvas.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        var w = this.width;
        var h = this.height;
        if (w > h) {
            this._pointerX = 1024 * x / w;
            this._pointerY = 1024 * (0.5 * (1 - h / w) + (y / w));
        }
        else {
            this._pointerX = 1024 * (0.5 * (1 - w / h) + (x / h));
            this._pointerY = 1024 * y / h;
        }
    };
    return FlatLand;
}());
/* harmony default export */ __webpack_exports__["default"] = (FlatLand);


/***/ }),

/***/ "./src/webgl/color.ts":
/*!****************************!*\
  !*** ./src/webgl/color.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/**
 * Fast color manipulations.
 * Attributes R  (red), G  (green), B  (blue), A  (alpha), H  (hue), S
 * (saturation), and L (luminance) are all floats between 0 and 1.
 */
var TOTO = "useless";
var Color = /** @class */ (function () {
    function Color(codeCSS) {
        if (codeCSS === void 0) { codeCSS = "#000000"; }
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.H = 0;
        this.S = 0;
        this.L = 0;
        this.A = 1;
        this.parse(codeCSS);
    }
    Color.isValid = function (codeCSS) {
        if (typeof codeCSS !== "string") {
            return false;
        }
        if (codeCSS.charAt(0) !== "#") {
            return false;
        }
        switch (codeCSS.length) {
            case 4: // #RGB
            case 5: // #RGBA
            case 7: // #RRGGBB
            case 9: // #RRGGBBAA
                return true;
        }
        return false;
    };
    Color.normalize = function (codeCSS) {
        var color = new Color(codeCSS);
        return color.stringify();
    };
    Color.luminance = function (codeCSS) {
        var color = new Color(codeCSS);
        return color.luminance();
    };
    /**
     * Returns 1 for bright colors and 0 for dark colors.
     */
    Color.luminanceStep = function (codeCSS) {
        var color = new Color(codeCSS);
        return color.luminanceStep();
    };
    Color.fromArrayRGB = function (rgb) {
        var _a = __read(rgb, 3), R = _a[0], G = _a[1], B = _a[2];
        return this.newRGB(R, G, B);
    };
    Color.fromArrayRGBA = function (rgba) {
        var _a = __read(rgba, 4), R = _a[0], G = _a[1], B = _a[2], A = _a[3];
        return this.newRGBA(R, G, B, A);
    };
    /**
     * Mix two colors. alpha should be between 0 and 1,
     * but there is no check on this.
     * If alpha is 0, the resulting color is `color1`,
     * if alpha is 1, the resulting color is `color2`.
     */
    Color.mix = function (color1, color2, alpha) {
        if (alpha === void 0) { alpha = .5; }
        var beta = 1 - alpha;
        return Color.newRGBA(alpha * color2.R + beta * color1.R, alpha * color2.G + beta * color1.G, alpha * color2.B + beta * color1.B, alpha * color2.A + beta * color1.A);
    };
    /**
     * If `colors` has only two elements, this method is the same as `mix()`.
     * Otherwise, it will perform a linear blending through the colors.
     * If alpha is 0, the resulting color is `colors[0]`,
     * If alpha is 1, the resulting color is `colors[colors.length - 1]`,
     */
    Color.ramp = function (colors, alpha) {
        if (alpha === void 0) { alpha = .5; }
        if (colors.length === 0) {
            return Color.newBlack();
        }
        if (colors.length === 1) {
            return colors[0];
        }
        var spacesCount = colors.length - 1;
        var firstColorIndex = Math.floor(alpha * spacesCount);
        var color1 = colors[firstColorIndex];
        if (firstColorIndex === spacesCount) {
            return color1;
        }
        var color2 = colors[firstColorIndex + 1];
        var translatedAlpha = firstColorIndex + alpha / spacesCount;
        return Color.mix(color1, color2, translatedAlpha);
    };
    Color.newBlack = function () {
        return Color.newRGB(0, 0, 0);
    };
    Color.newWhite = function () {
        return Color.newRGB(1, 1, 1);
    };
    /**
     * Create a new Color instance base on R,G,B channels.
     *
     * @param   {number} red - Value between 0 and 1.
     * @param   {number} green - Value between 0 and 1.
     * @param   {number} blue - Value between 0 and 1.
     * @returns {Color} New instance of Color.
     */
    Color.newRGB = function (red, green, blue) {
        var color = new Color();
        color.R = red;
        color.G = green;
        color.B = blue;
        color.A = 1;
        return color;
    };
    /**
     * Create a new Color instance base on R,G,B,A channels.
     *
     * @param   {number} red - Value between 0 and 1.
     * @param   {number} green - Value between 0 and 1.
     * @param   {number} blue - Value between 0 and 1.
     * @param   {number} alpha - Value between 0 and 1.
     * @returns {Color} New instance of Color.
     */
    Color.newRGBA = function (red, green, blue, alpha) {
        var color = new Color();
        color.R = red;
        color.G = green;
        color.B = blue;
        color.A = alpha;
        return color;
    };
    Color.prototype.toArrayRGB = function () {
        return [this.R, this.G, this.B];
    };
    Color.prototype.toArrayRGBA = function () {
        return [this.R, this.G, this.B, this.A];
    };
    /**
     * Parse a color writtent in CSS syntax.
     *
     * @param   {string} code - CSS color.
     * @returns {boolean} `true` if the color has valid syntax.
     */
    Color.prototype.parse = function (code) {
        if (code === void 0) { code = "#000000"; }
        var input = code.trim().toUpperCase();
        if (this.parseHexa.call(this, input)) {
            return true;
        }
        if (this.parseRGB.call(this, input)) {
            return true;
        }
        if (this.parseRGBA.call(this, input)) {
            return true;
        }
        if (this.parseHSL.call(this, input)) {
            return true;
        }
        // @TODO parseHSLA.
        return false;
    };
    /**
     * @see https://en.wikipedia.org/wiki/Grayscale
     * @this Color
     * @returns {undefined}
     */
    Color.prototype.luminance = function () {
        return (0.2126 * this.R) + (0.7152 * this.G) + (0.0722 * this.B);
    };
    /**
     * @returns {integer} 0 if the color is dark and 1 if it is light.
     */
    Color.prototype.luminanceStep = function () {
        return this.luminance() < .6 ? 0 : 1;
    };
    /**
     * @this Color
     * @returns {string} String value of the color. `#fd45a7`.
     */
    Color.prototype.stringify = function () {
        var color = hexa2(this.R * 255) + hexa2(this.G * 255) + hexa2(this.B * 255);
        if (this.A < 1) {
            color += hexa2(this.A * 255);
        }
        return "#" + color;
    };
    Color.prototype.copy = function () {
        var newColor = new Color();
        newColor.R = this.R;
        newColor.G = this.G;
        newColor.B = this.B;
        newColor.A = this.A;
        newColor.H = this.H;
        newColor.S = this.S;
        newColor.L = this.L;
        return newColor;
    };
    /**
     * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
     * @this Color
     * @returns {undefined}
     */
    Color.prototype.hsl2rgb = function () {
        var H = 6 * this.H;
        var S = this.S;
        var L = this.L;
        var chroma = (1 - Math.abs(2 * L - 1)) * S;
        var x = chroma * (1 - Math.abs(H % 2 - 1));
        var R = 0;
        var G = 0;
        var B = 0;
        if (H < 3) {
            if (H < 1) {
                R = chroma;
                G = x;
                B = 0;
            }
            else if (H < 2) {
                R = x;
                G = chroma;
                B = 0;
            }
            else {
                // H == 2.
                R = 0;
                G = chroma;
                B = x;
            }
        }
        else if (H < 4) {
            R = 0;
            G = x;
            B = chroma;
        }
        else if (H < 5) {
            R = x;
            G = 0;
            B = chroma;
        }
        else {
            R = chroma;
            G = 0;
            B = x;
        }
        var shift = L - chroma * 0.5;
        this.R = R + shift;
        this.G = G + shift;
        this.B = B + shift;
    };
    Color.prototype.rgb2hsl = function () {
        var R = this.R;
        var G = this.G;
        var B = this.B;
        var min = Math.min(R, G, B);
        var max = Math.max(R, G, B);
        var delta = max - min;
        this.L = 0.5 * (max + min);
        if (delta < 0.000001) {
            this.H = 0;
            this.S = 0;
        }
        else {
            this.S = delta / (1 - Math.abs(2 * this.L - 1));
            if (max === R) {
                if (G >= B) {
                    this.H = INV6 * ((G - B) / delta);
                }
                else {
                    this.H = 1 - INV6 * ((B - G) / delta);
                }
            }
            else if (max === G) {
                this.H = INV6 * (2 + (B - R) / delta);
            }
            else {
                this.H = INV6 * (4 + (R - G) / delta);
            }
        }
    };
    Color.prototype.parseHexa = function (text) {
        if (text.charAt(0) !== "#") {
            return false;
        }
        var R = 0;
        var G = 0;
        var B = 0;
        var A = 1;
        switch (text.length) {
            case 4:
                R = parseInt(text.charAt(1), 16) * INV15;
                G = parseInt(text.charAt(2), 16) * INV15;
                B = parseInt(text.charAt(3), 16) * INV15;
                break;
            case 5:
                R = parseInt(text.charAt(1), 16) * INV15;
                G = parseInt(text.charAt(2), 16) * INV15;
                B = parseInt(text.charAt(3), 16) * INV15;
                A = parseInt(text.charAt(4), 16) * INV15;
                break;
            case 7:
                R = parseInt(text.substr(1, 2), 16) * INV255;
                G = parseInt(text.substr(3, 2), 16) * INV255;
                B = parseInt(text.substr(5, 2), 16) * INV255;
                break;
            case 9:
                R = parseInt(text.substr(1, 2), 16) * INV255;
                G = parseInt(text.substr(3, 2), 16) * INV255;
                B = parseInt(text.substr(5, 2), 16) * INV255;
                A = parseInt(text.substr(7, 2), 16) * INV255;
                break;
            default:
        }
        if (isNaN(R) || isNaN(G) || isNaN(B) || isNaN(A)) {
            this.R = this.G = this.B = this.A = 0;
        }
        else {
            this.R = R;
            this.G = G;
            this.B = B;
            this.A = A;
        }
        return true;
    };
    /**
     * @param   {string} text - `rgb(200, 140, 50)`
     * @returns {boolean} `true` if `text` is a valid `rgb()` syntax.
     */
    Color.prototype.parseRGB = function (text) {
        var m = RX_RGB.exec(text);
        if (!m) {
            return false;
        }
        this.R = clamp01(parseInt(m[1], 10) * INV255);
        this.G = clamp01(parseInt(m[2], 10) * INV255);
        this.B = clamp01(parseInt(m[3], 10) * INV255);
        this.A = 1;
        return true;
    };
    /**
     * @param   {string} text - `rgba(200, 140, 50, 0.5)`
     * @returns {boolean} `true` if `text` is a valid `rgba()` syntax.
     */
    Color.prototype.parseRGBA = function (text) {
        var m = RX_RGBA.exec(text);
        if (!m) {
            return false;
        }
        this.R = clamp01(parseInt(m[1], 10) * INV255);
        this.G = clamp01(parseInt(m[2], 10) * INV255);
        this.B = clamp01(parseInt(m[3], 10) * INV255);
        this.A = clamp01(parseFloat(m[4]));
        return true;
    };
    /**
     * @param   {string} text - `hsl(200, 140, 50)`
     * @returns {boolean} `true` if `text` is a valid `hsl()` syntax.
     */
    Color.prototype.parseHSL = function (text) {
        var m = RX_HSL.exec(text);
        if (!m) {
            return false;
        }
        this.H = clamp01(parseInt(m[1], 10) * INV359);
        this.S = clamp01(parseInt(m[2], 10) * INV99);
        this.L = clamp01(parseInt(m[3], 10) * INV99);
        this.A = 1;
        this.hsl2rgb();
        return true;
    };
    return Color;
}());
/* harmony default export */ __webpack_exports__["default"] = (Color);
var INV6 = 1 / 6;
var INV15 = 1 / 15;
var INV99 = 1 / 99;
var INV255 = 1 / 255;
var INV359 = 1 / 359;
var RX_RGB = /^RGB[\s(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/;
var RX_RGBA = /^RGBA[\s(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)[^0-9.]+([0-9.]+)/;
var RX_HSL = /^HSL[\s(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/;
function clamp01(value) {
    if (value < 0) {
        return 0;
    }
    if (value > 1) {
        return 1;
    }
    return value;
}
function hexa2(value) {
    var out = Math.floor(value).toString(16);
    if (out.length < 2) {
        out = "0" + out;
    }
    return out;
}


/***/ }),

/***/ "./src/webgl/program.ts":
/*!******************************!*\
  !*** ./src/webgl/program.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var BPE = (new Float32Array()).BYTES_PER_ELEMENT;
/**
 * Creating  a  WebGL  program  for shaders  is  painful.  This  class
 * simplifies the process.
 *
 * @class Program
 *
 * Object properties starting with `$` are WebGL uniforms or attributes.
 * Uniforms behave as expected: you can read/write a value.
 * Attributes when read, return the location. And when written, enable/disabled
 * this attribute. So you read integers and writte booleans.
 *
 * @param gl - WebGL context.
 * @param codes  - Object  with two  mandatory attributes:  `vert` for
 * vertex shader and `frag` for fragment shader.
 * @param  includes  -  (optional)  If  defined,  the  `#include  foo`
 * directives  of  shaders   will  be  replaced  by   the  content  of
 * `includes.foo`.
 */
var Program = /** @class */ (function () {
    function Program(gl, codes, includes) {
        if (includes === void 0) { includes = {}; }
        if (typeof codes.vert !== "string") {
            throw Error("[webgl.program] Missing attribute `vert` in argument `codes`!");
        }
        if (typeof codes.frag !== "string") {
            throw Error("[webgl.program] Missing attribute `frag` in argument `codes`!");
        }
        codes = parseIncludes(codes, includes);
        this.gl = gl;
        Object.freeze(this.gl);
        this.BPE = BPE;
        Object.freeze(this.BPE);
        this._typesNamesLookup = getTypesNamesLookup(gl);
        var shaderProgram = gl.createProgram();
        if (!shaderProgram) {
            throw Error("Unable to create WebGLProgram!");
        }
        this.program = shaderProgram;
        var vertShader = getVertexShader(gl, codes.vert);
        gl.attachShader(shaderProgram, vertShader);
        var fragShader = getFragmentShader(gl, codes.frag);
        gl.attachShader(shaderProgram, fragShader);
        gl.linkProgram(shaderProgram);
        this.use = function () { gl.useProgram(shaderProgram); };
        this.attribs = this.createAttributes();
        this.uniforms = this.createUniforms();
    }
    Program.prototype.use = function () {
        this.gl.useProgram(this.program);
    };
    Program.prototype.getTypeName = function (typeId) {
        return this._typesNamesLookup[typeId];
    };
    Program.prototype.bindAttribs = function (buffer) {
        var e_1, _a, e_2, _b;
        var names = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            names[_i - 1] = arguments[_i];
        }
        var that = this;
        var gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        var totalSize = 0;
        try {
            for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                var name_1 = names_1_1.value;
                var attrib = that.attribs[name_1];
                if (!attrib) {
                    throw Error("Cannot find attribute \"" + name_1 + "\"!\n" +
                        "It may be not active because unused in the shader.\n" +
                        "Available attributes are: " +
                        Object.keys(that.attribs).map(function (n) {
                            return '"' + n + '"';
                        }).join(", ") + (" (" + that.attribs.length + ")"));
                }
                totalSize += (attrib.size * attrib.length) * BPE;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var offset = 0;
        try {
            for (var names_2 = __values(names), names_2_1 = names_2.next(); !names_2_1.done; names_2_1 = names_2.next()) {
                var name_2 = names_2_1.value;
                var attrib = that.attribs[name_2];
                gl.enableVertexAttribArray(attrib.location);
                gl.vertexAttribPointer(attrib.location, attrib.size * attrib.length, gl.FLOAT, false, // No normalisation.
                totalSize, offset);
                offset += (attrib.size * attrib.length) * BPE;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (names_2_1 && !names_2_1.done && (_b = names_2.return)) _b.call(names_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Program.prototype.setUniform = function (name, value) {
        var id = "$" + name;
        var map = this;
        map[id] = value;
    };
    Program.prototype.createAttributes = function () {
        var _a = this, gl = _a.gl, program = _a.program;
        var attribs = {};
        var attribsCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (var index = 0; index < attribsCount; index++) {
            var item = gl.getActiveAttrib(program, index);
            if (!item) {
                continue;
            }
            item.typeName = this.getTypeName(item.type);
            item.length = this.getSize(gl, item);
            item.location = gl.getAttribLocation(program, item.name);
            attribs[item.name] = item;
            Object.defineProperty(this, "$" + item.name, {
                value: item.location,
                writable: false,
                enumerable: true,
                configurable: false,
            });
        }
        return attribs;
    };
    Program.prototype.getSize = function (gl, item) {
        switch (item.type) {
            case gl.FLOAT_VEC4:
                return 4;
            case gl.FLOAT_VEC3:
                return 3;
            case gl.FLOAT_VEC2:
                return 2;
            case gl.FLOAT:
                return 1;
            default:
                throw Error("[webgl.program:getSize] I don't know the size of the attribute '" + item.name +
                    "' because I don't know the type " + this.getTypeName(item.type) + "!");
        }
    };
    Program.prototype.createUniforms = function () {
        var _a = this, gl = _a.gl, program = _a.program;
        var uniforms = {};
        var uniformsCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (var index = 0; index < uniformsCount; index++) {
            var item = gl.getActiveUniform(program, index);
            if (!item) {
                continue;
            }
            var location_1 = gl.getUniformLocation(program, item.name);
            if (!location_1) {
                continue;
            }
            uniforms[item.name] = location_1;
            Object.defineProperty(this, "$" + item.name, {
                set: this.createUniformSetter(item, uniforms[item.name], this._typesNamesLookup),
                get: this.createUniformGetter(item),
                enumerable: true,
                configurable: false,
            });
        }
        return uniforms;
    };
    Program.prototype.createUniformSetter = function (item, nameGL, lookup) {
        var gl = this.gl;
        var nameJS = "_$" + item.name;
        switch (item.type) {
            case gl.BYTE:
            case gl.UNSIGNED_BYTE:
            case gl.SHORT:
            case gl.UNSIGNED_SHORT:
            case gl.INT:
            case gl.UNSIGNED_INT:
            case gl.SAMPLER_2D: // For textures, we specify the texture unit.
                if (item.size === 1) {
                    return function (v) {
                        gl.uniform1i(nameGL, v);
                        this[nameJS] = v;
                    };
                }
                else {
                    return function (v) {
                        gl.uniform1iv(nameGL, v);
                        this[nameJS] = v;
                    };
                }
            case gl.FLOAT:
                if (item.size === 1) {
                    return function (v) {
                        gl.uniform1f(nameGL, v);
                        this[nameJS] = v;
                    };
                }
                else {
                    return function (v) {
                        gl.uniform1fv(nameGL, v);
                        this[nameJS] = v;
                    };
                }
            case gl.FLOAT_VEC2:
                if (item.size === 1) {
                    return function (v) {
                        gl.uniform2fv(nameGL, v);
                        this[nameJS] = v;
                    };
                }
                else {
                    throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC2 in uniform `" +
                        item.name + "'!'");
                }
            case gl.FLOAT_VEC3:
                if (item.size === 1) {
                    return function (v) {
                        gl.uniform3fv(nameGL, v);
                        this[nameJS] = v;
                    };
                }
                else {
                    throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC3 in uniform `" +
                        item.name + "'!'");
                }
            case gl.FLOAT_VEC4:
                if (item.size === 1) {
                    return function (v) {
                        gl.uniform4fv(nameGL, v);
                        this[nameJS] = v;
                    };
                }
                else {
                    throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC4 in uniform `" +
                        item.name + "'!'");
                }
            case gl.FLOAT_MAT3:
                if (item.size === 1) {
                    return function (v) {
                        gl.uniformMatrix3fv(nameGL, false, v);
                        this[nameJS] = v;
                    };
                }
                else {
                    throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT3 in uniform `" +
                        item.name + "'!'");
                }
            case gl.FLOAT_MAT4:
                if (item.size === 1) {
                    return function (v) {
                        gl.uniformMatrix4fv(nameGL, false, v);
                        this[nameJS] = v;
                    };
                }
                else {
                    throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT4 in uniform `" +
                        item.name + "'!'");
                }
            default:
                throw Error("[webgl.program.createWriter] Don't know how to deal with uniform `" +
                    item.name + "` of type " + lookup[item.type] + "!");
        }
    };
    Program.prototype.createUniformGetter = function (item) {
        var name = "_$" + item.name;
        return function () {
            return this[name];
        };
    };
    return Program;
}());
/* harmony default export */ __webpack_exports__["default"] = (Program);
/**
 * This is a preprocessor for shaders.
 * Directives  `#include`  will be  replaced  by  the content  of  the
 * correspondent attribute in `includes`.
 */
function parseIncludes(codes, includes) {
    return {
        vert: parseInclude(codes.vert, includes),
        frag: parseInclude(codes.frag, includes),
    };
}
function parseInclude(code, includes) {
    return code.split("\n").map(function (line) {
        if (line.trim().substr(0, 8) !== "#include") {
            return line;
        }
        var pos = line.indexOf("#include") + 8;
        var includeName = line.substr(pos).trim();
        // We accept all this systaxes:
        // #include foo
        // #include 'foo'
        // #include <foo>
        // #include "foo"
        if ("'<\"".indexOf(includeName.charAt(0)) > -1) {
            includeName = includeName.substr(1, includeName.length - 2);
        }
        var snippet = includes[includeName];
        if (typeof snippet !== "string") {
            console.error("Include <" + includeName + "> not found in ", includes);
            throw Error("Include not found in shader: " + includeName);
        }
        return snippet;
    }).join("\n");
}
function getShader(type, gl, code) {
    if (type !== gl.VERTEX_SHADER && type !== gl.FRAGMENT_SHADER) {
        throw Error("Type must be VERTEX_SHADER or FRAGMENT_SHADER!");
    }
    var shader = gl.createShader(type);
    if (!shader) {
        throw Error("Unable to create a " + (type === gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT") + " shader!");
    }
    gl.shaderSource(shader, code);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.info("Here is your buggy shader's code:");
        console.info(code);
        console.error("An error occurred compiling the shader: " + gl.getShaderInfoLog(shader));
        throw Error("Unable to create a " + (type === gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT") + " shader!");
    }
    return shader;
}
function getFragmentShader(gl, code) {
    return getShader(gl.FRAGMENT_SHADER, gl, code);
}
function getVertexShader(gl, code) {
    return getShader(gl.VERTEX_SHADER, gl, code);
}
function getTypesNamesLookup(gl) {
    var lookup = {};
    for (var k in gl) {
        if (k !== k.toUpperCase()) {
            continue;
        }
        var v = gl[k];
        if (typeof v === "number") {
            lookup[v] = k;
        }
    }
    return lookup;
}


/***/ }),

/***/ "./src/webgl/resize.ts":
/*!*****************************!*\
  !*** ./src/webgl/resize.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Resolution in CSS pixels. If omitted, the real resolution
 * of the device is taken. On smartphones, for instance,
 * the resolution is often greater than 1.
 *
 * Return `true` if the size has changed.
 */
/* harmony default export */ __webpack_exports__["default"] = (function (gl, resolution) {
    if (resolution === void 0) { resolution = 0; }
    if (resolution <= 0) {
        resolution = window.devicePixelRatio;
    }
    var canvas = gl.canvas;
    var displayWidth = Math.floor(canvas.clientWidth * resolution);
    var displayHeight = Math.floor(canvas.clientHeight * resolution);
    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth ||
        canvas.height !== displayHeight) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
        return true;
    }
    return false;
});


/***/ })

/******/ });
//# sourceMappingURL=flat-land-gl.js.map