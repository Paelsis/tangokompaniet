import axios from 'axios'
import statusMessage, {STATUS_OK, STATUS_ERROR} from 'functions/statusMessage'

const logArray = (title, array) => {
    array.forEach((rec, index) => {
        let line=title + ': ';
        Object.entries(rec).forEach((obj, colIndex) => {
            line=line + '[\'' + obj[0] + '\']:' + obj[1] + ','; 
        })
        console.log(line)
    })
}

const postCrud = (url, username, password, table, data, handleList) => {
    console.log('Function insertRecord for table=', table)
    console.log('data:', data);

    let list=[]
    axios.post(url, {payload: {table, data}}, {auth:{username,password}})
    .then((response) => {
        console.log('url:', url);
        console.log('Data:', response.data);
        list = response.data.result?response.data.result:[];
        statusMessage(STATUS_OK, 'OK: transaction successful')
        handleList(list);
    })
    .catch((e) => {
        console.log('ERROR: Failed to post URL:' + url);
        console.log('Error object:', e); // Error
        statusMessage(STATUS_ERROR, 'ERROR: Failed to post data to database for url:' + url)
        handleList(list);
    });
  
  }


  