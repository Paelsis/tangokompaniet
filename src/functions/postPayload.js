import axios from 'axios'
import statusMessage, {STATUS_OK, STATUS_WARNING, STATUS_ERROR} from 'functions/statusMessage'

const postPayload = (url, username, password, payload, handleResult) => {

    let data=null;
    console.log('---- postPayload ---', payload, username, password)
        
    axios.post(url, payload, {auth:{username,password}})
    .then((response) => {
        console.log('--- postPayload, url:---', url);
        if (response.status === 200) {
            console.log('postPayload response:', response);
            statusMessage(STATUS_OK, 'OK: database modified successfully (status=' + response.status + ')')
            data = response.data;
        } else {    
            console.log('WARNING: post failed and returned with status code:', response.status?response.status:'undefined');
            statusMessage(STATUS_WARNING, 'WARNING: database update responded with response status ' + response.status)
        }    

        handleResult(data);
    })
    .catch((e) => {
        console.log('ERROR: Failed to post URL:' + url);
        console.log('Error object:', e); // Error
        statusMessage(STATUS_ERROR, 'ERROR: transaction failed to post url:' + url)
        handleResult(data);
    });
}


export const postPayloadWithoutStatus = (url, username, password, payload, handleResult) => {
    console.log('payload:', payload)

    let data=null;
        
    axios.post(url, payload, {auth:{username,password}})
    .then((response) => {
        console.log('--- postPayload, url:---', url);
        if (response.status === 200) {
            data = response.data;
        } else {    
            console.log('WARNING: postPayload failed and returned with status code:', response.status?response.status:'undefined');
        }    

        handleResult(data);
    })
    .catch((e) => {
        console.log('ERROR: Failed to post URL:' + url);
        console.log('Error object:', e); // Error
        statusMessage(STATUS_ERROR, 'ERROR: transaction failed to post url:' + url)
        handleResult(data);
    });
}

export default postPayload;

  