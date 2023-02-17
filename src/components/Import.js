import React from "react";
import { useState } from "react";
import '../style.css';
import * as color from '../colors.js';
import axios from "axios";
import url from "../vars";
function Import(){
    const [state,setState]=useState(
        {
            itemName:"",
            quantity:"",
            dateAdded:new Date().getDate()+" / "+(new Date().getMonth()+1)+" / "+new Date().getFullYear(),
            expiryDate:"",
            description:""
        }
    );
    function handleChange(e){
        var obj=e.target;
        if(obj.name==="expiryDate"){
            var value=obj.value;
            if(state.expiryDate.length===1){
                console.log(obj.value);
                value=value+" / ";
            }
            setState(p=>{
                return({
                    ...p,
                    [obj.name]:value
                });
            });
        }else
        setState(p=>{
            return({
                ...p,
                [obj.name]:obj.value
            });
        });
    }
    function handleSubmit(){
        console.log(state);
        const data={
            name:state.itemName,
            quantity:state.quantity,
            date:state.dateAdded,
            expiry:state.expiryDate,
            description:state.description
        }
        axios.post(url+'/setitem',data)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return(
        <>
            <div style={{
            width:"100%"
            }}>
                <div>
                    <h2 style={{marginTop:"0",color:color.contrast}}>IMPORT / ADD ITEMS</h2>
                </div>
                <div style={{
                    // background:"red",
                    margin:"auto",
                    marginTop:"4em"
                }}>
                    <table style={{
                        margin:"auto",
                        width:"70%",
                        padding:"2em",
                        borderSpacing:"0",
                        borderRadius:"2px",
                        background:"#2E333C",
                        boxShadow:"1px 1px 2px 0px black"
                    }}>
                    <tr>
                        <td className="tditem">

                            ITEM NAME  
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <input
                        className="inputitem"
                        name="itemName"
                        value={state.itemName}
                        onChange={handleChange}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                            QUANTITY  
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <input
                        className="inputitem"
                        name="quantity"
                        value={state.quantity}
                        onChange={handleChange}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                        DATE ADDED
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <input
                        className="inputitem"
                        name="dateAdded"
                        value={state.dateAdded}
                        onChange={handleChange}
                        readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                            EXPIRY DATE
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <input 
                        className="inputitem"
                        name="expiryDate"
                        value={state.expiryDate}
                        onChange={handleChange}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">

                             DESCRIPTION  
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <input
                        className="inputitem"
                        name="description"
                        value={state.description}
                        onChange={handleChange}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="td-add-btn">
                            <button className="btn-add" onClick={handleSubmit}>Add</button>
                        </td>
                    </tr>
                    </table>
                </div>
                <div style={{padding:"20px", width:"100%"}}> 
                
                </div>
            </div>
        </>
    );
}
export default Import;