import axios from 'axios'
const fetchResult = (username, password, url, handleResult) => {
    // console.log('fetchList: url:' + url);
    // console.log('fetchList: url:' + url + ' username:' + username + ' password:' + password);
    axios({	
        method: 'get',
        url: url, 
        auth: {
            username,
            password,
        }
      })
    .then(response => {
        const result = response.data?response.data.result?response.data.result:[]:[];
        handleResult(result);
    })
    .catch(e => {
        console.log('(function: functions/fetchList) URL:', url);
        console.log('(function: functions/fetchList) Error message:', e);
        handleResult(undefined);
    });
}

export default fetchResult;
