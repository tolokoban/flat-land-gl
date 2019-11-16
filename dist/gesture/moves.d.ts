/**
 * Helper to manage a pointer move.
 * It gives you the location, the speed and the acceleration of your pointer.
 *
 * @type {[type]}
 */
export default class Moves {
    private _x0;
    private _y0;
    private _time0;
    private _x;
    private _y;
    private _time;
    private _cursor;
    constructor(x?: number, y?: number);
    init(x: number, y: number): void;
    _index(shift: number): number;
    get now(): number;
    add(x: number, y: number): void;
    get elapsedTime(): number;
    get x(): number;
    get y(): number;
    get startX(): number;
    get startY(): number;
    get speedX(): number;
    get speedY(): number;
    get accelX(): number;
    get accelY(): number;
}
//# sourceMappingURL=moves.d.ts.map