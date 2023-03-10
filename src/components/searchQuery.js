function searchQuery(str,arr){
    var cols=[]
    Object.keys(arr[0]).forEach((key) => cols.push(key));
    var res=[]
    arr.map(i=>{
        cols.some((j,ind)=>{
            if(ind!==0&&ind!==(cols.length-1)){
             
            if(i[j]&&i[j].toString().toUpperCase().includes(str.trim().toUpperCase())){
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