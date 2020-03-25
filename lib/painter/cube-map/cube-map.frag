precision mediump float;
uniform samplerCube uniTexture;
varying vec3 varDirection;

void main() {
  vec4 color = textureCube( uniTexture, varDirection );
  gl_FragColor = color;
}
