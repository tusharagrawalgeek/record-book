import React from "react";
import { useState,useRef } from "react";
import '../style.css';
import * as color from '../colors.js';
import axios from "axios";
import url from "../vars";
import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import Table from "./Table.js";
import Loader from "./Loader";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
function Import(){
    const comp=useRef();
    const [state,setState]=useState(
        {
            itemName:"",
            quantity:"",
            dateAdded:new Date().getDate()+" / "+(new Date().getMonth()+1)+" / "+new Date().getFullYear(),
            expiryDate:"",
            description:"",
            receivedFrom:"",
            receivedBy:"",
            content:"",
            colNames:[],
            bulkData:[],
            colOrder:[-1,-1,-1,-1,-1,-1,-1],
            showLoader:false,
            importedItems:[],
            showSingleUpload:false,
            showBulkUpload:false,
            showImportedTable:true
        }
    );
    async function addSingleItem(){
         const data={
            name:state.itemName,
            quantity:state.quantity,
            date:state.dateAdded,
            expiry:state.expiryDate,
            description:state.description,
            receivedBy:state.receivedBy,
            receivedFrom:state.receivedFrom
        }
        var promise=await axios.post(url+'/setitem',data)
        .then(res=>{
            console.log(res.data);
            console.log(res.data+"added");
            return new Promise((resolve,reject)=>{
                 resolve(432);
                 reject(-1)
            })
        })
        .catch(err=>{
            console.log(err);
        })
        return promise;
    }
    useEffect(()=>{
        if(state.showLoader){
        addSingleItem()
        .then(val=>{
            console.log(val);
            setState(p=>({
                ...p,
                showLoader:false
            }))
        })
        }
    },[state.showLoader]);
    const handlePrint=useReactToPrint({
        onBeforeGetContent:()=>{
            setState(p=>(
                {
                    ...p,
                    content:"Concmnjdcnsdjc "
                }
            ))
        },
        content:()=>comp.current,
        documentTitle:"Data",
        onAfterPrint:()=>alert("printed")
    });
    function loadImportedItems(){
        axios.get(url+'/getimporteditems')
        .then(res=>{
            setState(p=>(
                {
                    ...p,
                    importedItems:res.data.data
                }
            ))
        })
    }
    useEffect(()=>{
        loadImportedItems();
    },[]);
    function handleOptionChange(e){
        var obj=e.target;
            state.colOrder[[obj.name]]=Number(obj.value);
        setState(p=>{
            return(
                {
                    ...p,
                }
            );
        })
    }
    function handleChange(e){
        var obj=e.target;
        if(obj.name==="expiryDate"){
            var value=obj.value;
            if(state.expiryDate.length===1){
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
    function handleSubmit(e){
        if(e.target.getAttribute("name")==="singleAddButton"){
            setState(p=>({
                ...p,
                showLoader:true
            }))
            return
        }
        if(e.target.getAttribute("name")==="bulkAddButton"){
            state.bulkData.map((i,ind)=>{
            if(ind!==0){
            const data={
                date:state.colOrder[0]===-1?state.dateAdded:i[state.colOrder[0]],
                name:state.colOrder[1]===-1?"":i[state.colOrder[1]],
                receivedFrom:state.colOrder[2]===-1?"":i[state.colOrder[2]],
                quantity:state.colOrder[3]===-1?"":i[state.colOrder[3]],
                receivedBy:state.colOrder[4]===-1?"":i[state.colOrder[4]],
                expiry:state.colOrder[5]===-1?"":i[state.colOrder[5]],
                description:state.colOrder[6]===-1?"":i[state.colOrder[6]]
                
            }
            axios.post(url+'/setitem',data)
            .then(res=>{
                console.log(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
            console.log(data);
        }
        })
        }
    }
    function handleClick(e){
        var obj=e.target.getAttribute("name");
        var arr={showSingleUpload:false,showBulkUpload:false,showImportedTable:false}
        setState(p=>{
            return({
                ...p,
                ...arr,
                [obj]:!state[obj]
            })
        })
        
    }
    function fileHandler (event){
        let fileObj = event.target.files[0];
        ExcelRenderer(fileObj, (err, resp) => {
          if(err){
            console.log(err);            
          }
          else{
            console.log(resp.cols,resp.rows);
            const data=resp.rows;
            const colNames=data[0];
            setState(p=>{
                return(
                    {
                        ...p,
                        colNames:colNames,
                        bulkData:data
                    }
                );
            });
          }
        });                  
    }
    return(
        <> 
            <Loader show={state.showLoader}/>
            <div style={{
            width:"100%"
            }}>
                <div>
                    <h2 style={{marginTop:"0",color:color.contrast, marginBottom:"0"}}>
                        {state.showImportedTable?"IMPORTED ITEMS":
                         state.showSingleUpload?"ADD SINGLE ITEM":
                         "BULK UPLOAD ITEMS"}
                    </h2>
                    <text style={{fontSize:".8em"}}>
                    <em>{state.showImportedTable?
                    "Here you can see the items imported in the past 30 days even if they are not in the inventory currently. Items after 30 days are automatically removed":
                    state.showSingleUpload?"Fill the details and the item will be added instantly to the inventory. To upload many items at once, go to Bulk Upload Items":
                    "Insert an excel file from your system and choose the column name from dropdown which corresponds to the actual columns"}
                    </em>
                    </text>
                </div>
                <div style={{
                    // background:"red",
                    margin:"auto",
                    marginTop:"4em"
                }}>
                    {state.showImportedTable?
                    <>  
                        <div ref={comp}>
                        <Table items={state.importedItems}/>
                        </div>
                        
                    </>
                    :
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
                            <button className="btn-add" style={{color:"grey"}}
                                name={state.showBulkUpload?"showSingleUpload":"showImportedTable"}
                                onClick={handleClick}    
                            >
                                X
                            </button>
                        </td>
                    </tr>
                    {state.showSingleUpload?
                    <>
                    <tr>
                        <td className="tditem">
                        DATE
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

                            PARTICULAR 
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
                        RECEIVED FROM
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <input
                        className="inputitem"
                        name="receivedFrom"
                        value={state.receivedFrom}
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
                        RECEIVED BY
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <input
                        className="inputitem"
                        name="receivedBy"
                        value={state.receivedBy}
                        onChange={handleChange}
                        />
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

                             REMARKS  
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
                            <button className="btn-add" onClick={handleSubmit} name="singleAddButton">Add</button>
                        </td>
                    </tr>
                    </>
                    :
                    <>
                    <>
                    <tr>
                        <td className="tditem">
                        Select an excel file  
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        
                        <input
                        type="file"
                        className="inputitem"
                        id="fileUpload"
                        // value={state.itemName}
                        onChange={fileHandler}
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
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={0} id="quantityOption">
                            <option value={-1} >{state.dateAdded}</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                            PARTICULAR
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={1} id="itemNameOption">
                            <option value={-1} >--Select column name--</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                            
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                        RECEIVE FROM
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={2} id="receivedFromOption">
                            <option value={-1} >--Select an option--</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                        </select>
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
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={3} id="quantityOption">
                            <option value={-1} >--Select column name--</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                        RECEIVED BY
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={4} id="receivedByOption">
                            <option value={-1} >--Select an option--</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                        </select>
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
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={5} id="quantityOption">
                            <option value={-1} >--Select column name--</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                        </select>
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
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={6} id="quantityOption">
                            <option value={-1} >--Select column name--</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="td-add-btn">
                            <button className="btn-add" onClick={handleSubmit} name="bulkAddButton">Add Items</button>
                        </td>
                    </tr>
                    </>
                    </>}
                    </table>
                }
                </div>
                <>
                {state.showImportedTable&&
                <div style={{padding:"20px", width:"100%"}}> 
                    <button name="showSingleUpload" onClick={handleClick}>Upload items</button>
                </div>
                }
                {state.showSingleUpload&&
                <div style={{padding:"20px", width:"100%"}}> 
                <button name="showBulkUpload" onClick={handleClick}>Bulk Upload Items</button>
                </div>
                }
                <div style={{padding:"20px", width:"100%"}}> 
                <button name="" onClick={handlePrint}>Print</button>
                </div>
                </> 
            </div>
            {console.log("Exited the function")}
        </>
    );
}
export default Import;