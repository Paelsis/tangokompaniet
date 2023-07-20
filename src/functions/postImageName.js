import axios from 'axios'
import config from 'Settings/config';
const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl

export const postImageNames = (url, username, password, products, handleList) => {
    console.log('function:postImageNames products', products);

    let list=[]
        
    axios.post(url, {
        auth: {
            username: username,
            password: password,
        },
        products,
    })
    .then((response) => {
        console.log('url:', url);
        console.log('Status code:', response.status);
        console.log('response:', response);
        console.log('response.data:', response.data);
        console.log('response.data.status:', response.data.status);
        console.log('response.data.result:', response.data.result);
        list = response.data.result;
        handleList(list);
    })
    .catch((error) => {
        console.log('ERROR: Failed to post URL:' + url);
        console.log(error); // Error
        handleList(list);
    });
  }

  export const postImageName = (username, password, image, subdir, index, handleResponse) => {
    const url=apiBaseUrl + '/renameImage';
    console.log('function:postImageNames imageObj', image);
    const payload = { image, subdir }

    let result={}
      
    axios.post(url, payload, {auth: {username, password}})
    
    .then((response) => {
        console.log('url:', url);
        console.log('Status code:', response.status);
        console.log('response:', response);
        console.log('response.data:', response.data);
        console.log('response.data.status:', response.data.status);
        console.log('response.data.result:', response.data.result);
        result = response.data.result;
        handleResponse(result, index);
    })
    .catch((error) => {
        console.log('ERROR: Failed to post URL:' + url);
        console.log(error); // Error
        handleResponse(result, index);
    });
  }

  export default postImageName;
