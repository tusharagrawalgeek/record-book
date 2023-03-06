function Table(props){
    return(
        <>
            <table style={{
                    margin:"auto",
                    width:"70%",
                    borderSpacing:"0"
                }}>
                    <tr>
                    <th className="th">
                            Date
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
                        </th>
                        <th className="th">
                            Remarks
                        </th>
                    </tr>
                    {props.items.map(i=>{
                        return(
                          
                            <tr>
                                <td className="td-1">
                                {i.date}
                               </td>
                               <td className="td-1">
                                {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
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
        </>
    );
}
export default Table;