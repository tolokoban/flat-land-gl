import Scene from './scene';
export declare class IScene extends Scene {
}
declare const _default: {
    Calc: {
        cos: (angle: number) => number;
        sin: (angle: number) => number;
        clamp: (v: number, min?: number, max?: number) => number;
        vector: {
            areEqual(a: Float32Array, b: Float32Array): boolean;
            cross3(a: Float32Array, b: Float32Array, output: Float32Array): void;
            dot3(a: Float32Array, b: Float32Array): number;
            length3(input: Float32Array): number;
            normalize3(input: Float32Array, output: Float32Array): void;
            orbital3(latitude: number, longitude: number, output: Float32Array): void;
            length4(input: Float32Array): number;
            normalize4(input: Float32Array, output: Float32Array): void;
        };
        matrix: {
            areEqual: (a: Float32Array, b: Float32Array) => boolean;
            identity3(output: Float32Array): void;
            multiply3(a: Float32Array, b: Float32Array, output: Float32Array): void;
            identity4(output: Float32Array): void;
            multiply4(a: Float32Array, b: Float32Array, output: Float32Array): void;
            invert4(a: Float32Array, output: Float32Array): boolean;
            rotationX(angle: number, output: Float32Array): void;
        };
        M4_00: number;
        M4_10: number;
        M4_20: number;
        M4_30: number;
        M4_01: number;
        M4_11: number;
        M4_21: number;
        M4_31: number;
        M4_02: number;
        M4_12: number;
        M4_22: number;
        M4_32: number;
        M4_03: number;
        M4_13: number;
        M4_23: number;
        M4_33: number;
        M3_00: number;
        M3_10: number;
        M3_20: number;
        M3_01: number;
        M3_11: number;
        M3_21: number;
        M3_02: number;
        M3_12: number;
        M3_22: number;
    };
    Camera: {
        Silly: typeof import("./camera/silly").default;
        Perspective: typeof import("./camera/perspective").default;
        Cover2D: typeof import("./camera/cover-2d").default;
    };
    Painter: {
        Background: typeof import("./painter/background").default;
        Clear: typeof import("./painter/clear").default;
        Painter: typeof import("./painter/painter").default;
        Sprites: typeof import("./painter/sprites").default;
        Voronoi: typeof import("./painter/voronoi").default;
    };
    Scene: typeof Scene;
};
export default _default;
