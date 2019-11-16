import Scene from "./scene";
declare const FlatLand: {
    Calc: {
        cos: (angle: number) => number;
        sin: (angle: number) => number;
    };
    Painter: {
        Background: typeof import("./painter/background").default;
        Clear: typeof import("./painter/clear").default;
        Painter: typeof import("./painter/painter").default;
        Sprites: typeof import("./painter/sprites").default;
    };
    Scene: typeof Scene;
};
export default FlatLand;
//# sourceMappingURL=index.d.ts.map