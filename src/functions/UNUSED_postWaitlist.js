import axios from 'axios'
import config from 'Settings/config'

const postWaitlist = (url, username, password, course, handleResult) => {
    console.log('function:postPaymentCheckout course:', course);
       
    axios.post(url, {
        auth: {
            username,
            password,
        },
        course,
    })
    .then((response) => {
        console.log('url:', url);
        console.log('response:', response);
        handleResult(response.data.result);
    })
    .catch((error) => {
        console.log('ERROR: Failed to post URL:' + url);
        console.log(error); // Error
    });
  }


export default postWaitlist;
