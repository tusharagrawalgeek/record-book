import React from "react";
import { useState } from "react";
import '../style.css';
import { Link } from "react-router-dom";
function SideBar(){
    const [state,setState]=useState(
        {
            selectedOption:"dashboard"
        }
    );
    function handleClick(e){
        
        var incoming=e.target.getAttribute("name");
        setState({selectedOption:incoming});
        
    }
    console.log(state.selectedOption);
    return(
        <>
            <div className="table-container">
                        <table style={{
                            margin:"0 auto",
                            width:"100%"
                        }}>
                            <tr >
                                <Link to="/">
                                <td className={state.selectedOption==="dashboard"?"tr-left-selected":"tr-left"}
                                onClick={handleClick}
                                name="dashboard">
                                   Dashboard
                                </td>
                                </Link>
                            </tr>
                            <tr >
                                <Link to="/import">
                                    <td className={state.selectedOption==="import"?"tr-left-selected":"tr-left"}
                                    onClick={handleClick}
                                    name="import">
                                        Import
                                    </td>
                                </Link>
                            </tr>
                            <tr >
                                <td className={state.selectedOption==="export"?"tr-left-selected":"tr-left"}
                                onClick={handleClick}
                                name="export">
                                    Export
                                </td>
                            </tr>
                            <tr >
                                <Link to="/logout">
                                <td className={state.selectedOption==="logout"?"tr-left-selected":"tr-left"}
                                onClick={handleClick}
                                name="logout">
                                    Logout
                                </td>
                                </Link>
                            </tr>
                        </table>
                        
                    </div>
        </>
    );
}
export default SideBar;
