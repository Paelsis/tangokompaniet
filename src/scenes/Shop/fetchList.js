//import React from 'react';
import axios from 'axios'

const fetchList = (username, password, url, handleList) => {
    var list = []
    // Make an axios request for a user with a given ID 
    //instance.get('/app/slim.test/public/inventory')
    console.log('fetchList: url:' + url + ' username:' + username + ' password:' + password);
    
   // axios.get(url, {auth: {username:'root', password:''}})
   axios({	
        method: 'get',
        url: url, 
        auth: {
            username: username,
            password: password,
          }
      })
    .then(
            response => {
            console.log('(function Shop/fetchList) url:', url)
            console.log('OK: status code:', response.status);
            console.log('OK: response.data:', response.data);
            console.log('OK: response.data.result:', response.data.result);
            console.log('OK: response.data.result.length:', response.data.result.length);
            list = response.data.result;
            handleList(list);
    })
    .catch(error => {
            console.log('(Function: Shop/fetchList) ERROR: Failed to fetch from URL:' + url, error);
            console.log(error.response); // Network Error
            console.log(error.status); // undefined
            console.log(error.code); // undefined
            handleList(list);
    });

    console.log('AT END counter:', list.length); 

}


export default fetchList;
