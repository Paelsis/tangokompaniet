import axios from 'axios'
export default function axiosGet(url, handleReply) {
    axios({	
        method: 'get',
        url: url, 
    })
    .then(
        response => {
            console.log('OK: axiosGet response.data:', response.data);
            handleReply(response.data);
    })  
    .catch(error => {
            console.log('(Function: axiosGet) ERROR:', error);
            handleReply(null)
    })
}