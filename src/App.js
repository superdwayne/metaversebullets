import React, {  useRef , Suspense,  useState, useEffect} from 'react'
import { Canvas,
  useFrame,
  extend,
  useThree, } from '@react-three/fiber'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Request from "./requests";
import './App.css';

extend({ OrbitControls }); 


function Loader(){

  return (
    <>
       <img src="https://cdn-static.farfetch-contents.com/Content/UP/EXPERIENCE/Metaverse/littlecog.png" alt="Loading" className="spinner_small" />
        <img src="https://cdn-static.farfetch-contents.com/Content/UP/EXPERIENCE/Metaverse/bigcog.png" alt="Loading" className="spinner_big" />
      </>
  )
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
  
  const [loading, setLoading] = useState(false);
  const [shapes, setShapes] = useState(null);

  useEffect(() => {

    const params = {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
        
      },
    };
    
    console.log("Component mounting..",  loading )


      Request(`/api`, params, (response) => {

        setLoading(true)
        
        let shape = JSON.parse(JSON.stringify(response))

       console.log(shape , "loading"  )
       
       if (shape.length === 0) {
         console.log('No articles')
         window.location.reload(); 

       }
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

       
    });

    setLoading(false)

// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
     loading ? shapes : <Loader /> 
     
  )
  
}

function Theverge() {
  
  const [loading, setLoading] = useState(false);
  const [theverge, setTheverge] = useState(null);

  useEffect(() => {

    console.log("inital load" , loading)

    const params = {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
     

      Request(`/api/theverge`, params, (response) => {
        

        setLoading(true)

        console.log(response, "before formatting") 

        let res = response

        if (res.length === 0) {
          console.log('No articles')
          window.location.reload(); 
 
        }

        console.log(res, "after formatting") 

          const formattedArr2 = Object.keys(res).map((title, i) => {
          return (
           <span key={i}>
             <a href={res[i].url} target="_blank" rel="noreferrer">
               <h1>{res[i].title}</h1>
             </a>
           </span>
           );
       })
              
       setTheverge(formattedArr2.slice(0,4))
            
    })

    setLoading(false)
    
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    
    loading ?  theverge : <Loader />  
    );
  
}

function Xr() {
  
  const [loading, setLoading] = useState(false);
  const [thexr, setThexr] = useState(null);

  useEffect(() => {

    console.log("inital load" , loading)

    const params = {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    console.log("Component mounting..",  loading )

      Request(`api/arpost`, params, (response) => {

        setLoading(true)


        console.log(response) 

          const formattedArr = Object.keys(response).map((title, i) => {
          return (
           <span key={i}>
             <a href={response[i].url} target="_blank" rel="noreferrer">
               <h1>{response[i].title}</h1>
             </a>
           </span>
           );
       })
              
       setThexr(formattedArr.slice(0,3))
            
    })

    setLoading(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    loading ?  thexr : <Loader />  
    );
  
}

// function Hypebeast() {
  
//   const [loading, setLoading] = useState(false);
//   const [beast, setThebeast] = useState(null);

//   useEffect(() => {

//     console.log("inital load" , loading)

//     const params = {
//       method: 'GET',
//       body: JSON.stringify(),
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//     };
     

//       Request(`/api/hypebeast`, params, (response) => {

//         setLoading(true)

//         console.log(response, "before formatting") 

//         let res = response

//         if (res.length === 0) {
//           console.log('No articles')
//           window.location.reload(); 
 
//         }

//         console.log(res, "after formatting") 

//           const formattedArr2 = Object.keys(res).map((title, i) => {
//           return (
//            <span key={i}>
//              <a href={res[i].url} target="_blank" rel="noreferrer">
//                <h1>{res[i].title}</h1>
//                <h4>{res[i].preview}</h4>
//              </a>
//            </span>
//            );
//        })
              
//        setThebeast(formattedArr2.slice(0,2))
            
//     })

//     setLoading(false)
    
// // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);


//   return (
    
//     loading ?  beast : <Loader />  
//     );
  
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
                 <h1>LATEST NEWS FROM THE VERGE</h1>
                 <Theverge />
                 </section>

               </section>
          


                {/* <section className="scrapped">

                <section>
                    <h1>LATEST NEWS FROM HYPEBEAST</h1>
                    <Hypebeast />
                  </section>
                 
                  <section className="ava">
                    <img src="https://renderapi.s3.amazonaws.com/NPOS2i2y9.png" alt="" />
                  </section>

                </section>  */}


                <section className="scrapped">

                <section>
                 <h1>LATEST NEWS FROM THE ARPOST</h1>
                 <Xr />
                 </section>
                 
                 <section className="ava">
                   <img src="https://renderapi.s3.amazonaws.com/YgXYoXVqp.png" alt="" />
                 </section>
                 
              

               </section>
          

  
               
    </div>

  );
}

export default App;
