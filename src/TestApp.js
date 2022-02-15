import React, { useState, Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, useGLTF, useFBX, useAnimations, OrbitControls, useTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Bounds, GizmoHelper, GizmoViewport, Box } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useAnimatedSprite } from 'use-animated-sprite';
import { PlainAnimator } from "three-plain-animator/lib/plain-animator"
// import Model from './Model'
import Overlay from "./Overlay"
import Model from './components/Forest_website'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CloseIcon from '@material-ui/icons/Close';

function TestApp() {
    const scroll = useRef(0)
    const overlay = useRef()
    const caption = useRef()
    const [aboutStatus, setAboutStatus] = useState(false);
    //debugger;
  return (
      <>
        {/* <Canvas shadows onCreated={(state) => state.events.connect(overlay.current)}
        raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}> */}
        <Canvas shadows >
          {/* <OrbitControls /> */}
          <ambientLight intensity={1.5} />
          <spotLight angle={0.14} color="#ffd0d0" penumbra={1} position={[500, 4000, 0]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
          <Suspense fallback={null}>
            <ScrollControls pages={50}>
              <Model aboutStatus={aboutStatus} setAboutStatus={setAboutStatus}/>
            </ScrollControls>
          </Suspense>
        </Canvas>
        <About
          variants={containerVariants}
          animate={aboutStatus ? "visible" : "hidden"}>
          <CloseWrapper>
                    <CustomClose onClick={() => setAboutStatus(false)}/>
          </CloseWrapper>
          This is some details. jfiejfoijwaoifejoaeijfoeiwsjfoeisjfoasiejfosiejfo
        </About>
        {/* <Overlay ref={overlay} caption={caption} scroll={scroll} /> */}
      </>
  );
}


export default TestApp;

// css styling for center div
const About = styled(motion.div)`
  position: fixed;
  top: 25%;
  left: 25%;
  color: white;    
  background: rgba(0,0,0,0.7);
  border-radius: 15px;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  width: 50vw;
  height: 50vh;
  z-index: 16;
  list-style: none;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  text-align: start;
`

const CustomClose = styled(CloseIcon)`
    cursor: pointer;
`
const CloseWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

const containerVariants = {
  hidden: { 
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1, type: 'spring', stiffness: 120
    }
  }
}

