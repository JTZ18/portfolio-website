import * as THREE from 'three'
import { Suspense, useEffect, useLayoutEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, useGLTF, useFBX, useAnimations, OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Bounds, GizmoHelper, GizmoViewport, Box } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

export default function NewApp() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [0,2.5,10], near: 0.1, far: 1000 }}>
        <OrbitControls />
        <ambientLight intensity={1} />
        <Sky scale={1000} sunPosition={[2, 0.4, 10]} />
        <spotLight angle={0.14} color="#ffd0d0" penumbra={1} position={[500, 4000, 0]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
        <GizmoHelper
            alignment="bottom-right" // widget alignment within scene
            margin={[80, 80]} // widget margins (X, Y)
            >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
        {/* alternative: <GizmoViewcube /> */}
        </GizmoHelper>
        <Suspense fallback={null}>
            <BuildingGLB scale={10} position={[0, 0, 0]} />
            {/* <Box>
                <meshPhongMaterial attach="material" color="#f3f3f3" />
            </Box> */}
        </Suspense>
    </Canvas>
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

function Forrest({ ...props }) {
  // This hook gives you offets, ranges and other useful things
  const { scene, nodes, animations } = useLoader(GLTFLoader,'/forest_website.glb')
  console.log(animations)
  console.log(scene)
  //for shadows
  return <primitive object={scene} {...props} />
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
useGLTF.preload('/building.glb')
// useFBX.preload('/building.fbx')
// useGLTF.preload('/forest_website.glb')
