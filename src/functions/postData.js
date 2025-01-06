import axios from 'axios'
import statusMessage, {STATUS_OK, STATUS_WARNING, STATUS_ERROR} from 'functions/statusMessage'

const postData = (url, username, password, data, handleReply) => {
    // console.log('--- postData --- url:', url, ' data:', data);
    axios.post(url, data, {auth: {username, password}})
    .then(response => {
        const status = response.status?response.status:'No status'
        if (response.status === 200) {
            if (typeof response.data.status === 'string' || response.data.status instanceof String) {
                if (response.data.status === 'OK') {
                    console.log('[postData] Save successful')
                } else {
                    console.log('[postData] ERROR: Save failed. status = ' + response.data.status + ' message = ' + (response.data.message?response.data.message:'No message'))
                }    
            } else {
                console.log('[postData] ERROR: Save failed. No status returned from url = ' + url)
            }
        } else {    
            console.log('[postData] ERROR: Severe error. respons.status = ' + (response.status?response.status:'No respsonse status'))
        }    
        handleReply(response.data);
    })
    .catch((e) => {
        // console.log('ERROR: Failed in function postData for url ', url);
        // console.log('Error message:', e); // Error
        const strError = JSON.stringify(e)
        handleReply({status:'ERROR', message:strError});
    });
}

export default postData  