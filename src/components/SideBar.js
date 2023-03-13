import React from "react";
import { useState } from "react";
import '../style.css';
import { Link } from "react-router-dom";
import getSelectedOption from "../functions/getSelectedOption";
function SideBar(){
    const [state,setState]=useState(
        {
            selectedOption:getSelectedOption()
        }
    );
    function handleClick(e){
        
        var incoming=e.target.getAttribute("name");
        setState({selectedOption:incoming});
        
    }
    console.log(state.selectedOption);
    return(
        <>
        {console.log(window.location.href)}
            <div className="table-container">
                        <table style={{
                            margin:"0 auto",
                            width:"100%"
                        }}>
                            <tr >
                                <Link to="/home/dashboard">
                                <td className={state.selectedOption==="dashboard"?"tr-left-selected":"tr-left"}
                                onClick={handleClick}
                                name="dashboard">
                                   Dashboard
                                </td>
                                </Link>
                            </tr>
                            <tr >
                                <Link to="/home/import">
                                    <td className={state.selectedOption==="import"?"tr-left-selected":"tr-left"}
                                    onClick={handleClick}
                                    name="import">
                                        Import
                                    </td>
                                </Link>
                            </tr>
                            <tr >
                            <Link to="/home/export">
                                <td className={state.selectedOption==="export"?"tr-left-selected":"tr-left"}
                                onClick={handleClick}
                                name="export">
                                    Export
                                </td>
                                </Link>
                            </tr>
                            <tr >
                                <Link to="/home/delete">
                                <td className={state.selectedOption==="delete"?"tr-left-selected":"tr-left"}
                                onClick={handleClick}
                                name="delete">
                                    Delete/Remove
                                </td>
                                </Link>
                            </tr>
                            <tr >
                                <Link to="/">
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
