import Scene from './scene';
export declare class IScene extends Scene {
}
declare const _default: {
    Calc: {
        cos: (angle: number) => number;
        sin: (angle: number) => number;
        clamp: (v: number, min?: number, max?: number) => number;
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
