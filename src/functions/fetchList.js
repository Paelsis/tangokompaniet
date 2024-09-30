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
        const data = response.data?response.data:response
        if (data?data.status==='OK'?true:data.status === 'true'?true:data.status===true:false) {
            const result = data.result?data.result:[]
            handleResult(result);
        } else {
           console.log('[function: functions/fetchList]: Failed to fetch list for url:', url);
           handleResult([]);
        }   
    })
    .catch(e => {
        // console.log('(function: functions/fetchList) URL:', url);
        // console.log('(function: functions/fetchList) Error message:', e);
        handleResult([]);
    });
}

export default fetchList;
