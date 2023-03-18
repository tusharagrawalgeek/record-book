import React from "react";
import { useState } from "react";
import './filterPopup.css';
function FilterPopup(props){
    const [state,setState]=useState({
        display:"block",
       
        
    });
    // if(props.from!==state.from||props.to!==state.to){
    //     setState(p=>({
    //         ...p,
    //         from:props.from,
    //         to:props.to
    //     }))
    // }
    // function handleChange(e){
    //     const obj=e.target;
    //     console.log(obj.name,obj.value);
    //     setState(p=>(
    //         {
    //             ...p,
    //             [obj.name]:obj.value
    //         }
    //     ))
    // }
    function close(){
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
        {console.log(state.to,new Date().getFullYear())}
        <div className="container">
        <div className="modal2" style={{display:state.display}}>

  <div className={"modal-content-primary2"}>
    
    {/* <p>ac</p> */}
    <div style={{}}>
        {/* <div></div> */}
        <div className="close1" onClick={()=>props.closeCallback()}>&times;</div>
        <div style={{marginRight:"20px"}}>
        <div style={{textAlign:"left",marginBottom:"1rem"}}>
            From:<br></br>
            <input className="inputitem" style={{padding:"0.6rem 0.6rem 0.2rem" ,width:"8rem"}} type="date"
            value={props.from}
            onChange={(e)=>props.handleDateChange(e)}
            name="from"
            />
        </div>
        <div style={{textAlign:"left",marginBottom:"1rem"}}>
            To:<br></br>
            <input className="inputitem" style={{padding:"0.6rem 0.6rem 0.2rem",width:"8rem"}} type="date"
            placeholder="dd/mm/yyyy"
            value={props.to}
            onChange={(e)=>props.handleDateChange(e)}
            name="to"/>
        </div>
        <div>
        <button className="btn-add-d" style={{margin:"1rem 0.5rem 0"}}
            onClick={()=>props.clearDateFilter()}>
                Clear
            </button>
            {/* <button className="btn-add-d" style={{margin:"1rem 0.5rem 0"}} disabled={state.from===""||state.to===""?true:false}
            onClick={()=>props.handleFilter()}>
                Filter
            </button> */}
        </div>
    </div>
    </div>
  </div>
  </div>
</div>
{/* {componentDidMount} */}
</>
    );
    else return;
}

export default FilterPopup;