import axios from 'axios'

const postPayment  = (url, paymentMethod, username, password, itemsList, handleResult) => {
    let result={}
        
    axios.post(url, {
        auth: {
            username: username,
            password: password,
        },
        payload: {
            paymentMethod,
            itemsList: itemsList, // The data object 
        }    
    })
    .then((response) => {
        console.log('url:', url);
        console.log('Status code:', response.status);
        console.log('response:', response);
        console.log('response.data:', response.data);
        console.log('response.data.result:', response.data.result);
        console.log('response.data.status:', response.data.status);
        handleResult(paymentMethod, response.data);
    })
    .catch((error) => {
        console.log('ERROR: Failed to post URL:' + url);
        console.log(error); // Error
        handleResult(paymentMethod, {});
    });
  
  }

  export default postPayment;

  