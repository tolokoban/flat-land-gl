const BPE = Float32Array.BYTES_PER_ELEMENT
const DIM1 = 1
const DIM2 = 2
const DIM3 = 3
const DIM4 = 4

export interface IShaders {
    vert: string
    frag: string
}

interface IAttrib extends WebGLActiveInfo {
    typeName: string
    length: number
    location: number
}
interface IAttribsDic {
    [key: string]: IAttrib
}
interface IUniforms {
    [key: string]: number | Float32Array
}
interface IUniformsLocation {
    [key: string]: WebGLUniformLocation
}

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
export default class Program {
    readonly gl: WebGLRenderingContext
    readonly BPE: number
    readonly program: WebGLProgram
    readonly attribs: IAttribsDic
    readonly uniforms: IUniforms
    readonly uniformsLocation: IUniformsLocation
    private readonly _typesNamesLookup: { [key: number]: string }

    constructor(
        gl: WebGLRenderingContext,
        _codes: IShaders,
        includes: { [key: string]: string } = {}
    ) {
        const codes = parseIncludes(_codes, includes)

        this.gl = gl
        Object.freeze(this.gl)
        this.BPE = BPE
        Object.freeze(this.BPE)

        this._typesNamesLookup = getTypesNamesLookup(gl)

        const shaderProgram = gl.createProgram()
        if (!shaderProgram) {
            throw Error('Unable to create WebGLProgram!')
        }
        this.program = shaderProgram
        const vertShader = getVertexShader(gl, codes.vert)
        gl.attachShader(shaderProgram, vertShader)
        const fragShader = getFragmentShader(gl, codes.frag)
        gl.attachShader(shaderProgram, fragShader)
        gl.linkProgram(shaderProgram)

        this.use = () => {
            gl.useProgram(shaderProgram)
        }

        this.attribs = this.createAttributes()
        this.uniforms = {}
        this.uniformsLocation = this.createUniformsLocation()
    }

    use() {
        this.gl.useProgram(this.program)
    }

    getTypeName(typeId: number) {
        return this._typesNamesLookup[typeId]
    }

    bindAttribs(buffer: WebGLBuffer, ...names: string[]) {
        const that = this
        const { gl } = this
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

        let totalSize = 0
        for (const name of names) {
            const attrib = that.attribs[name]
            if (!attrib) {
                throw Error(
                    `Cannot find attribute "${name}!
It may be not active because unused in the shader.
Available attributes are: ${Object.keys(that.attribs)
                        .map((n) =>
                            `"${n}"`)
                        .join(', ')} (${String(that.attribs.length)})`
                )
            }
            totalSize += attrib.size * attrib.length * BPE
        }

        let offset = 0
        for (const name of names) {
            const attrib = that.attribs[name]
            gl.enableVertexAttribArray(attrib.location)
            gl.vertexAttribPointer(
                attrib.location,
                attrib.size * attrib.length,
                gl.FLOAT,
                false, // No normalisation.
                totalSize,
                offset
            )
            offset += attrib.size * attrib.length * BPE
        }
    }

    setUniform(name: string, value: number | Float32Array) {
        const { uniforms, uniformsLocation } = this
        if (typeof uniformsLocation[name] === 'undefined') {
            console.error(`Uniform "${name}" does not exist in this WebGL Program!`)
            const uniformsName = Object.keys(uniformsLocation)
            if (uniformsName.length === 0) {
                console.error("Actually, this program has no uniform at all.")
            } else {
                console.error("Available uniforms are:", uniformsName.join(", "))
            }
            throw Error(`Uniform "${name}" was ot found!`)
        }
        uniforms[name] = value;
    }

    private createAttributes(): IAttribsDic {
        const { gl, program } = this
        const attribs: IAttribsDic = {}
        const attribsCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES) as number
        for (let index = 0; index < attribsCount; index++) {
            const item: IAttrib | null = gl.getActiveAttrib(program, index) as IAttrib
            if (!item) {
                continue
            }
            item.typeName = this.getTypeName(item.type)
            item.length = this.getSize(gl, item)
            item.location = gl.getAttribLocation(program, item.name)
            attribs[item.name] = item
            Object.defineProperty(this, `${item.name}`, {
                value: item.location,
                writable: false,
                enumerable: true,
                configurable: false,
            })
        }
        return attribs
    }

    private getSize(gl: WebGLRenderingContext, item: IAttrib): number {
        switch (item.type) {
            case gl.FLOAT_VEC4:
                return DIM4
            case gl.FLOAT_VEC3:
                return DIM3
            case gl.FLOAT_VEC2:
                return DIM2
            case gl.FLOAT:
                return DIM1
            default:
                throw Error(
                    `[webgl.program:getSize] I don't know the size of the attribute "${
                    item.name
                    }" because I don't know the type "${this.getTypeName(item.type)}"!`
                )
        }
    }

    private createUniformsLocation(): IUniformsLocation {
        const { gl, program, uniforms } = this
        const uniformsLocation: IUniformsLocation = {}
        const uniformsCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number
        for (let index = 0; index < uniformsCount; index++) {
            const item = gl.getActiveUniform(program, index)
            if (!item) {
                continue
            }
            const name = sanitizeUniformName(item.name)
            const location = gl.getUniformLocation(program, item.name)
            if (!location) {
                continue
            }
            uniformsLocation[name] = location
            Object.defineProperty(uniforms, `${name}`, {
                set: this.createUniformSetter(
                    item, uniformsLocation[name], this._typesNamesLookup
                ),
                get: this.createUniformGetter(item),
                enumerable: true,
                configurable: false,
            })
        }

        return uniformsLocation
    }

    private createUniformSetter(
        item: WebGLActiveInfo,
        nameGL: WebGLUniformLocation,
        lookup: { [key: number]: string }
    ) {
        const { gl } = this
        const name = sanitizeUniformName(item.name)
        const nameJS = `_${name}`

        switch (item.type) {
            case gl.BYTE:
            case gl.UNSIGNED_BYTE:
            case gl.SHORT:
            case gl.UNSIGNED_SHORT:
            case gl.INT:
            case gl.UNSIGNED_INT:
            case gl.SAMPLER_2D: // For textures, we specify the texture unit.
                if (item.size === 1) {
                    return function(this: { [key: string]: number }, v: number) {
                        gl.uniform1i(nameGL, v)
                        this[nameJS] = v
                    }
                } else {
                    return function(this: { [key: string]: Int32List }, v: Int32List) {
                        gl.uniform1iv(nameGL, v)
                        this[nameJS] = v
                    }
                }
            case gl.FLOAT:
                if (item.size === 1) {
                    return function(this: { [key: string]: number }, v: number) {
                        gl.uniform1f(nameGL, v)
                        this[nameJS] = v
                    }
                } else {
                    return function(this: { [key: string]: Float32List }, v: Float32List) {
                        gl.uniform1fv(nameGL, v)
                        this[nameJS] = v
                    }
                }
            case gl.FLOAT_VEC2:
                if (item.size === 1) {
                    return function(this: { [key: string]: Float32List }, v: Float32List) {
                        gl.uniform2fv(nameGL, v)
                        this[nameJS] = v
                    }
                } else {
                    throw Error(
                        `[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC2 in uniform "${
                        item.name
                        }"!`
                    )
                }
            case gl.FLOAT_VEC3:
                if (item.size === 1) {
                    return function(this: { [key: string]: Float32List }, v: Float32List) {
                        gl.uniform3fv(nameGL, v)
                        this[nameJS] = v
                    }
                } else {
                    throw Error(
                        `[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC3 in uniform "${
                        item.name
                        }"!`
                    )
                }
            case gl.FLOAT_VEC4:
                if (item.size === 1) {
                    return function(this: { [key: string]: Float32List }, v: Float32List) {
                        gl.uniform4fv(nameGL, v)
                        this[nameJS] = v
                    }
                } else {
                    throw Error(
                        `[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC4 in uniform "${
                        item.name
                        }"!`
                    )
                }
            case gl.FLOAT_MAT3:
                if (item.size === 1) {
                    return function(this: { [key: string]: Float32List }, v: Float32List) {
                        gl.uniformMatrix3fv(nameGL, false, v)
                        this[nameJS] = v
                    }
                } else {
                    throw Error(
                        `[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT3 in uniform "${
                        item.name
                        }"!`
                    )
                }
            case gl.FLOAT_MAT4:
                if (item.size === 1) {
                    return function(this: { [key: string]: Float32List }, v: Float32List) {
                        gl.uniformMatrix4fv(nameGL, false, v)
                        this[nameJS] = v
                    }
                } else {
                    throw Error(
                        `[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT4 in uniform "${
                        item.name
                        }"!`
                    )
                }
            default:
                throw Error(
                    `[webgl.program.createWriter] Don't know how to deal with uniform "${
                    item.name
                    }" of type ${lookup[item.type]}!`
                )
        }
    }

    private createUniformGetter(item: WebGLActiveInfo) {
        const name = `_${item.name}`
        return function(this: IUniforms) {
            return this[name]
        }
    }
}

/**
 * This is a preprocessor for shaders.
 * Directives  `#include`  will be  replaced  by  the content  of  the
 * correspondent attribute in `includes`.
 */
function parseIncludes(codes: IShaders, includes: { [key: string]: string }): IShaders {
    return {
        vert: parseInclude(codes.vert, includes),
        frag: parseInclude(codes.frag, includes),
    }
}

function parseInclude(code: string, includes: { [key: string]: string }): string {
    return code
        .split('\n')
        .map((line) => {
            if (!line.trim().startsWith('#include')) {
                return line
            }
            const pos = line.indexOf('#include') + '#include'.length
            let includeName = line.substr(pos).trim()
            // We accept all this systaxes:
            // #include foo
            // #include 'foo'
            // #include <foo>
            // #include "foo"
            if ('\'<"'.indexOf(includeName.charAt(0)) > -1) {
                includeName = includeName.substr(1, includeName.length - '<>'.length)
            }
            const snippet = includes[includeName] as string | undefined
            if (typeof snippet !== 'string') {
                console.error(`Include <${includeName}> not found in `, includes)
                throw Error(`Include not found in shader: ${includeName}`)
            }
            return snippet
        })
        .join('\n')
}

function getShader(type: number, gl: WebGLRenderingContext, code: string): WebGLShader {
    if (type !== gl.VERTEX_SHADER && type !== gl.FRAGMENT_SHADER) {
        throw Error('Type must be VERTEX_SHADER or FRAGMENT_SHADER!')
    }
    const shader = gl.createShader(type)
    if (!shader) {
        throw Error(
            `Unable to create a ${type === gl.VERTEX_SHADER ? 'VERTEX' : 'FRAGMENT'} shader!`
        )
    }
    gl.shaderSource(shader, code)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const errorMessage: string = gl.getShaderInfoLog(shader) || "NULL"
        console.error(`An error occurred compiling the shader: ${errorMessage}`)
        // tslint:disable-next-line:no-console
        console.info(getCodeSection(code, errorMessage))
        // tslint:disable-next-line:no-console
        throw Error(
            `Unable to create a ${type === gl.VERTEX_SHADER ? 'VERTEX' : 'FRAGMENT'} shader!`
        )
    }

    return shader
}

function getFragmentShader(gl: WebGLRenderingContext, code: string) {
    return getShader(gl.FRAGMENT_SHADER, gl, code)
}

function getVertexShader(gl: WebGLRenderingContext, code: string) {
    return getShader(gl.VERTEX_SHADER, gl, code)
}

function getTypesNamesLookup(gl: WebGLRenderingContext): {} {
    const lookup: { [key: number]: string } = {}

    for (const k in gl) {
        if (k !== k.toUpperCase()) {
            continue
        }
        const v = ((gl as unknown) as { [key: string]: string | number })[k]
        if (typeof v === 'number') {
            lookup[v] = k
        }
    }
    return lookup
}

/**
 * For arrays, uniform names can be like this: "lights[0]".
 * This function will remove the "[0]" if it exist.
 */
function sanitizeUniformName(name: string) {
    const pos = name.indexOf("[")
    if (pos === -1) return name
    return name.substr(0, pos)
}


const RX_ERROR_MESSAGE = /ERROR: ([0-9]+):([0-9]+):/g

/**
 * Return a portion of the code that is two lines before the error and two lines after.
 */
function getCodeSection(code: string, errorMessage: string) {
    const lines = code.split(/\n\r?/)
    lines.unshift("")  // Because lines numbers start at 1
    RX_ERROR_MESSAGE.lastIndex = -1  // Reinit RegExp
    const matcher = RX_ERROR_MESSAGE.exec(errorMessage)
    if (!matcher) {
        return code
    }
    const lineNumber = Number(matcher[2])
    const firstLine = Math.max(1, lineNumber - 2)
    const lastLine = Math.min(lines.length - 1, lineNumber + 2)
    const outputLines = ["Here is an extract of the shader code:"]
    for (let n = firstLine; n <= lastLine; n++) {
        outputLines.push(
            `| ${n}:    ${lines[n]}`
        )
    }
    return outputLines.join("\n")
}
