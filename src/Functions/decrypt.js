
import React, {  useState, useEffect} from 'react'
import Request from "../requests";
import Loader from "./loader"

function Decrypt()  {
  
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
  
  
        Request(`api/decrypt`, params, (response) => {
  
          setLoading(true)
  
          console.log(response , "DE"  )
          
          let shape = JSON.parse(JSON.stringify(response))
  
         console.log(shape , "loading"  )
         
         if (shape.length === 0) {
           console.log('No articles')
           window.location.reload(); 
  
         }
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
  
        setShapes(formattedArr.slice(0,4));
  
         
      });
  
      setLoading(false)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
  
    return (
       loading ? shapes : <Loader /> 
       
    )
    
  }
  
export default Decrypt;