import React, { useLayoutEffect , useRef , Suspense,  useState, useEffect} from 'react'
import ReactDOMServer from 'react-dom/server'
import { Canvas,
  useFrame,
  extend,
  useThree, } from '@react-three/fiber'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Request from "./api/requests";
import './App.css';
import * as THREE from 'three'
import { TetrahedronGeometry } from 'three';

extend({ OrbitControls }); 


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
      // position={[0.5, -0.7, 0]}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

function Line({ start, end }) {
  const ref = useRef()
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="hotpink" />
    </line>
  )
}

function Title()  {
  
  const loading = useRef(false);
  const [shapes, setShapes] = useState(null);

  useEffect(() => {

    loading.current = true;
    
    console.log("inital load" , loading)

    const params = {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    // console.log("Component mounting.." , loading)
    
    console.log("Component mounting..",  loading )

    if (loading.current === true) {

      Request(`http://localhost:5000/api/index`, params, (response) => {
        
        let shape = response

        console.log("retrieved data" , loading  )

        setShapes(shape);

      console.log(shape, "before formatting")

      const formattedArr = shape.map((title, i) => {
        return <h1 key={i} >{title}</h1>;
    })


    

      setShapes(formattedArr.slice(0,3));

    
      console.log(formattedArr, "after formatting")
      
        loading.current = false;
        console.log("End data" , loading  )
    });

  } else {
    console.log('no data yet')
  }

  }, []);

  return (
    
    shapes
  )
  
}

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

function Shapetest() {
  const myMesh = React.useRef()

  useFrame(() => {
   
  })

  return (
    <mesh ref={myMesh}  wireframe="true"  >
      {/* <octahedronGeometry args={[2, 2, 2]}  /> */}
      <tetrahedronGeometry args={[3, 3, 3]}  smoothness={4} />
      <meshStandardMaterial attach="material"  wireframe={true} color={"#ff00ff"} />
    </mesh>
    
  )
}

function Tron(){
  return(
    <Canvas style={{ backgroundColor: "#000000" , height: "100vh", width: "100vw" }}>
     <Suspense fallback={'Loading'}>
     <CameraControls />
     {/* <Shapetest/> */}
        <Box/>
        <ambientLight args={[0xffffff]} intensity={0.97}  />
     </Suspense>
    </Canvas>
  )
}

function App() {
  return (
    <div className="App">
   

    <Tron />
   
      <header>
            <h1>METAVERSE WEEKLY BULLET</h1>
            <h6>VERSION 3.0</h6>
        </header>
        
          <section className="scrapped">
          
              <section>
              <h1>LATEST NEWS FROM BANKLESSHQ</h1>
                <Title />
                </section>
              <section className="ava" >
                <img  src="https://renderapi.s3.amazonaws.com/xxo86RThN.png" alt="" />
              </section>
          </section>  
      
    </div>

  );
}

export default App;
