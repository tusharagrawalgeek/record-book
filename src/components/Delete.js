import React, { useEffect } from "react";
import { useState } from "react";
import '../style.css';
import * as color from '../colors.js';
import axios from "axios";
import url from '../vars.js';
import Loader from './Loader.js';
import Modal from './Modal';
function Delete(){
   
    const [state,setState]=useState(
        {
            items:[],
            cbdata:[],
            showLoader:false
        }
    );
     useEffect(()=>{
        if(state.showLoader){
        console.log("delete started");
        const promises=state.cbdata.map(async i=>{
            await axios.delete(url+'/deleteitem/'+i)
            .then(res=>{
                console.log("removed"+i);
                return new Promise((resolve,reject)=>{
                    resolve(432);
                    reject(-1);
                })
            })
            .catch(err=>{
                console.log(err);
            })
        })
        console.log("Delete ended");
        Promise.all(promises)
            .then(()=>{
                console.log(promises)
                loadData();
                setState(p=>({
                    ...p,
                    showLoader:false,
                    cbdata:[]
                }))
                }
            )
            .catch(e=>console.log(e))
        }
    },[state.showLoader]);
    function loadData(){
        axios.get(url+'/getitem')
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
    }
    useEffect(()=>{
        console.log(url);
        loadData();
    },[]);
    function handelCheckBox(e){
        const id=e.target.getAttribute("name");
        var a=[];
        if(state.cbdata.includes(id)){
            a=state.cbdata.filter(i=>{
                return i!==id
            });
        }else{
            state.cbdata.push(id);
            a=state.cbdata;
        }
       
        setState(p=>{
            return({
                ...p,
                cbdata:a
            });
        });
        
    }
    function handelSubmit(){
        setState(p=>({
            ...p,
            showLoader:!state.showLoader
        }))
    }
    return(
        <>
        {console.log("rerender")}
        <Loader show={state.showLoader}/>
        <div style={{
            width:"100%"
        }}>
            <div>
                <h2 style={{marginTop:"0",color:color.contrast}}>DELETE ITEMS</h2>
            </div>
            <div style={{
                margin:"auto",
                marginTop:"4em",
            }}>
                <table style={{
                    margin:"auto",
                    width:"70%",
                    borderSpacing:"0",
                }}>
                    <tr>
                    <th className="th">
                            Select
                        </th>
                        <th className="th">
                            Item
                        </th>
                        <th className="th">
                            Units
                        </th>
                        <th className="th">
                            Date added
                        </th>
                        <th className="th">
                            Expiry Date
                        </th>
                        <th className="th">
                            Description
                        </th>
                    </tr>
                    {state.items.map(i=>{
                        return(
                          
                            <tr> 
                               <td className="td-1">
                                <input type="checkbox" onClick={handelCheckBox} name={i._id} checked={state.cbdata.includes(i._id)}></input>
                               </td>
                               <td className="td-1">
                                {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                               </td>
                               <td className="td-1">
                                {i.quantity}
                               </td>
                               <td className="td-1">
                                {i.date}
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
                <button onClick={handelSubmit}>
                    Remove
                </button>
            </div>
        </div>
        </>
    );
    
}
export default Delete;