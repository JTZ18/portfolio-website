import React, { useEffect, useRef, useState } from 'react';
import * as THREE from "three"
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

function Model({ scroll, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/forest_website.glb")
  const { actions } = useAnimations(animations, group)
  console.log(nodes)
  console.log(materials)
  const items = [nodes]
  const i = items.length
  //debugger;

  useFrame((state) => {
    // actions["CameraAction"].time = THREE.MathUtils.lerp(actions["CameraAction"].time, actions["CameraAction"].getClip().duration * scroll.current, 0.05)
    // group.current.children[0].children.forEach((child, index) => {
    //   child.material.color.lerp(color.set(hovered === child.name ? "tomato" : "#202020").convertSRGBToLinear(), hovered ? 0.1 : 0.05)
    //   const et = state.clock.elapsedTime
    // })
  })

  return (
    <group ref={group}>
      <group
        position={[0,0,0]}
        rotation={[-1.57079632679,0,0]}
        scale={[0.25, 0.25, 0.25]}>
        <mesh name="Mesh_0" geometry={nodes.Mesh_0.geometry} material={materials.map_1blinn6SG} />
        <mesh name="Mesh_0001" geometry={nodes.Mesh_0001.geometry} material={materials["map_1blinn6SG.001"]} />
        <mesh name="Mesh_1" geometry={nodes.Mesh_1.geometry} material={materials.map_1lambert4SG} />
        <mesh name="Mesh_0002" geometry={nodes.Mesh_4.geometry} material={materials["map_1blinn6SG.002"]} />
        <mesh name="Mesh_2" geometry={nodes.Mesh_2.geometry} material={materials.map_1object} />
        <mesh name="Mesh_3" geometry={nodes.Mesh_3.geometry} material={materials.map_1object} />
        <mesh name="Mesh_4" geometry={nodes.Mesh_4.geometry} material={materials.map_1lambert5SG} />
        <mesh name="Mesh_1001" geometry={nodes.Mesh_1001.geometry} material={materials["map_1lambert4SG.001"]} />
        <mesh name="Mesh_1002" geometry={nodes.Mesh_1002.geometry} material={materials["map_1lambert4SG.002"]} />
        <mesh name="Mesh_2001" geometry={nodes.Mesh_2001.geometry} material={materials["map_1object.001"]} />
        <mesh name="Mesh_2002" geometry={nodes.Mesh_2002.geometry} material={materials["map_1object.002"]} />
        <mesh name="Mesh_3001" geometry={nodes.Mesh_3001.geometry} material={materials["map_1object.001"]} />
        <mesh name="Mesh_3002" geometry={nodes.Mesh_3002.geometry} material={materials["map_1object.002"]} />
        <mesh name="Mesh_3001" geometry={nodes.Mesh_3001.geometry} material={materials["map_1object.001"]} />
        <mesh name="Mesh_4001" geometry={nodes.Mesh_4001.geometry} material={materials["map_1lambert5SG.001"]} />
        <mesh name="Mesh_4002" geometry={nodes.Mesh_4002.geometry} material={materials["map_1lambert5SG.002"]} />
        <primitive object={nodes.RootNode} rotation={[1.57079632679,0,0]}/>
        <mesh name="Sphere" geometry={nodes.Sphere.geometry} material={materials["Sphere_Material001_0"]} />
      </group>
      <group position={[4.1,-0.3,0]} scale={[0.25, 0.25, 0.25]} rotation={[-1.57079632679,0,0]}>
        <primitive object={nodes["RootNode_(gltf_orientation_matrix)"]}/>
        <primitive object={nodes["RootNode_(gltf_orientation_matrix)001"]}/>
        <primitive object={nodes["RootNode_(gltf_orientation_matrix)002"]}/>
        <primitive object={nodes["RootNode_(gltf_orientation_matrix)003"]}/>
      </group>
      <group position={[-4.1,-0.3,0]} scale={[0.25, 0.25, 0.25]} rotation={[-1.57079632679,0,0]}>
        <primitive object={nodes["RootNode_(model_correction_matrix)"]}/>
        <primitive object={nodes["RootNode_(model_correction_matrix)001"]}/>
        <primitive object={nodes["RootNode_(model_correction_matrix)002"]} />
        <primitive object={nodes["RootNode_(model_correction_matrix)003"]}/>
      </group>
      <group name="Camera" position={[-1.78, 2.04, 23.58]} rotation={[1.62, 0.01, 0.11]}>
        <PerspectiveCamera far={100} near={0.1} fov={28} rotation={[-Math.PI / 2, 0, 0]}>
          <directionalLight
            castShadow
            position={[10, 20, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={2}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
      </group>
    </group>
  );
}

export default Model;

useGLTF.preload('/forest_website.glb')