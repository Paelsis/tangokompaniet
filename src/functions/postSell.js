import axios from 'axios'

const logArray = (title, array) => {
    array.forEach((rec, index) => {
        let line=title + ': ';
        Object.entries(rec).forEach((obj, colIndex) => {
            line=line + '[\'' + obj[0] + '\']:' + obj[1] + ','; 
        })
        console.log(line)
    })
}

const postSell = (url, username, password, keys, data, ) => {
    console.log('Function postSell id=', keys['id']);
    console.log('Function postSell productId=', keys['productId']);
    console.log('Function postSell size=', data['size']);
    console.log('Function postSell increment=', data['increment']);
    const payload =  {keys:keys, data:data}   
    axios.post(url, payload, {auth: {username,password}},
)
    .then((response) => {
        console.log('url:', url);
        console.log('response:', response);
        console.log('response.data:', response.data);
        console.log('response.data.status:', response.data.status);
        console.log('response.data.result:', response.data.result);
        (response.data.result);
    })
    .catch((error) => {
        console.log('ERROR: Failed to post URL:' + url);
        console.log(error); // Error
        (null);
    });
}

  export default postSell;

  