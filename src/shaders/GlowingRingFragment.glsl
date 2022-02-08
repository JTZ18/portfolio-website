#include <fog_pars_fragment>
precision mediump float;
uniform vec2 iResolution;

varying vec2 vUv;
varying float vUTime;

const float pi = 3.14;
const float lineNum = 3.;
const float variation = 0.5;
const float petalNum = 5.;
const float glowing = 0.02;
const float ringWidth = 0.08;
const float rotateSpeed = 0.3;
const float radius = 0.28;

void main(){
	vec2 pos = (vUv.xy * 2. - iResolution.xy) / min(iResolution.x, iResolution.y) * .5;
	float t = atan(pos.y + variation, pos.x);
	
	float color = 0.1;
	for (float i = 1.0; i <= lineNum; i++) {
	  color += glowing / abs(
          length(pos)
		  + ringWidth * sin(
		    petalNum * (t + i * vUTime * rotateSpeed / lineNum) + pi
		  ) - radius
	  );
	}
	float base = (length(pos) - radius) * color;
    vec3 baseColor = vec3(
        base / cos(vUTime / 4.),
        base / cos(vUTime / 4. + pi / 2.),
        base / cos(vUTime / 4. + pi)
    );	
	gl_FragColor = vec4(baseColor * color, 1.0);
    #include <fog_fragment>
}