import React, { useEffect } from "react";
import { useState } from "react";
import '../style.css';
import * as color from '../colors.js';
import axios from "axios";
import url from '../vars.js';
function Export(){
    const [state,setState]=useState(
        {
            items:[],
            showExportForm:false,
            currentItems:[],
            particular:"",
            quantity:"",
            
        }
    );
    function handleChange(e){
        const obj=e.target;

    }
    function handleClick(){
        axios.get(url+'/getitem')
        .then(res=>{
            const items=res.data.data;
            setState(p=>{
                return({
                    ...p,
                    currentItems:items,
                    itemToExport:null,
                    showExportForm:!state.showExportForm
                });
            })
        })
        .catch(err=>console.log(err))
    }
    function handleOptionChange(e){
        const obj=e.target;
        var item;
        (state.currentItems.map(i=>{
            if(i._id===obj.value){
                console.log("here");
                item=i;
                return true;
            }   
            return false;
        }))
        setState(p=>(
            {
                ...p,
                particular:item.name,
                quantity:item.quantity
            }
        ));

    }
    useEffect(()=>{
        console.log(url);
        // const url='http://localhost:3001/getitem'
        axios.get(url+'/getexported')
        .then(res=>{
            const items=res.data.data;
            setState(p=>{
                return({
                    ...p,
                    items:items
                });
            })
        })
        .catch(err=>console.log(err))
    },[]);
    return(
        <>
        {state.particular}
        <div style={{
            width:"100%"
        }}>
            <div>
                <h2 style={{marginTop:"0",color:color.contrast}}>DASHBOARD </h2>
            </div>
            <div style={{
                margin:"auto",
                marginTop:"4em"
            }}>
                {!state.showExportForm&&
                <table style={{
                    margin:"auto",
                    width:"70%",
                    borderSpacing:"0"
                }}>
                    <tr>
                    <th className="th">
                            Date
                        </th>
                        <th className="th">
                            Particular
                        </th>
                        <th className="th">
                            Received From
                        </th>
                        <th className="th">
                            Quantiity
                        </th>
                        <th className="th">
                            Received By
                        </th>
                        <th className="th">
                            Expiry Date
                        </th>
                        <th className="th">
                            Remarks
                        </th>
                    </tr>
                    {state.items.map(i=>{
                        return(
                          
                            <tr>
                                <td className="td-1">
                                {i.date}
                               </td>
                               <td className="td-1">
                                {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                               </td>
                               <td className="td-1">
                                {i.receivedFrom}
                               </td>
                               <td className="td-1">
                                {i.quantity}
                               </td>
                               <td className="td-1">
                                {i.receivedBy}
                               </td>
                               <td className="td-1">
                                {i.expiry}
                               </td>
                               <td className="td-1">
                                {i.description}
                               </td>
                            </tr>
                        );
                    })}
                </table>
                }
                {state.showExportForm&&
                <>
                    <table style={{
                    margin:"auto",
                    width:"70%",
                    borderSpacing:"0"
                    }}>
                        <tr>
                        <th className="th">
                            Particular
                        </th>
                      
                        <th className="th">
                            Quantiity
                        </th>
                        
                        <th className="th">
                            Expiry Date
                        </th>
                        <th className="th">
                            Remarks
                        </th>
                    </tr>
                    <tr >
                        <td className="td-1">
                            <select className="select" onChange={handleOptionChange} name="particular">
                                <option style={{background:color.dark}} >Select</option>
                                {state.currentItems.map((i,ind)=>{
                                    return(
                                        <option style={{background:color.dark}} value={i._id}>{i.name}</option>
                                    );
                                })}
                            </select>
                        </td>
                        <td className="td-1">
                            <input className="inputitem" value={state.quantity} name="quantity" onChange={handleChange}/>
                        </td>
                        <td className="td-1">
                        </td>
                        <td className="td-1">
                        </td>
                        <td className="td-1">
                        </td>

                    </tr>
                    </table>             
                </>}
                <button onClick={handleClick}>
                    {state.showExportForm?"Cancel":"Export item"}
                </button>
            </div>
        </div>
        </>
    );
}   
export default Export;