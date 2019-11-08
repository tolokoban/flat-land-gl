var __values = (this && this.__values) || function(o) {
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
        if (typeof codes.vert !== 'string') {
            throw Error('[webgl.program] Missing attribute `vert` in argument `codes`!');
        }
        if (typeof codes.frag !== 'string') {
            throw Error('[webgl.program] Missing attribute `frag` in argument `codes`!');
        }
        codes = parseIncludes(codes, includes);
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
        this.uniforms = this.createUniforms();
    }
    Program.prototype.createAttributes = function () {
        var _a = this, gl = _a.gl, program = _a.program;
        var attribs = {};
        var attribsCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (var index = 0; index < attribsCount; index++) {
            var item = gl.getActiveAttrib(program, index);
            if (!item)
                continue;
            item.typeName = this.getTypeName(item.type);
            item.length = this.getSize(gl, item);
            item.location = gl.getAttribLocation(program, item.name);
            attribs[item.name] = item;
            Object.defineProperty(this, '$' + item.name, {
                value: item.location,
                writable: false,
                enumerable: true,
                configurable: false
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
                        "Available attributes are: " + Object.keys(that.attribs).map(function (name) {
                        return '"' + name + '"';
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
        var id = '$' + name;
        var map = this;
        map[id] = value;
    };
    Program.prototype.createUniforms = function () {
        var _a = this, gl = _a.gl, program = _a.program;
        var uniforms = {};
        var uniformsCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (var index = 0; index < uniformsCount; index++) {
            var item = gl.getActiveUniform(program, index);
            if (!item)
                continue;
            var location_1 = gl.getUniformLocation(program, item.name);
            if (!location_1)
                continue;
            uniforms[item.name] = location_1;
            Object.defineProperty(this, '$' + item.name, {
                set: this.createUniformSetter(item, uniforms[item.name], this._typesNamesLookup),
                get: this.createUniformGetter(item),
                enumerable: true,
                configurable: false
            });
        }
        return uniforms;
    };
    Program.prototype.createUniformSetter = function (item, nameGL, lookup) {
        var gl = this.gl;
        var nameJS = '_$' + item.name;
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
        var name = '_$' + item.name;
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
        frag: parseInclude(codes.frag, includes)
    };
}
function parseInclude(code, includes) {
    return code.split('\n').map(function (line) {
        if (line.trim().substr(0, 8) !== '#include')
            return line;
        var pos = line.indexOf('#include') + 8;
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
        if (typeof snippet !== 'string') {
            console.error("Include <" + includeName + "> not found in ", includes);
            throw Error("Include not found in shader: " + includeName);
        }
        return snippet;
    }).join("\n");
}
function getShader(type, gl, code) {
    if (type !== gl.VERTEX_SHADER && type !== gl.FRAGMENT_SHADER) {
        throw Error('Type must be VERTEX_SHADER or FRAGMENT_SHADER!');
    }
    var shader = gl.createShader(type);
    if (!shader) {
        throw Error("Unable to create a " + (type === gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT") + " shader!");
    }
    gl.shaderSource(shader, code);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(code);
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
        if (k !== k.toUpperCase())
            continue;
        var v = gl[k];
        if (typeof v === 'number') {
            lookup[v] = k;
        }
    }
    return lookup;
}
//# sourceMappingURL=program.js.map