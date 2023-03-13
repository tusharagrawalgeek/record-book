function getSelectedOption(){
    const url=window.location.href;
    const arr=url.split('/')
    if(arr[3]==="home"){
        return arr[4];
    }
    return "dashboard";
}
export default getSelectedOption;