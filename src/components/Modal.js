import React from "react";
import { useState } from "react";
import './modal.css';
function Modal(props){
    const [state,setState]=useState({display:"block"});
//     return <Display message={"Successfully added"} type={"success"} close={()=>{setState(prev=>{
//         return({...prev,message:false})
//     })}}/>
// }
// function Display(props){
    
    // componentDidMount(){
    // return <></>
    // }
    function close(){
        // document.getElementById("myModal").style.display=state.display
       setState(prev=>{
        return({
            ...prev,
            display:"none"
        });
       })
    }
    if(props.show===true)
    return(
        <>
        <div id="myModal" className="modal" style={{display:state.display}}>

  <div className={props.type==="success"?"modal-content-success":
                  props.type==="warning"?"modal-content-warning":
                  props.type==="error"?"modal-content-error":
                                        "modal-content-primary"}>
    <span className="close" onClick={()=>props.closeCallback()}>&times;</span>
    <p>{props.message}</p>
  </div>

</div>
{/* {componentDidMount} */}
</>
    );
    else return;
}

export default Modal;