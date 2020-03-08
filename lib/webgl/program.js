import { __values } from "tslib";
var BPE = Float32Array.BYTES_PER_ELEMENT;
var DIM1 = 1;
var DIM2 = 2;
var DIM3 = 3;
var DIM4 = 4;
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
    function Program(gl, _codes, includes) {
        if (includes === void 0) { includes = {}; }
        var codes = parseIncludes(_codes, includes);
        this.gl = gl;
        Object.freeze(this.gl);
        this.BPE = BPE;
        Object.freeze(this.BPE);
        this._typesNamesLookup = getTypesNamesLookup(gl);
        var shaderProgram = gl.createProgram();
        if (!shaderProgram) {
            throw Error('Unable to create WebGLProgram!');
        }
        this.program = shaderProgram;
        var vertShader = getVertexShader(gl, codes.vert);
        gl.attachShader(shaderProgram, vertShader);
        var fragShader = getFragmentShader(gl, codes.frag);
        gl.attachShader(shaderProgram, fragShader);
        gl.linkProgram(shaderProgram);
        this.use = function () {
            gl.useProgram(shaderProgram);
        };
        this.attribs = this.createAttributes();
        this.uniforms = {};
        this.uniformsLocation = this.createUniformsLocation();
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
                    throw Error("Cannot find attribute \"" + name_1 + "!\nIt may be not active because unused in the shader.\nAvailable attributes are: " + Object.keys(that.attribs)
                        .map(function (n) {
                        return "\"" + n + "\"";
                    })
                        .join(', ') + " (" + String(that.attribs.length) + ")");
                }
                totalSize += attrib.size * attrib.length * BPE;
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
                offset += attrib.size * attrib.length * BPE;
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
        var _a = this, uniforms = _a.uniforms, uniformsLocation = _a.uniformsLocation;
        if (typeof uniformsLocation[name] === 'undefined') {
            console.error("Uniform \"" + name + "\" does not exist in this WebGL Program!");
            var uniformsName = Object.keys(uniformsLocation);
            if (uniformsName.length === 0) {
                console.error("Actually, this program has no uniform at all.");
            }
            else {
                console.error("Available uniforms are:", uniformsName.join(", "));
            }
            throw Error("Uniform \"" + name + "\" was ot found!");
        }
        uniforms[name] = value;
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
            Object.defineProperty(this, "" + item.name, {
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
                return DIM4;
            case gl.FLOAT_VEC3:
                return DIM3;
            case gl.FLOAT_VEC2:
                return DIM2;
            case gl.FLOAT:
                return DIM1;
            default:
                throw Error("[webgl.program:getSize] I don't know the size of the attribute \"" + item.name + "\" because I don't know the type \"" + this.getTypeName(item.type) + "\"!");
        }
    };
    Program.prototype.createUniformsLocation = function () {
        var _a = this, gl = _a.gl, program = _a.program, uniforms = _a.uniforms;
        var uniformsLocation = {};
        var uniformsCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (var index = 0; index < uniformsCount; index++) {
            var item = gl.getActiveUniform(program, index);
            if (!item) {
                continue;
            }
            var name_3 = sanitizeUniformName(item.name);
            var location_1 = gl.getUniformLocation(program, item.name);
            if (!location_1) {
                continue;
            }
            uniformsLocation[name_3] = location_1;
            Object.defineProperty(uniforms, "" + name_3, {
                set: this.createUniformSetter(item, uniformsLocation[name_3], this._typesNamesLookup),
                get: this.createUniformGetter(item),
                enumerable: true,
                configurable: false,
            });
        }
        return uniformsLocation;
    };
    Program.prototype.createUniformSetter = function (item, nameGL, lookup) {
        var gl = this.gl;
        var name = sanitizeUniformName(item.name);
        var nameJS = "_" + name;
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
                    throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC2 in uniform \"" + item.name + "\"!");
                }
            case gl.FLOAT_VEC3:
                if (item.size === 1) {
                    return function (v) {
                        gl.uniform3fv(nameGL, v);
                        this[nameJS] = v;
                    };
                }
                else {
                    throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC3 in uniform \"" + item.name + "\"!");
                }
            case gl.FLOAT_VEC4:
                if (item.size === 1) {
                    return function (v) {
                        gl.uniform4fv(nameGL, v);
                        this[nameJS] = v;
                    };
                }
                else {
                    throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC4 in uniform \"" + item.name + "\"!");
                }
            case gl.FLOAT_MAT3:
                if (item.size === 1) {
                    return function (v) {
                        gl.uniformMatrix3fv(nameGL, false, v);
                        this[nameJS] = v;
                    };
                }
                else {
                    throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT3 in uniform \"" + item.name + "\"!");
                }
            case gl.FLOAT_MAT4:
                if (item.size === 1) {
                    return function (v) {
                        gl.uniformMatrix4fv(nameGL, false, v);
                        this[nameJS] = v;
                    };
                }
                else {
                    throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT4 in uniform \"" + item.name + "\"!");
                }
            default:
                throw Error("[webgl.program.createWriter] Don't know how to deal with uniform \"" + item.name + "\" of type " + lookup[item.type] + "!");
        }
    };
    Program.prototype.createUniformGetter = function (item) {
        var name = "_" + item.name;
        return function () {
            return this[name];
        };
    };
    return Program;
}());
export default Program;
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
    return code
        .split('\n')
        .map(function (line) {
        if (!line.trim().startsWith('#include')) {
            return line;
        }
        var pos = line.indexOf('#include') + '#include'.length;
        var includeName = line.substr(pos).trim();
        // We accept all this systaxes:
        // #include foo
        // #include 'foo'
        // #include <foo>
        // #include "foo"
        if ('\'<"'.indexOf(includeName.charAt(0)) > -1) {
            includeName = includeName.substr(1, includeName.length - '<>'.length);
        }
        var snippet = includes[includeName];
        if (typeof snippet !== 'string') {
            console.error("Include <" + includeName + "> not found in ", includes);
            throw Error("Include not found in shader: " + includeName);
        }
        return snippet;
    })
        .join('\n');
}
function getShader(type, gl, code) {
    if (type !== gl.VERTEX_SHADER && type !== gl.FRAGMENT_SHADER) {
        throw Error('Type must be VERTEX_SHADER or FRAGMENT_SHADER!');
    }
    var shader = gl.createShader(type);
    if (!shader) {
        throw Error("Unable to create a " + (type === gl.VERTEX_SHADER ? 'VERTEX' : 'FRAGMENT') + " shader!");
    }
    gl.shaderSource(shader, code);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var errorMessage = gl.getShaderInfoLog(shader) || "NULL";
        console.error("An error occurred compiling the shader: " + errorMessage);
        // tslint:disable-next-line:no-console
        console.info(getCodeSection(code, errorMessage));
        // tslint:disable-next-line:no-console
        throw Error("Unable to create a " + (type === gl.VERTEX_SHADER ? 'VERTEX' : 'FRAGMENT') + " shader!");
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
        if (typeof v === 'number') {
            lookup[v] = k;
        }
    }
    return lookup;
}
/**
 * For arrays, uniform names can be like this: "lights[0]".
 * This function will remove the "[0]" if it exist.
 */
function sanitizeUniformName(name) {
    var pos = name.indexOf("[");
    if (pos === -1)
        return name;
    return name.substr(0, pos);
}
var RX_ERROR_MESSAGE = /ERROR: ([0-9]+):([0-9]+):/g;
/**
 * Return a portion of the code that is two lines before the error and two lines after.
 */
function getCodeSection(code, errorMessage) {
    var lines = code.split(/\n\r?/);
    lines.unshift(""); // Because lines numbers start at 1
    RX_ERROR_MESSAGE.lastIndex = -1; // Reinit RegExp
    var matcher = RX_ERROR_MESSAGE.exec(errorMessage);
    if (!matcher) {
        return code;
    }
    var lineNumber = Number(matcher[2]);
    var firstLine = Math.max(1, lineNumber - 2);
    var lastLine = Math.min(lines.length - 1, lineNumber + 2);
    var outputLines = ["Here is an extract of the shader code:"];
    for (var n = firstLine; n <= lastLine; n++) {
        outputLines.push("| " + n + ":    " + lines[n]);
    }
    return outputLines.join("\n");
}
//# sourceMappingURL=program.js.map