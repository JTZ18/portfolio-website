import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import glsl from 'babel-plugin-glsl/macro'

export default class PortalMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
        colorStart: { value: new THREE.Color('hotpink') },
        colorEnd: { value: new THREE.Color('white') },
        fogColor: { value: new THREE.Color(1,1,1)},
        fogDensity: { value: 0.00025},
        fogNear: { value: 1},
        fogFar: { value: 2000},
      },
      vertexShader: glsl`
      #include <fog_pars_vertex>
      varying vec2 vUv;
      void main() {
        #include <begin_vertex>
        #include <project_vertex>
        #include <fog_vertex>
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,
      fragmentShader: glsl`
      #include <fog_pars_fragment>
      #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
      uniform float time;
      uniform vec3 colorStart;
      uniform vec3 colorEnd;
      varying vec2 vUv;
      void main() {
        vec2 displacedUv = vUv + cnoise3(vec3(vUv * 10.0, time * 0.1));
        float strength = cnoise3(vec3(displacedUv * 10.0, time * 0.2));
        float outerGlow = distance(vUv, vec2(0.5)) * 2.0 - 0.5;
        strength += outerGlow;
        strength += step(-0.2, strength) * 0.6;
        strength = clamp(strength, 0.0, 1.0);
        vec3 color = mix(colorStart, colorEnd, strength);
        gl_FragColor = vec4(color, 1.0);
        #include <fog_fragment>
      }`,
      fog: true
    })
  }

  set time(v) { this.uniforms.time.value = v } // prettier-ignore
  get time() { return this.uniforms.time.value } // prettier-ignore
  get colorStart() { return this.uniforms.colorStart.value } // prettier-ignore
  get colorEnd() { return this.uniforms.colorEnd.value } // prettier-ignore
}

extend({ PortalMaterial })