import React, {  useRef , Suspense,  useState, useEffect} from 'react'
import { Canvas,
  useFrame,
  extend,
  useThree, } from '@react-three/fiber'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Request from "./requests";
import './App.css';

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
  return(
    <Canvas style={{ backgroundColor: "#000000" , height: "200vh", width: "100vw" }}>
     <Suspense fallback={'Loading'}>
     <CameraControls />
     {/* <Shapetest/> */}
        <Box/>
        <ambientLight args={[0xffffff]} intensity={0.97}  />
     </Suspense>
    </Canvas>
  )
}

function Articles()  {
  
  const loading = useRef(false);
  const [shapes, setShapes] = useState(null);

  useEffect(() => {

    console.log(process.env.NODE_ENV)

    loading.current = true;
    
    console.log("inital load" , loading)

    const params = {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    console.log("Component mounting..",  loading )


      Request(`/banklesshq`, params, (response) => {
        
        let shape = JSON.parse(JSON.stringify(response))

       // console.log(shape , "loading"  )

        // setShapes(Object.keys(shape));

     // console.log(shape[0].atricleurl, "before formatting")


      const formattedArr = Object.keys(shape).map((title, i) => {
        return (
        <span key={i}>
          <a href={shape[i].atricleurl} target="_blank" rel="noreferrer">
            <h1>{shape[i].title}</h1>
            <h4>{shape[i].preview}</h4>
          </a>
        </span>
        );
    })

      setShapes(formattedArr.slice(0,3));
    
    //  console.log(formattedArr, "after formatting")

        loading.current = false;
        console.log("End data" , loading  )
    });

 

  }, []);

  return (
    
    shapes
  )
  
}

// function Theverge() {
  
//   const loading = useRef(false);
//   const [theverge, setTheverge] = useState(null);

//   useEffect(() => {

//     loading.current = true;
//     console.log("inital load" , loading)

//     const params = {
//       method: 'GET',
//       body: JSON.stringify(),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };
    
//     console.log("Component mounting..",  loading )

//       Request(`/theverge`, params, (response) => {


//         console.log(response, "after formatting") 

//           const formattedArr = Object.keys(response).map((title, i) => {
//           return (
//            <span key={i}>
//              <a href={response[i].url} target="_blank" rel="noreferrer">
//                <h1>{response[i].title}</h1>
//                {/* <h4>{response[i].preview}</h4> */}
//              </a>
//            </span>
//            );
//        })
              
//        setTheverge(formattedArr.slice(0,3))
            
//     })

//   }, []);

//   return (theverge);
  
// }


// function Xr() {
  
//   const loading = useRef(false);
//   const [thexr, setThexr] = useState(null);

//   useEffect(() => {

//     loading.current = true;
//     console.log("inital load" , loading)

//     const params = {
//       method: 'GET',
//       body: JSON.stringify(),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };
    
//     console.log("Component mounting..",  loading )

//       Request(`http://localhost:5000/api/xrtoday`, params, (response) => {


//         // console.log(response) 

//           const formattedArr = Object.keys(response).map((title, i) => {
//           return (
//            <span key={i}>
//              <a href={response[i].url} target="_blank" rel="noreferrer">
//                <h1>{response[i].title}</h1>
//              </a>
//            </span>
//            );
//        })
              
//        setThexr(formattedArr.slice(0,3))
            
//     })

//   }, []);

//   return (thexr);
  
// }

function App() {
  return (
    <div className="App">
   

    <Tron />
   
      <header>
            <h1>METAVERSE BITES</h1>
            <h6>VERSION 3.0</h6>
        </header>
        
          <section className="scrapped">
          
              <section>
              <h1>LATEST NEWS FROM BANKLESSHQ</h1>
                <Articles />
                </section>
              <section className="ava" >
                <img  src="https://renderapi.s3.amazonaws.com/xxo86RThN.png" alt="" />
              </section>
          </section>  
      


          <section className="scrapped">
                 
                 <section className="ava">
                   <img src="https://renderapi.s3.amazonaws.com/r6QoNHjuY.png" alt="" />
                 </section>
                 
                 <section>
                 <h1>LATEST NEWS FROM FORTNITE(VIA VERGE)</h1>
                 {/* <Theverge /> */}
                 </section>

               </section>
          {/* 


                <section className="scrapped">

                <section>
                    <h1>LATEST NEWS FROM XRTODAY</h1>
                    <Xr />
                  </section>
                 
                  <section className="ava">
                    <img src="https://renderapi.s3.amazonaws.com/NPOS2i2y9.png" alt="" />
                  </section>

                </section> */}


    </div>

  );
}

export default App;
