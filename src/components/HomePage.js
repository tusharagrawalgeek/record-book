import React from "react";
import SideBar from "./SideBar";
import '../style.css';
import Dashboard from "./Dashboard";
import Import from "./Import";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Redirect,
  } from "react-router-dom";
function HomePage(){
    return(
        <>
        <Router>
        <div className="container-bg">
                <div className="left">
                    <SideBar/>
                </div>
                <div className="right">
                    <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/import" element={<Import/>} />
                    
                    </Routes>
                    
                </div>
            </div>
            </Router>
        </>
    );
}
export default HomePage;
