/**
 * BasicHandler(
 *     element: HTMLElement,
 *     handleDown: TBasicHandler,
 *     handleUp: TBasicHandler,
 *     handleMove: TBasicHandler
 * )
 *
 * Deals with three basic events : DOWN, UP and MOVE.
 * If the device has several input touches, we will return
 * only one event.
 *
 * A TBasicHandler is a synthetic event object:
 *   - x: X coordinate relative to the viewport, not including any scroll offset.
 *   - y: Y coordinate relative to the viewport, not including any scroll offset.
 *   - startX
 *   - startY
 *   - index: For multi-touch system. The first one is 0, the second is 1, etc.
 *   - buttons: 1 = left, 2 = right.
 *   - mouse: "mouse" | "touch" | "pen".
 *   - clear(): Call stopPropagation() and preventDefault() on this event.
 *
 */
import Finger from "./finger";
import { IBasicEvent } from "./basic-handler.types";
declare type TTouchEventHandler = (evt: TouchEvent) => void;
declare type TMouseEventHandler = (evt: MouseEvent) => void;
declare type TBasicHandler = (evt: IBasicEvent) => void | undefined;
interface IDeviceHandlers {
    touchstart?: TTouchEventHandler;
    touchend?: TTouchEventHandler;
    touchmove?: TTouchEventHandler;
    mousedown?: TMouseEventHandler;
    mouseup?: TMouseEventHandler;
    mousemove?: TMouseEventHandler;
    mouseout?: TMouseEventHandler;
}
declare class BasicHandler {
    readonly element: HTMLElement;
    mouseType: string;
    mouseTypeTime: number;
    deviceHandlers: IDeviceHandlers;
    fingers: Finger;
    pressed: boolean;
    constructor(element: HTMLElement, handleDown: TBasicHandler, handleUp: TBasicHandler, handleMove: TBasicHandler);
    /**
     * If you device can hold mouse and touch events, you will receive two events.
     * This function prevent it.
     *
     * @param   mouseType
     * @returns If `false`, we must ignore this event.
     */
    checkMouseType(mouseType: string): boolean;
    detachEvents(): void;
}
declare const _default: {
    attach(element: HTMLElement, handleDown: TBasicHandler, handleUp: TBasicHandler, handleMove: TBasicHandler): BasicHandler;
};
export default _default;
//# sourceMappingURL=basic-handler.d.ts.map