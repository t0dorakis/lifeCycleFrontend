uniform vec3 color;
attribute float size;

varying vec3 vColor;  // 'varying' vars are passed to the fragment shader

void main() {
  vColor = color;   // pass the color to the fragment shader
  gl_PointSize = size;
}