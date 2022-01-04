import React, {  useRef , Suspense, useEffect} from 'react'
import { Canvas, useFrame, extend, useThree, } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './App.css';
import { VRCanvas } from '@react-three/xr'
import ReactGA from 'react-ga';
import Decrypt from "./Functions/decrypt"
import Decentraland from "./Functions/decentraland"
import BlanklessHQ from "./Functions/blanklesshq"
import Theverge from "./Functions/theverge"
import ARpost from "./Functions/arpost"
import useMouse from '@react-hook/mouse-position'
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
    <VRCanvas ref={target} style={{ backgroundColor: "#000000" , height: "290vh", width: "100vw", position: "absolute" , zIndex: 9 }}>
    <Suspense fallback={'Initializing'}>
    
    <CameraControls />
       <Box/>
       <ambientLight args={[0xffffff]} intensity={0.97}  />
    </Suspense>
   </VRCanvas>
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



function App() {

  useEffect(() => { initGA(); }, []);

  const elements = [
    {
      api: <Decrypt />,
      img:"https://renderapi.s3.amazonaws.com/WGUuFo8ab.png",
      title: "DECRYPT"
    },
    {
    api: <BlanklessHQ />,
    img:"https://renderapi.s3.amazonaws.com/xxo86RThN.png",
    title: "BANKLESSHQ"
  },
  {
    api: <Decentraland />,
    img:"https://renderapi.s3.amazonaws.com/F2WuCu9wE.png",
    title: "DECENTRALAND"
  },
  {
    api: <Theverge />,
    img:"https://renderapi.s3.amazonaws.com/r6QoNHjuY.png",
    title: "THE VERGE"
  },
  {
    api: <ARpost />,
    img:"https://renderapi.s3.amazonaws.com/YgXYoXVqp.png",
    title: "THE AR POST"
  }
]


   
  const ArticleLoop = Object.keys(elements).map((title, i) => {

    if (i % 2) {
      return (
        <section className="scrapped"  >
            <section className="ava" >
              <img src={elements[i].img} alt="" />
            </section>
            <section>
              <h1> LATEST NEWS FROM {elements[i].title}</h1>
              {elements[i].api}
            </section>
        </section>
       
      );
    } else {
      return (
        <section className="scrapped"  >
          <section>
            <h1>LATEST NEWS FROM {elements[i].title}</h1>
            {elements[i].api}
          </section>
          <section className="ava" >
            <img src={elements[i].img} alt="" />
          </section>
        </section>
      );
    }
  })


  return (
    <div className="App">

    <Tron />

    <section className="dpm" >
   
      <header>
            <h1>METAVERSE BITES</h1>
            <h6>VERSION 3.0.1</h6>
        </header>

{/*      
          {ArticleLoop} */}
     
                {/* <section className="scrapped">

                <section>
                    <h1>HYPEBEAST</h1>
                    <Hypebeast />
                  </section>
                 
                  <section className="ava">
                    <img src="https://renderapi.s3.amazonaws.com/fVHpQzUMz.png" alt="" />
                  </section>

                </section>  */}
               </section>

    </div>

  );
}

export default App;
