import React, { useState } from 'react';
import * as THREE from 'three'
import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, useGLTF, useFBX, useAnimations, OrbitControls, useTexture, Stage, Backdrop, useMatcapTexture, MeshReflectorMaterial, Environment, ContactShadows, softShadows, shaderMaterial } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Bounds, GizmoHelper, GizmoViewport, Box } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useAnimatedSprite } from 'use-animated-sprite';
import { PlainAnimator } from "three-plain-animator/lib/plain-animator"
import { WaveMaterial } from './WaveMaterial'
import {PsychedelicShader} from './PsychedelicShader'
import glsl from 'babel-plugin-glsl/macro'



export default function NewApp() {
  //debugger;

  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 3] }}>
      <OrbitControls makeDefault/>
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <ambientLight intensity={1} />
      <directionalLight position={[-10, 0, -5]} intensity={5} color="red" />
      <directionalLight position={[-1, -2, -5]} intensity={5} color="#0c8cbf" />
      {/* <spotLight position={[5, 0, 5]} intensity={100} penumbra={1} angle={0.33} castShadow color="#0c8cbf" /> */}
      {/* <spotLight position={[10, 10, 5]} angle={0.15} penumbra={1} intensity={100} castShadow shadow-mapSize={[2048, 2048]} color="#0c8cbf" /> */}
      <BackdropWithShader />
      <ContactShadows position={[0, -0.485, 0]} scale={5} blur={1.5} far={1} />
      
    
        
        {/* <ambientLight intensity={1.5} />
        <Sky scale={1000} sunPosition={[2, 0.4, 10]} />
        <spotLight angle={0.14} color="#ffd0d0" penumbra={1} position={[500, 4000, 0]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow /> */}
       
        <Suspense fallback={null}>
          
          <Gecko scale={0.1} position={[0, -0.5, 0]}/>

        </Suspense>
    </Canvas>
  )
}

function Gecko({ ...props }) {
  // This hook gives you offets, ranges and other useful things
      const obj = useLoader(OBJLoader,'/TheoPose_Wip02.obj')
      console.log(obj)
      console.log(obj.children[0].geometry)
      //debugger;
      const ref = useRef()
      useFrame((state, delta) => (ref.current.time += delta))
      const material = new THREE.MeshBasicMaterial({color:"lightblue"})
      const [matcap, url] = useMatcapTexture(
        // short listed list 10,18, 20,33, 46, 58, 71, 90, 150, 159, 325, 337, 389
        33, // index of the matcap texture https://github.com/emmelleppi/matcaps/blob/master/matcap-list.json
        1024 // size of the texture ( 64, 128, 256, 512, 1024 )
       )
      

      softShadows({
        frustum: 3.75, // Frustum width (default: 3.75) must be a float
        size: 0.005, // World size (default: 0.005) must be a float
        near: 9.5, // Near plane (default: 9.5) must be a float
        samples: 17, // Samples (default: 17) must be a int
        rings: 11, // Rings (default: 11) must be a int
      })
      
      return (
      <mesh geometry={obj.children[0].geometry} {...props}>
        {/* <meshMatcapMaterial matcap={matcap} /> */}
        <waveMaterial ref={ref} key={WaveMaterial.key} colorStart="hotpink" colorEnd="rgb(124, 79, 203)" />
        {/* <psychedelicShader ref={ref} key={PsychedelicShader.key}/> */}
        
      </mesh>)
  }

function BackdropWithShader() {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.time += delta))


  return(
    <Backdrop castShadow floor={2} position={[0, -0.5, -3]} scale={[50, 10, 4]}>
        {/* <waveMaterial ref={ref} key={WaveMaterial.key} colorStart="hotpink" colorEnd="rgb(124, 79, 203)" /> */}
        <psychedelicShader ref={ref} key={PsychedelicShader.key}/>
    </Backdrop>
  )

}

function Urns({...props }) {
  const { scene, nodes, animations } = useLoader(GLTFLoader,'/gen_urn_lores_mod.glb')
  const { actions } = useAnimations(animations, scene)
  console.log(scene)
  console.log(nodes)
  console.log(actions)
  // useEffect(() => void (actions['CameraAction'].play().paused = true), [actions])
  // useFrame((state) => {
  //   actions["CameraAction"].time = THREE.MathUtils.lerp(actions["CameraAction"].time, actions["CameraAction"].getClip().duration * scroll.current, 0.05)
  // })
  return <primitive object={scene} {...props} />
}

  function Smoke({IconPosition, IconSize, ...props }) {

    const spriteTexture = useLoader(THREE.TextureLoader, './smoke-sprite-sheetv3.png')
    const [animator] = useState(() => new PlainAnimator(spriteTexture, 8, 8, 52, 30))
    useFrame(() => animator.animate())
  
    return (
      <mesh position={IconPosition}>
        <boxGeometry args={IconSize} />
        <meshStandardMaterial map={spriteTexture} transparent={true} />
      </mesh>
    )
}

function Scene({ ...props }) {
  // This hook gives you offets, ranges and other useful things
  const { scene, nodes, animations } = useLoader(GLTFLoader,'/town.glb')
  console.log(animations)
  console.log(scene)
  //for shadows
  return <primitive object={scene} {...props} />
}

function Room({ ...props }) {
    // This hook gives you offets, ranges and other useful things
    const fbx = useFBX('/Room.fbx')
    console.log(fbx)
    //for shadows
    return <primitive object={fbx} {...props} />
  }

function Room2({ ...props }) {
// This hook gives you offets, ranges and other useful things
    const { scene, nodes, animations } = useLoader(GLTFLoader,'/isometric-room.glb')
    console.log(animations)
    console.log(scene)
    //for shadows
    return <primitive object={scene} {...props} />
}

function Buildingobj({ ...props }) {
  // This hook gives you offets, ranges and other useful things
      const obj = useLoader(OBJLoader,'/building.obj')
      console.log(obj)
      //for shadows
      return <primitive object={obj} {...props} />
  }

function BuildingGLTF({ ...props }) {
  // This hook gives you offets, ranges and other useful things
  const { scene, nodes, animations } = useLoader(GLTFLoader,'/building.gltf')
  console.log(animations)
  console.log(scene)
  //for shadows
  return <primitive object={scene} {...props} />
}

function BuildingGLB({ ...props }) {
  // This hook gives you offets, ranges and other useful things
  const { scene, nodes, animations } = useLoader(GLTFLoader,'/building.glb')
  //console.log(animations)
  console.log(scene)
  //for shadows
  return <primitive object={scene} {...props} />
}

function BuildingFBX({ ...props }) {
  // This hook gives you offets, ranges and other useful things
  const fbx = useFBX('/building.fbx')
  console.log(fbx)
  //for shadows
  return <primitive object={fbx} {...props} />
}

const customShaderMaterial = shaderMaterial(
  // Uniform
  {
    time: 0
  },
  //vertex shaderMateria
  glsl`
  varying vec2 vUv;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
  }
  `,
  //fragmen shaderMaterial
  glsl`
  #ifdef GL_ES
  precision mediump float;
  #endif
  
  varying vec2 vUv;
  varying float vUTime;
  
  const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );
  
  float noise( vec2 p )
  {
    return sin(p.x)*sin(p.y);
  }
  
  float fbm4( vec2 p )
  {
      float f = 0.0;
      f += 0.5000*noise( p ); p = m*p*2.02;
      f += 0.2500*noise( p ); p = m*p*2.03;
      f += 0.1250*noise( p ); p = m*p*2.01;
      f += 0.0625*noise( p );
      return f/0.9375;
  }
  
  float fbm6( vec2 p )
  {
      float f = 0.0;
      f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
      f += 0.250000*(0.5+0.5*noise( p )); p = m*p*2.03;
      f += 0.125000*(0.5+0.5*noise( p )); p = m*p*2.01;
      f += 0.062500*(0.5+0.5*noise( p )); p = m*p*2.04;
      f += 0.031250*(0.5+0.5*noise( p )); p = m*p*2.01;
      f += 0.015625*(0.5+0.5*noise( p ));
      return f/0.96875;
  }
  
  vec2 fbm4_2( vec2 p )
  {
      return vec2(fbm4(p), fbm4(p+vec2(7.8)));
  }
  
  vec2 fbm6_2( vec2 p )
  {
      return vec2(fbm6(p+vec2(16.8)), fbm6(p+vec2(11.5)));
  }
  
  
  float func( vec2 q, out vec4 ron )
  {
      q += 0.03*sin( vec2(0.27,0.23)*vUTime + length(q)*vec2(4.1,4.3));
  
    vec2 o = fbm4_2( 0.9*q );
  
      o += 0.04*sin( vec2(0.12,0.14)*vUTime + length(o));
  
      vec2 n = fbm6_2( 3.0*o );
  
    ron = vec4( o, n );
  
      float f = 0.5 + 0.5*fbm4( 1.8*q + 6.0*n );
  
      return mix( f, f*f*f*3.5, f*abs(n.x) );
  }
  
  void main() 
  {
      // vec2 p = (2.0*vUv-iResolution.xy)/iResolution.y;
      vec2 p = -1.0 + 3.0 *vUv;
      float e = 2.0;
  
      vec4 on = vec4(0.0);
      float f = func(p, on);
  
      vec3 col = vec3(0.0);
      col = mix( vec3(0.2,0.1,0.4), vec3(0.3,0.05,0.05), f );
      col = mix( col, vec3(1,0.98,0.98), dot(on.zw,on.zw) );
      col = mix( col, vec3(0.73,0.1,0.32), 0.2 + 0.5*on.y*on.y );
      col = mix( col, vec3(0.09,0.26,0.1), 0.5*smoothstep(1.2,1.3,abs(on.z)+abs(on.w)) );
      col = clamp( col*f*2.0, 0.0, 1.0 );
      
  
      // manual derivatives - better quality, but slower
      vec4 kk;
     vec3 nor = normalize( vec3( func(p+vec2(e,0.0),kk)-f, 
                                  2.0*e,
                                  func(p+vec2(0.0,e),kk)-f ) );
      
      gl_FragColor = vec4( col, 1.0 );
  }
  `

);
extend({customShaderMaterial})

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1604011092346-0b4346ed714e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",
  ]);

  return (
    <mesh>
      <planeBufferGeometry args={[0.4, 0.6, 16, 16]} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} />
    </mesh>
  );
};



  

/*
author: glenatron (https://sketchfab.com/glenatron)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/94b24a60dc1b48248de50bf087c0f042
title: Littlest Tokyo */
//useGLTF.preload('/town.glb')
//useFBX.preload('/Room.fbx')
//useGLTF.preload('/isometric-room.glb')
//useGLTF.preload('/building.gltf')
// useGLTF.preload('/building.glb')
// useFBX.preload('/building.fbx')
