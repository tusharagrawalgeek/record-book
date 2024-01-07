import { useEffect } from "react";
import { useState } from "react";
import * as colors from '../colors.js';
import filtercontrast from '../filter54.png';
import filterlight from '../filter55.png';
import FilterPopup from "./FilterPopup.js";
import dateFilterUtil from '../functions/dateFilterUtil.js';
import searchQuery from "./searchQuery.js";
import * as color from '../colors.js';
import jsPDF from 'jspdf'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { styled } from "@mui/system";
import Pdfico from '@mui/icons-material/PictureAsPdf';
function Table(props){
    const [state,setState]=useState(
        {
            showFilterPopup:false,
            items:props.items,
            dateFilteredItems:props.items,
            searchFilteredItems:props.items,
            dataToDisplay:props.items,
            from:"",
            to:"",
            searchValue:"",
            dateSorted:false,
            expiryDateSorted:false,
        }
    );
    // useEffect(()=>{
    //     if(state.dateSorted){
    //         sortDate();
    //     }
    // },[state.dateSorted])
    // useEffect(()=>{
        // console.log(state.items,props.items);
        if(state.items!==props.items){
            // console.log(true);
            setState(p=>({
                ...p,
                items:props.items,
                dateFilteredItems:props.items,
                searchFilteredItems:props.items,
                dataToDisplay:props.items,
                from:"",
            to:"",
            searchValue:""
            }))
        }
    // },[])
    // useEffect(()=>{
    //     setState(p=>(
    //         {
    //             ...p,
    //             dateFilteredItems:state.items,
    //             searchFilteredItems:state.items,
    //             dataToDisplay:props.items,
    //         }
    //     ))
    // })
    //callback for date filter popup
    function closeCallback(){
        setState(p=>({
            ...p,
            showFilterPopup:false
        }))
    }
    function clearDateFilter(){
        
        setState(p=>({
            ...p,
            showFilterPopup:false,
            from:"",
            to:""
        }))
    }
    //date changed
    function handleDateChange(e){
        const obj=e.target;
        // console.log(obj.name,obj.value);
        setState(p=>({
            ...p,
            [obj.name]:obj.value
        }))
    }
    function handleFilter(){
        // console.log(from,to);
        setState(p=>({
            ...p,
            showFilterPopup:false,
            // from:from,
            // to:to
        }))
    }
    const StyledSortIcon = styled(ArrowDropUpIcon, {
        name: "StyledSortIcon",
        slot: "Wrapper"
      })({
        color: !state.dateSorted?colors.light:colors.contrast,
      });
    function sortDate(){
        state.dataToDisplay.sort((a, b) => compareDate(a.date,b.date));
        // console.log(state.dataToDisplay);
        setState(p=>({
            ...p,
            dateSorted:true
        }));
    }
    function sortExpiryDate(){
        state.dataToDisplay.sort((a, b) => compareExpiryDate(a.expiry,b.expiry));
        setState(p=>({
            ...p,
            expiryDateSorted:true
        }));
    }
    function compareDate(a,b){
        var date=a.split(" / ");
        var d1=new Date(date[2],date[1]-1,date[0],0,0,0);
        date=b.split(" / ");
        var d2=new Date(date[2],date[1]-1,date[0],0,0,0);
        if(d2<d1){
            return -1;
        }else if(d1<d2){
            return 1;
        }
        return 0;
    }
    function compareExpiryDate(a,b){
        var date=a.split(" / ");
        var d1=new Date(date[2],date[1]-1,date[0],0,0,0);
        date=b.split(" / ");
        var d2=new Date(date[2],date[1]-1,date[0],0,0,0);
        if(d2<d1){
            return 1;
        }
        return -1;
    }
    useEffect(()=>{
        const data=dateFilterUtil(state.from,state.to,state.items);
        // console.log(data);
        setState(p=>({
            ...p,
            searchValue:"",
            dateFilteredItems:data,
            dataToDisplay:data,
            //change filter img logo
        }))
    },[state.from,state.to])
    // useEffect(()=>{
    //     
        
    // },[state.searchValue])
    function handleChange(e){
        const obj=e.target;
        const data=searchQuery(obj.value,state.dateFilteredItems);
        // console.log(data);
        setState(p=>({
            ...p,
            searchFilteredItems:data,
            dataToDisplay:data,
            searchValue:obj.value,
            //change filter img logo
        }))
        setState(p=>({
            ...p,
            
        }))
    }
    function downloadPDF(){
        const doc = new jsPDF()
doc.autoTable({ html: '#table-data',theme:'grid',styles:{fontStyle:'',fontSize:7}, headStyles:{fillColor:"#536895",fontStyle:"bold",textColor:"white"} })
doc.save('Niveda Stock '+new Date().getDate() +
" / " +
(new Date().getMonth() + 1) +
" / " +
new Date().getFullYear()+'.pdf')
    }
    if(state.items!=undefined&&state.items!==null&&state.items!=[])
    return(
        <>
        {/* {console.log(state.dataToDisplay,state.items)} */}
            <FilterPopup handleDateChange={handleDateChange} from={state.from} to={state.to} show={state.showFilterPopup} handleFilter={handleFilter} closeCallback={closeCallback} clearDateFilter={clearDateFilter}/>
            {DisplayTable(true,state.dataToDisplay)}
        </>
    );
    else return <>{DisplayTable(true,[])}</>

    
    function DisplayTable(searchBar,items){
        return(
            <>
             <div style={{
                    // margin:"auto",
                    width:"fit-content",
                    margin:"1rem auto",
                    borderSpacing:"0",
                    boxShadow:"2px 2px 10px 1px black",
                    padding:"20px",
                    background:colors.mid,
                    borderRadius:"10px",
                    color:"white",
                   
                }}>
                    {/* table1 */}
                <table style={{
                    width:"100%",
                    borderSpacing:"0",
                    background:colors.mid,
                    borderRadius:"10px",
                    color:"white",
                }}> 
                
                {searchBar&&
                    <tr style={{padding:"1rem"}}>
                        <td style={{padding:"1rem"}}     colSpan={8}>
                        <Pdfico onClick={downloadPDF} style={{float:"right",margin: "10px 10px"}}/>
                    <input 
                         type="text"
                         name="searchValue"
                         className="searchbar"
                         value={state.searchValue}
                         placeholder="Search..."
                         onChange={handleChange}
                         />
                    
                    </td>
                    </tr>
                    }
                    
                    {/* table2 */}
                    </table>
            <table id="table-data" style={{
                    borderSpacing:"0",
                      margin:"5px auto",
                    background:colors.mid,
                    color:"white",
                   overflowY:"auto",
                   maxHeight:"20rem",
                   display:"block",
                   textAlign:"center"
                }}> 
                    <thead>
                        <tr>
                    <th className="th">
                            S.No.
                        </th>
                    <th className="th">
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                            }}>
                            <div style={{verticalAlign:"center",display:"inline-block"}}>
                            Date
                            </div>
                                <img className="btn-add" src={state.from!==""&& state.to!==""?filtercontrast:filterlight} width="20px" height="20px"
                                    onClick={()=>setState(p=>({...p,showFilterPopup:true}))}
                                    style={{margin:"5px 0px 5px 15px",padding:"2px",verticalAlign:"center",backgroundColor:"transparent"}}
                                />
                                <StyledSortIcon onClick={sortDate}
                                />
                                </div>
                        </th>
                        <th className="th">
                            Particular
                        </th>
                        <th className="th">
                            Received From
                        </th>
                        <th className="th">
                            Quantity
                        </th>
                        <th className="th">
                            Received By
                        </th>
                        <th className="th">
                            Expiry Date
                            {/* <button onClick={sortExpiryDate}
                                className="btn-add"
                                style={{
                                    padding:"0rem 0.2rem",
                                    marginLeft:"0.1rem",
                                    background:"none",
                                    border:"0",
                                    height:"20px",
                                    color:state.dateExpirySorted?colors.contrast:colors.light
                                }}>&#9650;</button> */}
                        </th>
                        <th className="th">
                            Remarks
                        </th>
                        </tr>
                    </thead>
                    {items.map((i,ind)=>{
                        return(
                                <tr>
                                <td className="td-1">
                                {ind+1}
                               </td>
                                <td className="td-1">
                                {i.date}
                               </td>
                               <td className="td-1">
                                {i.name?.charAt(0).toUpperCase() + i.name?.slice(1)}
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
                </div>
            </>
        );
    }
}
export default Table;