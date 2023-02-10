import React from "react";
import { useState } from "react";
import '../style.css';
function Dashboard(){
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
            <div className="container-bg">
                <div className="left">
                    <div className="table-container">
                        <table style={{
                            margin:"0 auto",
                            width:"100%"
                        }}>
                            <tr >
                                <td className={state.selectedOption==="dashboard"?"tr-left-selected":"tr-left"}
                                onClick={handleClick}
                                name="dashboard">
                                   Dashboard
                                </td>
                            </tr>
                            <tr >
                                <td className={state.selectedOption==="import"?"tr-left-selected":"tr-left"}
                                onClick={handleClick}
                                name="import">
                                    Import
                                </td>
                            </tr>
                            <tr >
                                <td className={state.selectedOption==="export"?"tr-left-selected":"tr-left"}
                                onClick={handleClick}
                                name="export">
                                    Export
                                </td>
                            </tr>
                            <tr >
                                <td className={state.selectedOption==="logout"?"tr-left-selected":"tr-left"}
                                onClick={handleClick}
                                name="logout">
                                    Logout
                                </td>
                            </tr>
                        </table>
                        
                    </div>
                </div>
                <div className="right">

                </div>
            </div>
        </>
    );
}
export default Dashboard;