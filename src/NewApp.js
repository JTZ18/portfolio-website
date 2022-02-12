import React, { useState } from 'react';
import * as THREE from 'three'
import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, useGLTF, useFBX, useAnimations, OrbitControls, useTexture, Stage, Backdrop, useMatcapTexture, MeshReflectorMaterial, Environment, ContactShadows, softShadows, shaderMaterial, Cloud } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Bounds, GizmoHelper, GizmoViewport, Box } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useAnimatedSprite } from 'use-animated-sprite';
import { PlainAnimator } from "three-plain-animator/lib/plain-animator"
import { WaveMaterial } from './shaders/WaveMaterial'
import './shaders/PortalMaterial'
import './shaders/GlowingRing'
import Fireflies from './components/Fireflies';
import glsl from 'babel-plugin-glsl/macro'
import { MeshStandardMaterial } from 'three';
import WaveVertexShader from './shaders/WaveVertex.glsl'






export default function NewApp() {
  //debugger;

  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 3] }}>
      <OrbitControls makeDefault/>
      <color attach="background" args={['#191920']} />
      
      <ambientLight intensity={1} />
      {/*  */}
      
      {/* <spotLight position={[5, 0, 5]} intensity={100} penumbra={1} angle={0.33} castShadow color="#0c8cbf" />
      <spotLight position={[10, 10, 5]} angle={0.15} penumbra={1} intensity={100} castShadow shadow-mapSize={[2048, 2048]} color="#0c8cbf" /> */}
      {/* <spotLight position={[0, 1, 0]} angle={0} penumbra={1} intensity={100} castShadow shadow-mapSize={[2048, 2048]} color="#0c8cbf" /> */}
      {/* <BackdropWithShader /> */}
    {/* <directionalLight position={[-10, 0, -5]} intensity={10} color="red" />
      <directionalLight position={[-1, -2, -5]} intensity={10} color="#0c8cbf" /> */}
      <fog attach="fog" args={['#191920', 0, 15]} />
      
    
        
        {/* <ambientLight intensity={1.5} />
        <Sky scale={1000} sunPosition={[2, 0.4, 10]} />
        <spotLight angle={0.14} color="#ffd0d0" penumbra={1} position={[500, 4000, 0]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow /> */}
       
        <Suspense fallback={null}>
        <spotLight position={[2, 3, -5]} intensity={1} penumbra={1} angle={0.53} castShadow color="#ff4000" />
        <spotLight position={[2, 3, 5]} intensity={1} penumbra={1} angle={0.53} castShadow color="#ff4000" />
          <Theov4 scale={10} rotation={[0,Math.PI / 2,0]}/>
          {/* <Gecko scale={0.1} position={[0, -0.5, 0]}/> */}
          <CurvedPlaneGLB />
          <Fireflies count={400} />
          <Cloud
            position={[0, 1.8, 0]}
            opacity={0.08}
            speed={0.4} // Rotation speed
            width={10} // Width of the full cloud
            depth={0.8} // Z-dir depth
            segments={50} // Number of particles
          />

        </Suspense>
        
    </Canvas>
  )
}

function Gecko({ ...props }) {
  // This hook gives you offets, ranges and other useful things
      const obj = useLoader(OBJLoader,'/TheoPose_Wip02.obj')
      //console.log(obj)
      //console.log(obj.children[0].geometry)
      //debugger;
      const ref = useRef()
      // useFrame((state, delta) => (ref.current.time += delta))
      // useFrame((state, delta) => (ref.current.uTime += delta))
      const material = new THREE.MeshPhongMaterial({color:"lightblue"})
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = {value: 0} 
        shader.uniforms.iResolution = { value: new THREE.Vector3(2560, 581,1) }
        shader.vertexShader = 'uniform float time;\n' + shader.vertexShader;
	      shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          WaveVertexShader
	      );
        materialShader = shader
      }
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

      const material2 = new THREE.MeshPhongMaterial({
        color:"black",
        emissive: "black",
        specular: "#ff4000",
        shininess: 100,

      })
      
      return (
      <mesh geometry={obj.children[0].geometry} material={material2} {...props}>
        {/* <meshMatcapMaterial matcap={matcap} /> */}
        {/* <portalMaterial ref={ref} colorStart="hotpink" colorEnd="rgb(124, 79, 203)" /> */}
        {/* <glowingRing ref={ref} colorStart="hotpink" colorEnd="rgb(124, 79, 203)" /> */}
      </mesh>)
  }

function BackdropWithShader() {
  const ref = useRef()
  
  useFrame((state, delta) => (ref.current.uTime += delta))
  //debugger;
  useFrame((state) => {
    //console.log(ref);
  })


  return(
    <Backdrop castShadow floor={2} segments={20} position={[0, -0.5, -3]} scale={[50, 20, 5]}>
        {/* <waveMaterial ref={ref} key={WaveMaterial.key} colorStart="hotpink" colorEnd="rgb(124, 79, 203)" /> */}
        <waveMaterial ref={ref}/>
    </Backdrop>
  )
}

function Smoke() { 
  return(
    <mesh />
  )
}

function CurvedPlane() {
  const ref = useRef()

  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3( -10, 0, 0 ),
    new THREE.Vector3( -5, 15, 0 ),
    new THREE.Vector3( 20, 15, 0 ),
    new THREE.Vector3( 10, 0, 0 )
  );
  
  const points = curve.getPoints( 50 );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );

  
  useFrame((state, delta) => (ref.current.uTime += delta))
  //debugger;

  return (
    <mesh geometry={geometry} scale={2}>
      {/* <waveMaterial ref={ref}/> */}
      <meshPhongMaterial color={"#000000"}/>
    </mesh>
  )
}


// sprite sheet animation smoke
//   function Smoke({IconPosition, IconSize, ...props }) {

//     const spriteTexture = useLoader(THREE.TextureLoader, './smoke-sprite-sheetv3.png')
//     const [animator] = useState(() => new PlainAnimator(spriteTexture, 8, 8, 52, 30))
//     useFrame(() => animator.animate())
  
//     return (
//       <mesh position={IconPosition}>
//         <boxGeometry args={IconSize} />
//         <meshStandardMaterial map={spriteTexture} transparent={true} />
//       </mesh>
//     )
// }


function BuildingGLB({ ...props }) {
  // This hook gives you offets, ranges and other useful things
  const { scene, nodes, animations } = useLoader(GLTFLoader,'/building.glb')
  //console.log(animations)
  console.log(scene)
  //for shadows
  return <primitive object={scene} {...props} />
}

function CurvedPlaneGLB({...props}) {
  const { scene, nodes, animations } = useLoader(GLTFLoader,'/curvedPlane.glb')
  //console.log(animations)
  console.log(nodes)
  
  const ref = useRef()

  useFrame((state, delta) => (ref.current.uTime += delta))
  return (
    // <mesh name="Plane" geometry={scene.children[0].geometry} scale={10}>
    //   <meshStandardMaterial />
    // </mesh>
    <mesh geometry={nodes.Plane.geometry} scale={[15,4,20]} position={[0,-2,0]}>
      <waveMaterial ref={ref}/>
      {/* <meshStandardMaterial color={"grey"} /> */}
    </mesh>

  )
}

function Gecko4({...props}) {
  const { scene, nodes, animations } = useLoader(GLTFLoader,'/theov4.glb')
  //console.log(animations)
  console.log(nodes)
  
  const ref = useRef()

  // useFrame((state, delta) => (ref.current.uTime += delta))
  return (
    // <mesh name="Plane" geometry={scene.children[0].geometry} scale={10}>
    //   <meshStandardMaterial />
    // </mesh>
    <mesh geometry={nodes.Plane.geometry} scale={[15,4,20]} position={[0,-2,0]}>
      <waveMaterial ref={ref}/>
      {/* <meshStandardMaterial color={"grey"} /> */}
    </mesh>

  )
}





  

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
