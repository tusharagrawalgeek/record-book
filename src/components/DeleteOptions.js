import React, { useState,useEffect } from "react";
import * as color from "../colors.js";
import Delete from "./Delete.js";
import '../style.css';
import { decrypt } from "../helpers/decrypter.js";
import { useNavigate } from "react-router-dom";
function DeleteOptions(){
    const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("profile")&&decrypt(localStorage.getItem('profile'))!=='admin')
    navigate('/home/dashboard')
  },[])
    const[state,setState]=useState(
        {
            showOptions:true,
            name:"",

            currentInventory:false,
            importedItems:false,
            exportedItems:false
        }
    );
    function handleClick(e){
        const name=e.target.getAttribute("name");
        if(name==="cancel"){
            setState(p=>(
                {
                    ...p,
                    showOptions:true,
                    name:""
                }
               ))
               return;
        }
        setState(p=>(
            {
                ...p,
                showOptions:false,
                name:name
            }
           ))
    }
    
    return(
        <>
            <div style={{
            width:"100%",
        }}>
            <div>
                <h2 style={{marginTop:"0",color:color.contrast}}>DELETE ITEMS</h2>
            </div>
            {state.showOptions&&
            <div style={{
                textAlign:"center",
                padding:"1rem",
                marginTop:"5rem"
            }}>
                <div className="deleteOption" name="inventory" onClick={handleClick}>
                    Current Inventory
                </div>
                <div className="deleteOption" name="importedItems" onClick={handleClick}>
                   Imported Items
                </div>
                <div className="deleteOption" name="exportedItems" onClick={handleClick}>
                    Exported Items
                </div>
            </div>
            }
            {!state.showOptions&& <Delete name={state.name} handleClick={handleClick}/>}
            </div>
        </>
    );
}
export default DeleteOptions;