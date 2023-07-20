import axios from 'axios'
import statusMessage, {STATUS_OK, STATUS_WARNING, STATUS_ERROR} from 'functions/statusMessage'


const postData = (url, username, password, data, handleReply) => {
    console.log('--- postData --- url:', url, ' data:', data);

    axios.post(url, data, {auth: {username, password}})
    .then(response => {
        const status = response.status?response.status:'No status'
        if (response.status === 200) {
            if (typeof response.data.status === 'string' || response.data.status instanceof String) {
                if (response.data.status === 'OK') {
                    // statusMessage(STATUS_OK, 'OK: database modified successfully (response.data.status=' + response.data.status + 'JSON:'+ JSON.stringify(response.data) + ')');
                    statusMessage(STATUS_OK, 'OK: database modified successfully');
                    console.log('response', response)
                } else {
                    statusMessage(STATUS_WARNING, "WARNING: Post responded with (response.data.status=" + response.data.status + " response.status=" + response.status + ')');
                    console.log('response', response)
                }    
            } else {
                console.log('response', response)
                statusMessage(STATUS_WARNING, 'WARNING: The field respose.data.status is missing (normally set to OK, WARNING or ERROR) (response.data:' + JSON.stringify(response.data));
            }
        } else {    
            console.log('WARNING: postData responed back status with respons.status:', response.status);
            statusMessage(STATUS_WARNING, 'ERROR: Post of data responded back with response status ' + status + '(JSON: response.data=' + JSON.stringify(response.data) + ')')
        }    
        handleReply(response.data);
    })
    .catch((e) => {
        console.log('ERROR: Failed in function postData for url ', url);
        console.log('Error message:', e); // Error
        alert('postData failed ' + JSON.stringify(e))
        statusMessage(STATUS_ERROR, 'ERROR: transaction failed with message:');
        handleReply({code:501, status:'ERROR', message:'ERROR: No response when calling url:' + url});
    });
}

export default postData  