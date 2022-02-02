import React, { useState, Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, useGLTF, useFBX, useAnimations, OrbitControls, useTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Bounds, GizmoHelper, GizmoViewport, Box } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useAnimatedSprite } from 'use-animated-sprite';
import { PlainAnimator } from "three-plain-animator/lib/plain-animator"
import Model from './Model'

function TestApp() {
    const scroll = useRef(0)
    //debugger;
  return (
      <>
        <Canvas shadows >
          <OrbitControls />
          <ambientLight intensity={1.5} />
          <Sky scale={1000} sunPosition={[2, 0.4, 10]} />
          <spotLight angle={0.14} color="#ffd0d0" penumbra={1} position={[500, 4000, 0]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <Model scroll={scroll} />
          </Suspense>
        </Canvas>
      </>
  );
}

export default TestApp;
