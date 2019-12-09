The main components this library provides are:
* [Scene](classes/_scene_.scene.html): attached to a canvas, this is where all the drawings will take place.
* Painter: responsible of drawing something in a scene.
    * [Clear](classes/_painter_clear_.clearpainter.html): clear the whole scene by filling it with a unique color.
    * [Background](classes/_painter_background_background_.backgroundpainter.html): fill the scene with a static image.
    * [Sprites](classes/_painter_sprites_sprites_.spritespainter.html): manage sprites that can be moved, rotated and scaled.

## Drawing space
Each painter can define its own drawing space, but most of those which deal with 2D use the following one:
* X coord is from left to right: `[0, 1024[`.
* Y coord is from top to bottom: `[0, 1024[`.
* Z coord is from near to far: `[-1, +1]`.

Of course, the display is not always a square. In that case, some points of this space can be outside the visible viewport.

For instance, if your view port has a width twice its height, the top left corner can have the coordinates `(0, 255)` and the bottom right corner `(1024, 255+512=767)`.
