function dateFilterUtil(from,to,data){
    // console.log(from,to,data);

    if(from===""||to===""){
        return data;
    }
    const res=[];
    data.map(i=>{
        var date=i.date.split(" / ");
        // console.log(date);
        var d=new Date(date[2],date[1]-1,date[0],0,0,0);
        if(d>=new Date(from)&&d<=new Date(to)){
            console.log(d);
            res.push(i);
            // return i;
        }
    })
    console.log(
        res
    );
    return res;
}
export default dateFilterUtil;