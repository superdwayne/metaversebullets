import React, {  useRef , Suspense, useEffect} from 'react'
import {  Stars, Html, useProgress   } from '@react-three/drei'
import { Canvas, useFrame, extend, useThree, } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './App.css';
import './planets.css';
import * as THREE from "three";


import ReactGA from 'react-ga';

import useMouse from '@react-hook/mouse-position'

import Avatar from './Avatars/avatars'
import Overlay from './overlay'

extend({ OrbitControls }); 


const initGA = () => { 
 ReactGA.initialize('UA-102019824-2') 
 ReactGA.pageview(window.location.pathname + window.location.search);
} 


const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      position={[0.5, -0.7, 0]}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

function Box() {
  const myMesh = React.useRef()

  useFrame(() => {
   
  })

  return (
    <mesh ref={myMesh}  wireframe="true" rotation={[ 2, 0, 0]} scale={[2, 30, 50]}>
      <planeGeometry args={[50, 50 , 50]}  />
      <meshStandardMaterial attach="material"  wireframe={true} color={"#ff00ff"} />
    </mesh>
    
  )
}



function Tron(){
  const target = React.useRef(null)
  
  const mouse = useMouse(target, {
    fps: 60,
    enterDelay: 100,
    leaveDelay: 100,
  })


  if (mouse.isOver) {
    return(
    <Canvas ref={target} style={{ backgroundColor: "#000000" , height: "290vh", width: "100vw", position: "absolute" , zIndex: 9 }}>
    <Suspense fallback={'Initializing'}>
    
    <CameraControls />
    
       <Box/>
       <ambientLight args={[0xffffff]} intensity={0.97}  />
    </Suspense>
   </Canvas>
    )

  } else {

    return(

    <Canvas ref={target} style={{ backgroundColor: "#000000" , height: "290vh", width: "100vw", position: "absolute" , zIndex: -9 }}>
    <Suspense fallback={'Initializing'}>
    
    <CameraControls />
       <Box/>
       <ambientLight args={[0xffffff]} intensity={0.97}  />
    </Suspense>
   </Canvas>

    )
  }
   
}


export default function App() {




  useEffect(() => { initGA(); }, []);

 


  

  const overlay = useRef()
  const caption = useRef()
  const scroll = useRef(0)

  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    return (
    <Html center> 
    <header>
     <h1>Metaverse bullets</h1>
    </header> 
    
    <header style={{
    position: "relative",
    color: "black",
    width: '800px',
    backgroundColor: "white",
    Margin: "10px auto",
    borderLeft: `${progress * 8}px solid #000`,
    display: "flex",

    }}>
       <h2> {progress} % {active ? null : 'loading'} </h2>
    </header> 

      
    {/* <Canvas className='Loader-Canvas' style={{backgroundColor: "black" , display: "block" , height: "100vh", width: "100vw"}}>
      <Suspense fallback={null} >

        <Swing />
      
      </Suspense>
    </Canvas> */}
    
    </Html>
    )
  }

  return (

    <>
    <Canvas style={{backgroundColor: "black" , display: "block" , height: "100vh", width: "100vw"}}>

        <ambientLight intensity={0.8} />
       <Suspense fallback={<Loader />} >
          <Avatar scroll={scroll} />      
        </Suspense>

      </Canvas>
      <Overlay ref={overlay} caption={caption} scroll={scroll} />

    </>

  );
}


