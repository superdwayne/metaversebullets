import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations, PerspectiveCamera, Float } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

export default function Model({ scroll, ...props }) {


    useFrame((state, delta) => {
      // console.log(delta)
    actions.Orbit.play()
      
    
       });


  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./planets-v4.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => void (actions["CAMERA"].play().paused = true), [])

  console.log(actions)
  useFrame((state) => {
    actions["CAMERA"].time = THREE.MathUtils.lerp(actions["CAMERA"].time, actions["CAMERA"].getClip().duration * scroll.current, 0.05)
    group.current.children[0].children.forEach((child, index) => {
      // child.material.color.lerp(color.set(hovered === child.name ? "tomato" : "#202020").convertSRGBToLinear(), hovered ? 0.1 : 0.05)
      const et = state.clock.elapsedTime
      //Floating effect
      // child.position.y = Math.sin((et + index * 2000) / 2) * 1
      // child.rotation.x = Math.sin((et + index * 2000) / 3) / 10
      // child.rotation.y = Math.cos((et + index * 2000) / 2) / 10
      // child.rotation.z = Math.sin((et + index * 2000) / 3) / 10
    })
  })


  return (
   
    <group ref={group} {...props} dispose={null}>
    <group name="Scene">
      <group name="Sphere004" position={[-0.78, 3.05, 0]} scale={1.48} />
      <group name="Sphere005" position={[1.59, 0.8, 0]} rotation={[0, 0, -2.16]} scale={1.69} />
      <group name="Sphere008" position={[3.81, 1.11, 0.52]} scale={2.37} />
      <group name="Planet_Afroditi" position={[-9.22, 14.56, -1.12]} rotation={[-Math.PI / 2, 0, 0]} scale={0.28}>
        <group name="Object_3" position={[0, -0.33, 0]}>
          <mesh name="Object_1" geometry={nodes.Object_1.geometry} material={materials['Material.002']} />
          <mesh name="Object_1_1" geometry={nodes.Object_1_1.geometry} material={materials['Material.001']} />
        </group>
      </group>
      <group name="Alien_Planet" position={[-12.56, 15.73, 13.13]}>
        <group name="Clouds_0" scale={1.02}>
          <mesh name="Object_6" geometry={nodes.Object_6.geometry} material={materials.Clouds} />
        </group>
        <mesh name="Object_4" geometry={nodes.Object_4.geometry} material={materials.Planet} />
      </group>
      <group name="🌏_Planet_Earth" position={[0, -1.09, 0]} scale={0.2}>
        <group name="Moon_Orbit">
          <group name="Moon" position={[0, 10, 10]}>
            <mesh name="Moon_Moon_0" geometry={nodes.Moon_Moon_0.geometry} material={materials.Moon} />
          </group>
        </group>
        <group name="Planet_Earth">
          <group name="Atmosphere">
            <mesh name="Atmosphere_Atmosphere_0" geometry={nodes.Atmosphere_Atmosphere_0.geometry} material={materials.Atmosphere} />
          </group>
          <group name="Earth001">
            <mesh name="Earth_Earth_0" geometry={nodes.Earth_Earth_0.geometry} material={materials.Earth} />
          </group>
        </group>
        <group name="Telescope_Orbit" position={[0, 5.53, 0]}>
          <group name="Hubble_Telescope" position={[0, 0, -7]}>
            <group name="Big">
              <mesh name="Big_Big_Detail_0" geometry={nodes.Big_Big_Detail_0.geometry} material={materials.Big_Detail} />
            </group>
            <group name="Small">
              <mesh name="Small_Small_Detail_0" geometry={nodes.Small_Small_Detail_0.geometry} material={materials.Small_Detail} />
              <mesh name="Small_Small_Detail_0001" geometry={nodes.Small_Small_Detail_0001.geometry} material={materials.Small_Detail} />
              <mesh name="Small_Small_Detail_0002" geometry={nodes.Small_Small_Detail_0002.geometry} material={materials.Small_Detail} />
            </group>
          </group>
        </group>
      </group>
      <PerspectiveCamera name="Camera" makeDefault far={100} near={0.1} fov={22.9} position={[18.49, 2.03, -1.06]} rotation={[-2.19, 1.4, 2.17]} scale={[0.82, 1, 0.85]} />
      <spotLight name="Light" intensity={10} angle={1.89} penumbra={0.01}  position={[1.1, 20.05, 13.48]} rotation={[-1.74, 0.12, 1.94]} scale={[0.88, 0.38, 0.94]}>
      
     </spotLight>
      <mesh name="Mercury_planet_(brass_stylised)" geometry={nodes['Mercury_planet_(brass_stylised)'].geometry} material={materials.Material_2} position={[0.52, 13.78, 14.4]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
     <mesh name="lava_planet" geometry={nodes.lava_planet.geometry} material={materials.DefaultMaterial} position={[-0.66, 8.8, -10.41]} />
    </group>
  </group>
  )
}

useGLTF.preload('./planets-v4.glb')