import React from "react";
import SideBar from "./SideBar";
import '../style.css';
import Dashboard from "./Dashboard";
import Import from "./Import";
import ham from '../ham.png'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Redirect,
    Outlet,
  } from "react-router-dom";
import { useState } from "react";
    function HomePage(){
        const [state, setState]=useState(
            {
                showSidebar:true
            }
        )
    return(
        <>
        {/* <Router> */}
        <div className="container-bg">
            
                <div className={state.showSidebar?"left":"leftham"}>
                    <button className="btn-add" style={{padding:"0.3rem",display:"block"}} onClick={()=>setState({showSidebar:!state.showSidebar})} 
                    
                    >
                        <img src={ham} width="20rem" height="20rem"></img>
                    </button>
                    {state.showSidebar?<SideBar/> :<>
            
            </>
            }
                </div>
           
                <div className="right">
                     <Outlet/>
                </div>
            </div>
            {/* </Router> */}
        </>
    );
}
export default HomePage;
