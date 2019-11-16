import { IEvent, IWheelEvent } from "./types";
declare const SYMBOL: unique symbol;
export interface IHTMLElementWithGesture extends HTMLElement {
    [SYMBOL]?: Gesture;
}
interface IHandlers {
    tap?: (event: IEvent) => void;
    down?: (event: IEvent) => void;
    up?: (event: IEvent) => void;
    move?: (event: IEvent) => void;
    pan?: (event: IEvent) => void;
    pandown?: (event: IEvent) => void;
    panup?: (event: IEvent) => void;
    panvertical?: (event: IEvent) => void;
    swipe?: (event: IEvent) => void;
    swipedown?: (event: IEvent) => void;
    swipeup?: (event: IEvent) => void;
    swipevertical?: (event: IEvent) => void;
    swipeleft?: (event: IEvent) => void;
    keydown?: (event: KeyboardEvent) => void;
    keyup?: (event: KeyboardEvent) => void;
    wheel?: (event: IWheelEvent) => void;
    [key: string]: ((evt: any) => void) | undefined;
}
declare class Gesture {
    private handlers;
    private element;
    private readonly pointers;
    private readonly id;
    constructor(elem: IHTMLElementWithGesture);
    get identifier(): number;
    on(handlers: IHandlers): void;
    /**
     * Returns true if current gesture has at least one of the provided handlers.
     */
    private hasHandlerFor;
    private getPointer;
    private handleDown;
    private handleUp;
    private handleMove;
    private recognizeTap;
    private recognizeMove;
    private recognizePan;
    private recognizePanDown;
    private recognizePanUp;
    private recognizeSwipe;
    private recognizeSwipeDown;
    private recognizeSwipeUp;
    private recognizeSwipeLeft;
}
export default function (elem: IHTMLElementWithGesture): Gesture;
export {};
//# sourceMappingURL=gesture.d.ts.map