import React, { useState, Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three'
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, useGLTF, useFBX, useAnimations, OrbitControls, useTexture, Loader } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Bounds, GizmoHelper, GizmoViewport, Box } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { useAnimatedSprite } from 'use-animated-sprite';
import { PlainAnimator } from "three-plain-animator/lib/plain-animator"
// import Model from './Model'
import Overlay from "./Overlay"
import Model from './components/Forest_website'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CloseIcon from '@material-ui/icons/Close';
import AboutContent from './components/AboutContent';
import TeslaContent from './components/TeslaContent';
import DisneyContent from './components/DisneyContent';
import Liv3lyContent from './components/Liv3lyContent';
import GeckoContent from './components/GeckoContent';
import roboto from './Roboto Black_Regular'


extend({TextGeometry})

function TestApp() {
    const scroll = useRef(0)
    const overlay = useRef()
    const caption = useRef()
    const [aboutStatus, setAboutStatus] = useState(false);
    const [teslaStatus, setTeslaStatus] = useState(false);
    const [disneyStatus, setDisneyStatus] = useState(false);
    const [liv3lyStatus, setLiv3lyStatus] = useState(false);
    const [geckoStatus, setGeckoStatus] = useState(false);
    //debugger;

    const font = new FontLoader().parse(roboto);
    
  return (
      <>
        {/* <Canvas shadows onCreated={(state) => state.events.connect(overlay.current)}
        raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}> */}
        <Canvas shadows >
          {/* <OrbitControls makeDefault={true} position={[0,0,0]}/> */}
          <ambientLight intensity={1.5} />
          <spotLight angle={0.14} color="#ffd0d0" penumbra={1} position={[500, 4000, 0]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />

          <Suspense fallback={null}>
            <ScrollControls pages={40}>
              <mesh position={[-9., 15, 30]} rotation={[0.4, 0.74, -0.20]}>
                <textGeometry args={['Jon', {font, size:2, height:1}]} />
                <meshPhongMaterial attach="material" color={"yellow"} />
              </mesh>
              <mesh position={[-11.0, 12, 30]} rotation={[0.4, 0.74, -0.20]}>
                <textGeometry args={['Taylor', {font, size:2, height:1}]} />
                <meshPhongMaterial attach="material" color={"yellow"} />
              </mesh>
              <Model 
              aboutStatus={aboutStatus} setAboutStatus={setAboutStatus}
              teslaStatus={teslaStatus} setTeslaStatus={setTeslaStatus}
              disneyStatus={disneyStatus} setDisneyStatus={setDisneyStatus}
              liv3lyStatus={liv3lyStatus} setLiv3lyStatus={setLiv3lyStatus}
              geckoStatus={geckoStatus} setGeckoStatus={setGeckoStatus}
              />
            </ScrollControls>
          </Suspense>
        </Canvas>
        <Loader />
        
        <About
          variants={containerVariants}
          animate={aboutStatus ? "visible" : "hidden"}>
          <CloseWrapper>
                    <CustomClose onClick={() => setAboutStatus(false)}/>
          </CloseWrapper>
          <AboutContent />
        </About>

        <About
          variants={containerVariants}
          animate={teslaStatus ? "visible" : "hidden"}>
          <CloseWrapper>
                    <CustomClose onClick={() => setTeslaStatus(false)}/>
          </CloseWrapper>
          <TeslaContent />
        </About>

        <About
          variants={containerVariants}
          animate={disneyStatus ? "visible" : "hidden"}>
          <CloseWrapper>
                    <CustomClose onClick={() => setDisneyStatus(false)}/>
          </CloseWrapper>
          <DisneyContent />
        </About>

        <About
          variants={containerVariants}
          animate={liv3lyStatus ? "visible" : "hidden"}>
          <CloseWrapper>
                    <CustomClose onClick={() => setLiv3lyStatus(false)}/>
          </CloseWrapper>
          <Liv3lyContent />
        </About>

        <About
          variants={containerVariants}
          animate={geckoStatus ? "visible" : "hidden"}>
          <CloseWrapper>
                    <CustomClose onClick={() => setGeckoStatus(false)}/>
          </CloseWrapper>
          <GeckoContent />
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

  @media only screen and (max-width: 1000px) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    border-radius: 0px;
  }
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

