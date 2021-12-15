import React, {  useState, useEffect} from 'react'
import Request from "../requests";
import Loader from "./loader"

function ARpost() {
  
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
                
         setThexr(formattedArr.slice(0,6))
              
      })
  
      setLoading(false)
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      
      loading ?  thexr : <Loader />  
      );
    
  }


  export default ARpost;