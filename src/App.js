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
     <h1>Metaverse universe</h1>
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


