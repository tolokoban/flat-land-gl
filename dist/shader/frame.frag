precision mediump float;

uniform sampler2D uniTexture;

varying vec2 varUV;

void main() {
  vec4 color = texture2D( uniTexture, varUV );
  if( color.a < 0.5 ) discard;
  gl_FragColor = color;
}
