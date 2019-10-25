/*
Frames are very basic.
They have 4 vertices with two attributes: X and Y.
X and Y are also the UV coordinates for the texture.
That's why the left upper vertex has X=0 and Y=0,
and the right downer vertex has X=1 and Y=1.
*/

uniform vec2 uniScreenSize;
uniform vec2 uniScreenOrigin;
uniform vec3 uniObjectXYZ;
uniform vec2 attObjectSize;

attribute vec2 attXY;

varying vec2 varUV;

void main() {
  varUV = attXY;
  vec2 location = (attXY + uniScreenOrigin.xy) / uniScreenSize - uniScreenOrigin;

  gl_Position = vec4( location, uniObjectXYZ.z, 1.0 );

}
