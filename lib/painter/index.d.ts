import BackgroundPainter from './background';
import ClearPainter from './clear';
import CubeMapPainter from './cube-map';
import Painter from './painter';
import SpritesPainter from './sprites';
import VoronoiPainter from './voronoi';
declare const _default: {
    Background: typeof BackgroundPainter;
    Clear: typeof ClearPainter;
    CubeMap: typeof CubeMapPainter;
    Painter: typeof Painter;
    Sprites: typeof SpritesPainter;
    Voronoi: typeof VoronoiPainter;
};
export default _default;
