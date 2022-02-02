import React, { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import Model from "./Model"

function TestApp() {
    const scroll = useRef(0)
  return (
      <>
        <Canvas
        shadows
        raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}>
            <ambientLight intensity={1} />
            <Suspense fallback={null}>
            <Model scroll={scroll} />
            </Suspense>
        </Canvas>
      </>
  );
}

export default TestApp;
