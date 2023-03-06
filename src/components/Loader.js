import React from "react";
import { useState } from "react";
import './Loader.css';
function Loader(props){
    const [state,setState]=useState({display:"block"});
    if(props.show===true)
    return(
        <>
        <div id="myModal" className="modal" style={{display:state.display}}>
        <div className="loader">
            <span></span>
              <span className="dot"></span>
              <span className="dot" ></span>
              <span className="dot" ></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>

</div>
</>
    );
    else return;
}

export default Loader;