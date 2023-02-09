import { display } from "@mui/system";
import React from "react";
import * as colors from "../colors.js";
import '../style.css';
function Login(){
    function handleClick(){

    }
    return(
        <>
            <div className="container">
                <div className="form">
                    <form>
                        <input type="text"
                         className="input"
                         placeholder="Username">
                        </input><br/>
                        <input type="password" 
                         className="input"
                         placeholder="Password">
                        </input><br/>
                        <button
                         className="btn-1" 
                         type="submit"
                         onClick={handleClick}>
                            Login
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
}
export default Login;