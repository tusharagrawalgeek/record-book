function searchQuery(str,arr){
    // if(str==="")return arr;
    var cols=[]
    Object.keys(arr[0]).forEach((key) => cols.push(key));
    console.log(arr);
    var res=[]
    arr.map(i=>{
        cols.some((j,ind)=>{
            if(ind!==0&&ind!==(cols.length-1)){
             
            if(i[j]&&i[j].toString().toUpperCase().split(" ").join("").includes(str.trim().toUpperCase())){
                res.push(i);
                return true;
            }
            }
            return false;
            
        })
    })
    return res;
}
export default searchQuery;