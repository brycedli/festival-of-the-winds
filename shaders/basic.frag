#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform float u_brightness;
float sunDraw (in vec2 st, in vec2 mouse, in vec2 offset){
  float dst = distance(offset + st,mouse);
  float dstVal = max(0.02/dst, 0.0);
  return dstVal;
}

void main() {
  vec2 resolutionSquare = vec2(u_resolution.y, u_resolution.y);
  vec2 st = gl_FragCoord.xy/resolutionSquare;
  //vec3 color0 = vec3(34.0/255.0, 82.0/255.0, 131.0/255.0);
  //vec3 color1 = vec3(159.0/255.0, 190.0/255.0, 208.0/255.0);
  vec3 skyBlend = mix(u_brightness*u_color0, u_brightness*u_color1, 1.0-st.y);
  
  vec2 mouse = u_mouse.xy/resolutionSquare;
  mouse.y = 1.0-mouse.y;
  vec2 sunPosition = vec2((sin(u_time / 5.0) / 3.0) + 0.5, (cos(u_time / 5.0)/3.0) + 0.5);
  vec4 sun = u_brightness*vec4(sunDraw(st, sunPosition, vec2(0.01, 0.01)), 
                  0.7 * sunDraw(st, sunPosition, vec2(0.01, -0.0)), 
                  0.7 * sunDraw(st, sunPosition, vec2(-0.01, -0.01)),
                  1.0);
  gl_FragColor = sun + vec4(skyBlend, 1);

}