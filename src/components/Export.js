import React, { useEffect } from "react";
import { useState } from "react";
import '../style.css';
import * as color from '../colors.js';
import axios from "axios";
import url from '../vars.js';
import Loader from './Loader.js';
import Modal from './Modal.js';
import ExportedTable from "./ExportedTable";
import searchQuery from "./searchQuery";
function Export(){
    const [state,setState]=useState(
        {   dateExported:new Date().getDate()+" / "+(new Date().getMonth()+1)+" / "+new Date().getFullYear(),
            exportedItems:[],
            showExportedItems:true,
            showExportForm1:false,
            showExportForm2:false,
            currentItems:[],
            exportItemCount:1,
            particular:[""],
            quantity:[0],
            id:[""],
            exportedTo:"",
            purpose:"",
            showModal:false,
            message:"",
            messageVariant:"",
            showLoader:false,
            startExport:false,
            selectValues:[],
            searchValue:"",
            searchItems:[]
        }
    );
    useEffect(()=>{
        if(state.showModal){
            setTimeout(()=>{
                setState(p=>(
                    {   
                        ...p,
                        showModal:false,
                        
                    }
                ))
            },3000)
        }
    },[state.showModal])
    useEffect(()=>{
        if(state.startExport){
            const promises=[]
            state.id.map((i,index)=>{
                state.currentItems.some(j=>{
                    if(j._id===i){
                        var promise=exportItem(j,state.quantity[index]);
                        promises.push(promise)
                        return true;
                    }
                    return false;
                })
            })
            Promise.all(promises)
            .then((res)=>{
                console.log(promises);
                setState(p=>(
                    {
                        ...p,
                        showLoader:false,
                        message:"Exported successfully",
                        messageVariant:"success",
                        showModal:true,
                        showExportForm1:true,
                        showExportForm2:false,
                        exportItemCount:1,
                        particular:"",
                        quantity:[0],
                        id:[""],
                        exportedTo:"",
                        purpose:"",
                        startExport:false
                    }
                ))
            })
            .catch(err=>{
                setState(p=>(
                    {
                        ...p,
                        showLoader:false,
                        message:"Couldn't export",
                        messageVariant:"error",
                        showModal:true,
                        startExport:false
                    }
                ))
            })
        }
    },[state.startExport])
    function handleQuantityChange(e){
        const obj=e.target;
        console.log(obj.name,obj.value);
        state.quantity[[obj.name]]=obj.value
        setState(p=>({...p}))
    }
    function handleChange(e){
        const obj=e.target;
        if(obj.name==="searchValue"){
            const data=searchQuery(obj.value,state.exportedItems);
            setState(p=>{
                return({
                    ...p,
                    searchItems:data,
                    [obj.name]:obj.value
                });
            });
        }else{
        
        console.log(obj.name);
        setState(p=>(
            {
                ...p,
                [obj.name]:obj.value
            }
        ))
        }
    }
    function handleAddItem(){

        state.id.push("")
        state.quantity.push(0)
        console.log(typeof(state.particular));
        state.particular.push("")
        setState(p=>({
            ...p,
            exportItemCount:state.exportItemCount+1,
        }))
    }
    function handleClick(e){
        const obj=e.target;
        console.log(obj);
        const name=obj.getAttribute("name");
        var arr={showExportForm1:false,showExportForm2:false,showExportedItems:false}
        if(name==="showExportForm2"){
            axios.get(url+'/getitem')
        .then(res=>{
            const items=res.data.data;
            setState(p=>{
                return({
                    ...p,
                    ...arr,
                    [obj.name]:!state[obj.name],
                    currentItems:items,
                    // itemToExport:null,
                });
            })
        })
        .catch(err=>console.log(err))
           
        }else{
            setState(p=>(
                {
                    ...p,
                    ...arr,
                    [obj.name]:!state[obj.name]
                }
            ))
        }
        
    }
    function handleDeleteRow(e){
        const i=e.target.getAttribute("name");
        state.quantity.splice([i],1);
        state.id.splice([i],1);
        state.particular.splice([i],1);
        state.selectValues.splice([i],1);
        setState(p=>({
            ...p,
            exportItemCount:state.exportItemCount-1
        }))
    }
    function handleOptionChange(e){
        console.log(e.target.value);
        const obj=e.target;
        const [itemId,i]=obj.value.split(" ");
        var item;
        (state.currentItems.map(j=>{
            console.log(j._id,itemId);
            if(j._id===itemId){
                console.log("here");
                item=j;
                return true;
            }   
            return false;   
        }))
        state.id[[i]]=item._id;
        state.quantity[[i]]=item.quantity
        state.particular[[i]]=item.name
        state.selectValues[[i]]=item.name
        console.log(item,i);
        setState(p=>(
            {
                ...p,
             
            
            }
        ));

    }
    useEffect(()=>{
        if(state.showExportedItems){
        console.log(url);
        axios.get(url+'/getexported')
        .then(res=>{
            const items=res.data.data;
            setState(p=>{
                return({
                    ...p,
                    exportedItems:items,
                    searchItems:items
                });
            })
        })
        .catch(err=>console.log(err))
    }
    },[state.showExportedItems]);
     function exportItem(item,quantity){
        var data={};
        data.name=item.name
        data.quantity=quantity
        data.date=state.dateExported
        data.expiry=item.expiry
        data.description=item.description
        data.receivedBy=item.receivedBy
        data.receivedFrom=item.receivedFrom
        data.exportedTo=state.exportedTo
        data.purpose=state.purpose
        console.log(data);
        var p=new Promise(async(resolve,reject)=>{
        await axios.post(url+'/exportitem',data)
        .then(async res=>{
            console.log(res);
            if(item.quantity-quantity===0){
                axios.delete(url+'/deleteitem/'+item._id)
                .then(res=>{
                    console.log(res);
                    if(res===0){
                        reject(0)
                    }else
                    resolve(1)
                })
                .catch((e)=>{
                    reject(0);
                })
            }else{
                var updateData={quantity:item.quantity-quantity}
            await axios.put(url+'/update/'+item._id,updateData)
            .then(res=>{
                console.log(res);
                resolve(1)
            })
            .catch((e)=>{
                reject(0);
            })
            }
            
        })
        .catch(err=>{
            console.log(err);
            reject(0);
        })
        })
        return p;
    }
    function handleSubmit(){
       setState(p=>(
        {
            ...p,
            showLoader:true,
            startExport:true
        }
       ))
    }
    function closeModalCallback(){
        console.log("Callback");
        setState(p=>({
            ...p,
            showModal:false,
            message:"",
            messageVariant:""}))
    }
    return(
        <>
        {console.log(state.id,state.quantity)}
        <Modal message={state.message} type={state.messageVariant} closeCallback={closeModalCallback} show={state.showModal}/>
        <Loader show={state.showLoader}/>
        <div style={{
            width:"100%"
        }}>
            <div>
                <h2 style={{marginTop:"0",color:color.contrast}}>EXPORTED ITEMS </h2>
            </div>
            <div style={{
                margin:"auto",
                marginTop:"4em"
            }}>
                {state.showExportedItems&&
                <>
                
                <ExportedTable items={state.searchItems} searchValue={state.searchValue} handleChange={handleChange} searchBar/>
                <div style={{
                    margin:"auto",
                    marginTop:"2em",
                    textAlign:"center"
                }}>
                    <div className="singleBar">
                    <button  style={{float:"",marginRight:"30rem"}} className="btn-add1">
                Print
                </button>
                <button  style={{float:""}} className="btn-add1" onClick={handleClick} name="showExportForm1">
                Export items
                </button>
                
                </div>
                </div>
                </>
                }
                {state.showExportForm1&&
                <>
                    {showPreForm()}   
                </>}
                {state.showExportForm2&&
                <>
                    {showFullForm()}   
                </>}
            </div>
        </div>
        </>
    );
function showFullForm(){
    return(
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
                            Quantity
                        </th>
                        
                        <th className="th">
                            Expiry Date
                        </th>
                        <th className="th">
                            Action
                        </th>
                    </tr>
                    {[...Array(state.exportItemCount)].map((l,index)=>{
                        return(
                            <>
                            <tr >
                        <td className="td-1">
                            {console.log(state.particular[index],index)}
                            {state.particular[index]===""?
                            <select className="select" onChange={handleOptionChange} name="particular">
                                <option style={{background:color.dark}} selected disabled hidden>Select</option>
                                {state.currentItems.map((i,ind)=>{
                                    return(
                                        <option style={{background:color.dark}} value={i._id+" "+index} disabled={state.id.includes(i._id)}>{i.name}</option>
                                    );
                                })}
                            </select>
                            :
                             state.selectValues[index]
                            }
                        </td>
                        <td className="td-1">
                            <input className="inputitem" value={state.quantity[index]} name={index} onChange={handleQuantityChange}/>
                        </td>
                        <td className="td-1">
                            hgbf
                        </td>
                        <td className="td-1">
                        <button className="btn-add" 
                                name={index}
                                onClick={handleDeleteRow}    
                            >
                                x
                                </button>
                        </td>
                    </tr>
                            </>
                        );
                        
                    })}
                    
                    <tr>
                    <td colSpan="1" className="td-add-btn">
                            <button className="btn-add" onClick={handleClick} name="showExportForm1">Cancel</button>
                        </td>
                        <td colSpan="3" className="td-add-btn">
                            <button className="btn-add-d" onClick={handleAddItem} name="addItem" disabled={state.exportItemCount>state.selectValues.length}>+</button>
                        </td>
                    </tr>
                    </table>
                    <button  className="btn-add-d" onClick={handleSubmit} disabled={state.exportItemCount>state.selectValues.length}>Export</button>
        </>
    );
}
function showPreForm(){
    return(
        <>
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
                        <td colSpan="3" style={{textAlign:"right",paddingRight:"10px"}}>
                            <button className="btn-add"
                                name="showExportedItems"
                                onClick={handleClick}    
                            >
                                X
                            </button>
                        </td>
                    </tr>
                    <tr>
                            <td className="tditem">
                            EXPORT DATE
                            </td>
                            <td className="tditem">
                                :
                            </td>
                            <td className="tditem">
                            <input
                            className="inputitem"
                            name="dateExported"
                            value={state.dateExported}
                            onChange={handleChange}
                            readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <td className="tditem">
                            EXPORT TO
                            </td>
                            <td className="tditem">
                                :
                            </td>
                            <td className="tditem">
                            <input
                            className="inputitem"
                            name="exportedTo"
                            value={state.exportedTo}
                            onChange={handleChange}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td className="tditem">
                            PURPOSE
                            </td>
                            <td className="tditem">
                                :
                            </td>
                            <td className="tditem">
                            <input
                            className="inputitem"
                            name="purpose"
                            value={state.purpose}
                            onChange={handleChange}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="td-add-btn">
                                <button className="btn-add" onClick={handleClick} name="showExportForm2">Proceed</button>
                            </td>
                        </tr>
            </table>
        </>
    );
}
}   
export default Export;