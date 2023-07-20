import axios from 'axios'

const insertRecord = (event, url, username, password, name, data) => {
    console.log('Function insertRecord')
    axios.post(url, {
        auth: {
            username: username,
            password: password,
        },
        table: {
            name: name, // The name of the table
            data: data, // The data object that contains the columns of the table as a map
        }, 
    })
    .then(function (response) {
        console.log('url:', url, 'username:', username, 'password:', password);
        console.log('Status code:', response.status);
        console.log('Status data:', response.data);
    })
    .catch(function (error) {
        console.log('ERROR: Failed to fetch from URL:' + url, error);
        console.log(error.response); // Network Error
        console.log(error.status); // undefined
        console.log(error.code); // undefined
    });
    
    // event.preventDefault();
  }

  export default insertRecord;