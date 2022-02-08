import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import glsl from 'babel-plugin-glsl/macro'

export default class GlowingRing extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: {value: 0}, 
        iResolution: { value: new THREE.Vector3(2560, 581,1) },

      },
      vertexShader: glsl`
      uniform float uTime;
      varying vec2 vUv;
      varying float vUTime;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
        vUTime = uTime;
        }
      `,
      fragmentShader: glsl`
        precision mediump float;
        uniform vec2 iResolution;

        varying vec2 vUv;
        varying float vUTime;

        #define NUM_PARTICLES 20.

vec2 Hash12(float t)
{
    float x = fract(sin(t * 674.3) * 453.2);
    float y = fract(sin(t * 2674.3) * 453.2);
    
    return vec2(x,y);
}

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = -1.0 + 3.0 *vUv ;

    // Time varying pixel color
    vec3 col = vec3(0.0);
    
    for(float i = 0.; i < NUM_PARTICLES; i++)
    {
        vec2 dir= Hash12(i) - .5;
        float t = .5 +  sin(vUTime + sin(uv.x));
        float d = length(uv-dir*t - sin(vUTime));
        d -= length(uv-dir*t);
         
     
        
        float brightness = 0.001;
        
        col += vec3(brightness / d);
        
    
    }
  //  col = vec3(Hash12(12.).x);
    // Output to screen
    gl_FragColor = vec4(col,1.0);

        }
      `
    })
  }

  set uTime(v) { this.uniforms.uTime.value = v } // prettier-ignore
  get uTime() { return this.uniforms.uTime.value } // prettier-ignore
}

extend({ GlowingRing })