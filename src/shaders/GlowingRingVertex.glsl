#include <fog_pars_vertex>

uniform float uTime;
varying vec2 vUv;
varying float vUTime;
void main() {
    #include <begin_vertex>
    #include <project_vertex>
    #include <fog_vertex>
    #include <lights_phong_vertex>
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
    vUTime = uTime;