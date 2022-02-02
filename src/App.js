import * as THREE from 'three'
import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, useGLTF, useAnimations } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Bounds, PerspectiveCamera } from '@react-three/drei'

export default function App() {
  return (
    <Canvas dpr={[1, 2]} shadows>
      <ambientLight intensity={1} />
      {/* <fog attach="fog" args={['#ff5020', 5, 18]} /> */}
      <spotLight angle={0.14} color="#ffd0d0" penumbra={1} position={[25, 50, -20]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
      <Sky scale={1000} sunPosition={[2, 0.4, 10]} />
      <Suspense fallback={null}>
        {/* Wrap contents you want to scroll into <ScrollControls> */}
        <ScrollControls pages={3}>
          <Bounds fit clip>
            <Scene scale={0.4} position={[0, 0, 0]} />
          </Bounds>
        </ScrollControls>
      </Suspense>
    </Canvas>
  )
}

function Scene({ ...props }) {
  // This hook gives you offets, ranges and other useful things
  const scroll = useScroll()
  const group = useRef()
  // latest update check vr code sandbox https://codesandbox.io/s/camera-scroll-tu24h?file=/src/App.js:295-301
  // used scroll as ref instead of useScroll() didnt even use scroll controls
  const { scene, nodes, animations } = useLoader(GLTFLoader,'/forest_website.glb')
  console.log(animations)
  console.log(scene)
  const { actions } = useAnimations(animations, scene)
  console.log("actions:",actions)
  console.log(actions["CameraAction"])
  //for shadows
  useLayoutEffect(() => Object.values(nodes).forEach((node) => (node.receiveShadow = node.castShadow = true)))
  useEffect(() => void (actions["CameraAction"].play().paused = true), [])
  useFrame((state, delta) => {
    const action = actions["CameraAction"]
    // The offset is between 0 and 1, you can apply it to your models any way you like
    const offset = 1 - scroll.offset
    action.time = THREE.MathUtils.damp(action.time, (action.getClip().duration / 2) * offset, 100, delta)
    state.camera.position.set(Math.sin(offset) * -10, Math.atan(offset * Math.PI * 2) * 5, Math.cos((offset * Math.PI) / 3) * -10)
    state.camera.lookAt(0, 0, 0)
    actions["CameraAction"].time = THREE.MathUtils.lerp(actions["CameraAction"].time, actions["CameraAction"].getClip().duration * scroll.current, 0.05)
    //console.log(actions["CameraAction"].time)

  })
  return (
    <group ref={group}>
      <group name="Camera">
          <PerspectiveCamera makeDefault far={100} near={0.1} fov={28}/>
      </group>
      <primitive object={scene} {...props} />
    </group>
  )
}

/*
author: glenatron (https://sketchfab.com/glenatron)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/94b24a60dc1b48248de50bf087c0f042
title: Littlest Tokyo */
useGLTF.preload('/forest_website.glb')
