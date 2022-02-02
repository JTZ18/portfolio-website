import React, { useState } from 'react';
import * as THREE from 'three'
import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, useGLTF, useFBX, useAnimations, OrbitControls, useTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Bounds, GizmoHelper, GizmoViewport, Box } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useAnimatedSprite } from 'use-animated-sprite';
import { PlainAnimator } from "three-plain-animator/lib/plain-animator"

export default function NewApp() {
  //debugger;
  return (
    <Canvas dpr={[1, 2]} shadows>
    <OrbitControls/>
        
        <ambientLight intensity={1.5} />
        <Sky scale={1000} sunPosition={[2, 0.4, 10]} />
        <spotLight angle={0.14} color="#ffd0d0" penumbra={1} position={[500, 4000, 0]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
       
        <Suspense fallback={null}>
          <Urns scale={10} position={[0, 0, 0]} />
          <Smoke scale={10} IconPosition={[0, 0, 0]} IconSize={[3, 3, 0.1]} />
        </Suspense>
    </Canvas>
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
