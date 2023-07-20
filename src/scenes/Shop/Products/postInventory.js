import axios from 'axios'

const postInventory = (url, username, password, product, inventoryList, handleList) => {
    console.log('function:postInventory product:', product);
    console.log('function:postInventory inventoryList:', inventoryList);
       
    axios.post(url, {
        auth: {
            username: username,
            password: password,
        },
        product,
        inventoryList,
    })
    .then((response) => {
        console.log('url:', url);
        console.log('Status code:', response.status);
        console.log('response:', response);
        console.log('response.data:', response.data);
        console.log('response.data.status:', response.data.status);
        console.log('response.data.product:', response.data.product);
        console.log('response.data.inventoryList:', response.data.inventoryList);
        handleList(response.data.product, response.data.inventoryList);
    })
    .catch((error) => {
        console.log('ERROR: Failed to post URL:' + url);
        console.log(error); // Error
        handleList(product, inventoryList);
    });
  }

  export default postInventory;
