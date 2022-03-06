import React, {  useRef , Suspense, useEffect} from 'react'
import { useGLTF, useAnimations,   } from '@react-three/drei'
import { Canvas, useFrame, extend, useThree, } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './App.css';
import * as THREE from "three";
import getMouseDegrees from './Hooks/utils';
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

    <VRCanvas ref={target} style={{ backgroundColor: "#000000" , height: "290vh", width: "100vw", position: "absolute" , zIndex: -9 }}>
    <Suspense fallback={'Initializing'}>
    
    <CameraControls />
       <Box/>
       <ambientLight args={[0xffffff]} intensity={0.97}  />
    </Suspense>
   </VRCanvas>

    )
  }
   
}


function App() {


  const mouse = useRef({ x: 0, y: 0 })


  useEffect(() => { initGA(); }, []);

  const elements = [
    {
      api: <Decrypt />,
      img:"https://renderapi.s3.amazonaws.com/WGUuFo8ab.png",
      title: "DECRYPT",
      avatar: <Model scale={[9,9,9]}  mouse={mouse}  />
    },
    {
    api: <BlanklessHQ />,
    img:"https://renderapi.s3.amazonaws.com/xxo86RThN.png",
    title: "BANKLESSHQ",

    
  },
  {
    api: <Decentraland />,
    img:"https://renderapi.s3.amazonaws.com/F2WuCu9wE.png",
    title: "DECENTRALAND",

  },
  {
    api: <Theverge />,
    img:"https://renderapi.s3.amazonaws.com/r6QoNHjuY.png",
    title: "THE VERGE",

  },
  {
    api: <ARpost />,
    img:"https://renderapi.s3.amazonaws.com/nXvD33hNk.png",
    title: "THE AR POST",

  }
]

function moveJoint(mouse, joint, degreeLimit = 40) {
  let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit)
  joint.rotation.xD = THREE.MathUtils.lerp(joint.rotation.xD || 0, degrees.y, 0.1)
  joint.rotation.yD = THREE.MathUtils.lerp(joint.rotation.yD || 0, degrees.x, 0.1)
  joint.rotation.x = THREE.Math.degToRad(joint.rotation.xD)
  joint.rotation.y = THREE.Math.degToRad(joint.rotation.yD)
}

function Model({mouse, ...props }) {

  const { camera, gl: { domElement } } = useThree();
  
    useEffect(() => {
  
      actions.CHILL.play()
      group.current.position.x = 0;
      group.current.position.y = -1.7;
      group.current.position.z = 0;
  
       });
   
    const group = React.useRef()
    const controls = React.useRef()
  
    const { nodes, materials, animations } = useGLTF('https://cdn-static.farfetch-contents.com/Content/UP/EXPERIENCE/Metaverse/DPM-X-Move.glb')
    
    const { actions } = useAnimations(animations, group)
  
    const { size } = useThree()

    useFrame((state, delta) => {
 
    console.log('Distance' , controls.current.getDistance() )
      controls.current.update()
  
     const mouse = { x: size.width / 2 + (state.mouse.x * size.width) / 2, y: size.height / 2 + (-state.mouse.y * size.height) / 2 }
      moveJoint(mouse, nodes.Head )
    })
   
    return (
      <>
  
  <orbitControls
          ref={controls}
          args={[camera, domElement]}
          enableZoom={false}
          position={[10, 4, 300]}
          minPolarAngle={0}
          enableRotate={true}
          enablePan={false} 
          zoomSpeed={0.5}
          enableDamping={true}
          
        />
        
  <group ref={group} {...props} dispose={null}>
  
        <group position={[-1.68, 0.02, 0.07]}>
          <group position={[0, 1.02, 0.01]} rotation={[0.03, 0, 0]}>
            <group position={[0, 0.1, 0]} rotation={[-0.14, 0, 0]}>
              <group position={[0, 0.13, 0]} rotation={[-0.06, 0, 0]}>
                <group position={[0, 0.12, 0]} rotation={[0.09, 0, 0]}>
                  <group position={[0, 0.16, 0]} rotation={[0.41, 0, 0]}>
                    <group position={[0, 0.12, 0]} rotation={[-0.33, 0, 0]} />
                  </group>
                  <group position={[0.05, 0.14, -0.01]} rotation={[1.56, -0.04, -1.58]}>
                    <group position={[0, 0.12, 0]} rotation={[1, 0.02, -0.14]}>
                      <group position={[0, 0.29, 0]} rotation={[-0.11, 0.02, 0.45]}>
                        <group position={[0, 0.25, 0]} rotation={[0.09, 0.08, -0.04]}>
                          <group position={[-0.03, 0.03, 0.01]} rotation={[0.32, 0.12, 0.85]}>
                            <group position={[0, 0.04, 0]} rotation={[0.06, -0.17, -0.5]}>
                              <group position={[0, 0.03, 0]} rotation={[0.02, -0.05, -0.17]} />
                            </group>
                          </group>
                          <group position={[-0.04, 0.1, -0.01]} rotation={[0.19, -0.09, 0.15]}>
                            <group position={[0, 0.04, 0]} rotation={[0.19, -0.01, 0.05]}>
                              <group position={[0, 0.03, 0]} rotation={[0.17, -0.15, -0.03]} />
                            </group>
                          </group>
                          <group position={[-0.01, 0.1, 0]} rotation={[0.08, -0.13, 0.04]}>
                            <group position={[0, 0.05, 0]} rotation={[0.26, -0.01, 0.09]}>
                              <group position={[0, 0.04, 0]} rotation={[0.4, -0.06, -0.08]} />
                            </group>
                          </group>
                          <group position={[0.02, 0.1, 0]} rotation={[0.12, -0.12, -0.11]}>
                            <group position={[0, 0.04, 0]} rotation={[0.38, -0.01, 0.1]}>
                              <group position={[0, 0.04, 0]} rotation={[0.08, -0.01, 0]} />
                            </group>
                          </group>
                          <group position={[0.04, 0.09, 0.01]} rotation={[0.18, -0.17, -0.3]}>
                            <group position={[0, 0.03, 0]} rotation={[0.29, -0.4, 0.18]}>
                              <group position={[0, 0.02, 0]} rotation={[0.25, -0.02, 0.03]} />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <group position={[-0.05, 0.14, -0.01]} rotation={[1.56, 0.04, 1.58]}>
                    <group position={[0, 0.12, 0]} rotation={[1, -0.02, 0.14]}>
                      <group position={[0, 0.29, 0]} rotation={[-0.11, -0.02, -0.45]}>
                        <group position={[0, 0.25, 0]} rotation={[0.09, -0.08, 0.04]}>
                          <group position={[0.03, 0.03, 0.01]} rotation={[0.32, -0.12, -0.85]}>
                            <group position={[0, 0.04, 0]} rotation={[0.06, 0.17, 0.5]}>
                              <group position={[0, 0.03, 0]} rotation={[0.02, 0.05, 0.17]} />
                            </group>
                          </group>
                          <group position={[0.04, 0.1, -0.01]} rotation={[0.19, 0.09, -0.15]}>
                            <group position={[0, 0.04, 0]} rotation={[0.19, 0.01, -0.05]}>
                              <group position={[0, 0.03, 0]} rotation={[0.17, 0.15, 0.03]} />
                            </group>
                          </group>
                          <group position={[0.01, 0.1, 0]} rotation={[0.08, 0.13, -0.04]}>
                            <group position={[0, 0.05, 0]} rotation={[0.26, 0.01, -0.09]}>
                              <group position={[0, 0.04, 0]} rotation={[0.4, 0.06, 0.08]} />
                            </group>
                          </group>
                          <group position={[-0.02, 0.1, 0]} rotation={[0.12, 0.12, 0.11]}>
                            <group position={[0, 0.04, 0]} rotation={[0.38, 0.01, -0.1]}>
                              <group position={[0, 0.04, 0]} rotation={[0.08, 0.01, 0]} />
                            </group>
                          </group>
                          <group position={[-0.04, 0.09, 0.01]} rotation={[0.18, 0.17, 0.3]}>
                            <group position={[0, 0.03, 0]} rotation={[0.29, 0.4, -0.18]}>
                              <group position={[0, 0.02, 0]} rotation={[0.25, 0.02, -0.03]} />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
            <group position={[0.1, 0.01, 0]} rotation={[-0.02, 0, -3.08]}>
              <group position={[0, 0.46, 0]} rotation={[-0.08, 0, -0.01]}>
                <group position={[0, 0.44, 0]} rotation={[1.06, 0.03, -0.01]}>
                  <group position={[0, 0.15, 0]} rotation={[0.55, -0.07, 0.06]} />
                </group>
              </group>
            </group>
            <group position={[-0.1, 0.01, 0]} rotation={[-0.02, 0, 3.08]}>
              <group position={[0, 0.46, 0]} rotation={[-0.08, 0, 0.01]}>
                <group position={[0, 0.44, 0]} rotation={[1.06, -0.03, 0.01]}>
                  <group position={[0, 0.15, 0]} rotation={[0.55, 0.07, -0.06]} />
                </group>
              </group>
            </group>
          </group>
        </group>
        <primitive object={nodes["Hips"]}  />
        <skinnedMesh
          geometry={nodes.Wolf3D_Facewear001.geometry}
          material={materials.Wolf3D_Facewear}
          skeleton={nodes.Wolf3D_Facewear001.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Glasses001.geometry}
          material={materials['Wolf3D_Glasses.002']}
          skeleton={nodes.Wolf3D_Glasses001.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair001.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair001.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom001.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom001.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear001.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear001.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top001.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top001.skeleton}
        />
        <skinnedMesh
          name="EyeLeft001"
          geometry={nodes.EyeLeft001.geometry}
          material={nodes.EyeLeft001.material}
          skeleton={nodes.EyeLeft001.skeleton}
          morphTargetDictionary={nodes.EyeLeft001.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft001.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight001"
          geometry={nodes.EyeRight001.geometry}
          material={nodes.EyeRight001.material}
          skeleton={nodes.EyeRight001.skeleton}
          morphTargetDictionary={nodes.EyeRight001.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight001.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head001"
          geometry={nodes.Wolf3D_Head001.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head001.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head001.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head001.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth001"
          geometry={nodes.Wolf3D_Teeth001.geometry}
          material={materials['Wolf3D_Teeth.002']}
          skeleton={nodes.Wolf3D_Teeth001.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth001.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth001.morphTargetInfluences}
        />
      </group>
      </>
    )
  }
  useGLTF.preload('https://cdn-static.farfetch-contents.com/Content/UP/EXPERIENCE/Metaverse/DPM-X-Move.glb')
  
  const ArticleLoop = Object.keys(elements).map((title, i) => {

    if (i % 2) {
      return (
        <section className="scrapped">
            <section className="ava">
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
        {/* The logic below is to allow for an avatar to be shown insead of an image, if the avatar is present */}
        { elements[i].avatar ?  
         <Canvas  camera={{ position: [0, 0, 2.75], fov: 20 }}
      pixelRatio={[1, 2]}
   style={{backgroundColor: "white" , display: "block" }}>
          
          <ambientLight />
          
          <pointLight position={[10, 10, 10]} />
          
          <Suspense fallback={null} >
           
             {elements[i].avatar}
               
           </Suspense>
        </Canvas> :
        <img src={elements[i].img} alt="" /> }

         
          
           
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

     
          {ArticleLoop}
     
               
               </section>

    </div>

  );
}

export default App;
