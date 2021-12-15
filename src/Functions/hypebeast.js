import React, {  useState, useEffect} from 'react'
import Request from "../requests";
import Loader from "./loader"

function Hypebeast() {
  
  const [loading, setLoading] = useState(false);
  const [beast, setThebeast] = useState(null);

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
     

      Request(`/api/hypebeast`, params, (response) => {

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
               <h4>{res[i].preview}</h4>
             </a>
           </span>
           );
       })
              
       setThebeast(formattedArr2.slice(0,4))
            
    })

    setLoading(false)
    
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    
    loading ?  beast : <Loader />  
    );
  
}


export default Hypebeast;