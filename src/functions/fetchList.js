import axios from 'axios'

const fetchList = (username, password, url, handleResult) => {
    // // console.log('fetchList: url:' + url);
    // // console.log('fetchList: url:' + url + ' username:' + username + ' password:' + password);
    axios({	
        method: 'get',
        url: url, 
        auth: {
            username,
            password,
        }
      })
    .then(response => {
        if (response.data?response.data.status==='OK':response.data.status === true) {
            const result = response.data?response.data.result?response.data.result:[]:[];
            handleResult(result);
        } else {
           console.log('[function: functions/fetchList]: Failed to fetch list for url:', url);
           alert('Failed to fetch list with url:' + url)
        }   
    })
    .catch(e => {
        // console.log('(function: functions/fetchList) URL:', url);
        // console.log('(function: functions/fetchList) Error message:', e);
        handleResult([]);
    });
}

export default fetchList;
