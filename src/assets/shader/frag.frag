varying vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, 0.5);  // adjust the alpha
}