// Sort by the fields in the array arr
const compareByMultiple = (a, b, arr) => {
    let ret = 0;
    if (arr !== undefined) {
        for (let i=0; i < arr.length; i++)  {
            const field = arr[i];
            if (a[field]?b[field]?true:false:false) {
                ret = a[field].localeCompare(b[field])
                if (ret !== 0) {
                    break;
                }
            }    
        }
    } 
    return(ret);
}

export default compareByMultiple