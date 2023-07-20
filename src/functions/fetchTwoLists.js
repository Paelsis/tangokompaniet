import axios from 'axios'

const fetchTwoLists = (username, password, urls, handleLists) => {
  let list1 = []
  let list2 = []
    // Make an axios request for a user with a given ID 
    //instance.get('/app/slim.test/public/inventory')
    console.log('fetchList: urls:' + urls + ' username:' + username + ' password:' + password);
    
   // axios.get(url, {auth: {username:'root', password:''}})
  axios.all([
    axios.get(urls[0]),
    axios.get(urls[1])
   ])
  .then(axios.spread((response1, response2) => {
     console.log('(function fetchTwoLists) url1:', urls[0])
     console.log('(function fetchTwoLists) url2:', urls[1])
     console.log('OK1: response1.data.result:', response1.data.result);
     console.log('OK2: response2.data.result:', response2.data.result);
     console.log('OK1: List size1:' + response1.data.result.length);
     console.log('OK2: List size2:' + response2.data.result.length);
     if (response1.status < 300) {
      list1=response1.data.result; 
     } 
     if (response2.status < 300) {
      list2=response2.data.result; 
     }
     handleLists(list1, list2);
    // do something with both responses
  })) 
  .catch(error => {
            console.log('(function: fetchTwoLists) ERROR: Failed to fetch from URLS:' + urls, error);
            console.log(error.response); // Network Error
            console.log(error.status); // undefined
            console.log(error.code); // undefined
            handleLists(list1, list2);
  });

  console.log('AT END counter of both lists:', list1.length + list2.length); 

}

export default fetchTwoLists;
