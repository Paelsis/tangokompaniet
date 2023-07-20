import axios from 'axios'
import statusMessage, {STATUS_OK, STATUS_WARNING, STATUS_ERROR} from 'functions/statusMessage'

const strObject = (rec) => {
    let strObject='{';
    Object.entries(rec).forEach((obj, colIndex) => {
        strObject += obj[0] + ':' + obj[1] + ', '; 
    })
    strObject += '}';
    return strObject;
}


const logArray = (title, array) => {
    let strList='[';
    array.forEach((rec, index) => {
        strList += strObject(rec) + ',';
    })
    strList += ']';
    console.log(title + ':' + strList);    
}

const postCrud = (url, username, password, table, crud, handleList) => {
    console.log('---- postCrud ---')
    console.log('url=', url)
    console.log('username/password=' +  username + '/' + password)
    console.log(' table=' + table);
    console.log('crud=', crud)

    let list=[]
        
    axios.post(url, 
        {
            table,   // The name of the table
            crud     // The data object 
        },
        {
           auth:{
                username,
                password
           }
        }    
    )
    .then(response => {
        console.log('url:', url);
        console.log('response:', response);
        list = response.data.result;
        if (response.status === 200) {
            statusMessage(STATUS_OK, 'OK: database modified successfully (status=' + response.status + ')')
        } else {    
            statusMessage(STATUS_WARNING, 'WARNING: database update responded with status ' + response.status)
        }    
        handleList(list);
    })
    .catch((e) => {
        console.log('ERROR: Failed to post URL:' + url);
        console.log('Error object e:', e);
        statusMessage(STATUS_ERROR, 'ERROR: CRUD transaction failed in url:' + url + ' Error:' + JSON.stringify(e)) 
        handleList(list);
    });
  
  }

  export default postCrud

  