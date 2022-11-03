import React, { forwardRef } from "react"
import Wired from "./Functions/wired"
import Decentraland from "./Functions/decentraland"
import Inevitable from "./Functions/inevitable"
import Theverge from "./Functions/theverge"
import ARpost from "./Functions/arpost"
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';



const InevitablePosts = [
  {
    api: <Inevitable />,
    title: 'INEVITABLE'
   
  },
]

const InevitablePostsLoop = Object.keys(InevitablePosts).map((title, i) => {

    if (i % 2) {
      return (
        <div style={{ height: "200vh" }}>
        <div className="dot">
              <p> LATEST NEWS FROM {InevitablePosts[i].title}</p>
              <p>{InevitablePosts[i].api}</p>
            </div>
        </div>     
       
       
      );
    } else {
      return (

        <div style={{ height: "200vh" }}>   
          <div className="dot">
              <p>LATEST NEWS FROM {InevitablePosts[i].title}</p>
              <p>{InevitablePosts[i].api}</p>
          </div>  
        </div>
     
      );
    }
  })


  const DecentralandPosts = [
    {
      api: <Decentraland />,
      title: 'DECENTRALAND'
     
    },
  ]

  const DecentralandPostsLoop = Object.keys(DecentralandPosts).map((title, i) => {

    if (i % 2) {
      return (
        <div style={{ height: "200vh" }}>
        <div className="dot" id="right">
              <p> LATEST NEWS FROM {DecentralandPosts[i].title}</p>
              <p>{DecentralandPosts[i].api}</p>
            </div>
        </div>     
       
       
      );
    } else {
      return (

        <div style={{ height: "200vh" }}>   
          <div className="dot" id="right">
              <p>LATEST NEWS FROM {DecentralandPosts[i].title}</p>
              <p>{DecentralandPosts[i].api}</p>
          </div>  
        </div>
     
      );
    }
  })
  

  const WiredPosts = [
    {
      api: <Wired />,
      title: 'WIRED'
     
    },
  ]

  const WiredPostsLoop = Object.keys(WiredPosts).map((title, i) => {

    if (i % 2) {
      return (
        <div style={{ height: "200vh" }}>
        <div className="dot">
              <p> LATEST NEWS FROM {WiredPosts[i].title}</p>
              <p>{WiredPosts[i].api}</p>
            </div>
        </div>     
       
       
      );
    } else {
      return (

        <div style={{ height: "200vh" }}>   
          <div className="dot" id="left">
              <p>LATEST NEWS FROM {WiredPosts[i].title}</p>
              <p>{WiredPosts[i].api}</p>
          </div>  
        </div>
     
      );
    }
  })


  const ThevergePosts = [
    {
      api: <Theverge />,
      title: 'THE VERGE'
     
    },
  ]

  const ThevergePostsLoop = Object.keys(ThevergePosts).map((title, i) => {

    if (i % 2) {
      return (
        <div style={{ height: "200vh" }}>
        <div className="dot" id="right">
              <p> LATEST NEWS FROM {ThevergePosts[i].title}</p>
              <p>{ThevergePosts[i].api}</p>
            </div>
        </div>     
       
       
      );
    } else {
      return (

        <div style={{ height: "200vh" }}>   
          <div className="dot" id="right">
              <p>LATEST NEWS FROM {ThevergePosts[i].title}</p>
              <p>{ThevergePosts[i].api}</p>
          </div>  
        </div>
     
      );
    }
  })

  
  const Arpost = [
    {
      api: <ARpost />,
      title: 'AR POST'
     
    },
  ]

  const ArpostLoop = Object.keys(Arpost).map((title, i) => {

    if (i % 2) {
      return (
        <div style={{ height: "300vh" }}>
        <div className="dot">
              <p> LATEST NEWS FROM {Arpost[i].title}</p>
              <p>{Arpost[i].api}</p>
            </div>
        </div>     
       
       
      );
    } else {
      return (

        <div style={{ height: "300vh" }}>   
          <div className="dot" id="right" >
              <p>LATEST NEWS FROM {Arpost[i].title}</p>
              <p>{Arpost[i].api}</p>
          </div>  
        </div>
     
      );
    }
  })

  

const Overlay = forwardRef(({ caption, scroll }, ref) => (
  <div
    ref={ref}
    onScroll={(e) => {
      scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
      
    }}
    className="scroll">
    <div style={{ height: "200vh" }}>
      <div className="dot">
      <MobileView>
 
      
      
      <header style={{
      position: "relative",
      color: "black",
      width: '800px',
      backgroundColor: "white",
      Margin: "10px auto",
      display: "flex",

      }}>
        
 
        <h1>Meta - Universe</h1>
      </header> 
 
      </MobileView>
        
    </div>
    </div>
    {InevitablePostsLoop}


    <div style={{ height: "200vh" }}>
      <div className="dot">
        
    </div>
    </div>

   {DecentralandPostsLoop}



   {WiredPostsLoop}

   
   <div style={{ height: "50vh" }}>
      <div className="dot">
        
    </div>
    </div>


   {/* {ThevergePostsLoop} */}


   {ArpostLoop}
  
    {/* <span className="caption" ref={caption}>
      0.00
    </span> */}
  </div>
))

export default Overlay
