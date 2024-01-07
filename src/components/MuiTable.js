import React from "react";
import { TableContainer,Table, TableHead,TableBody,TableRow, TableCell, Paper } from "@mui/material";
function MuiTable(props){
    return(
        <>
        <TableContainer component={Paper} style={{width:"80%",height:"600px",margin :"auto",boxShadow: "5px 5px 10px 2px black",}}>
            <Table aria-label='simple table' >
                <TableHead style={{backgroundColor:'#222831', color: 'white', border:""}}>
                    <TableRow>
                        <TableCell  style={{color:'#00ADB5', fontWeight:"bold"}}>
                            USERNAME
                        </TableCell>
                        <TableCell  style={{color:'#00ADB5' , fontWeight:"bold"}}>
                            PROFILE
                        </TableCell>
                        <TableCell style={{color:'#00ADB5', fontWeight:"bold"}}>
                            PHONE
                        </TableCell>
                        <TableCell style={{color:'#00ADB5', fontWeight:"bold"}}>
                            EMAIL
                        </TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody> 
                    {
                        props.data.map(i=>{
                            return(
                                <TableRow key={i.id} style={{backgroundColor:'#393E46', color: 'white', border:""}}>
                                    <TableCell style={{color:"white"}}>
                                        {i.username}
                                    </TableCell>
                                    <TableCell style={{color:"white"}}>
                                        {i.profile}
                                    </TableCell>
                                    <TableCell style={{color:"white"}}>
                                        {i.phone}
                                    </TableCell>
                                    <TableCell style={{color:"white"}}>
                                        {i.email}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}
export default MuiTable;