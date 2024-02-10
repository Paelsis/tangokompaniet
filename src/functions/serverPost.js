import axios from 'axios'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

// serverPost
export default (irl, username, password, data, handleReply) => {
    const url = (irl.slice(0,4).toLowerCase().localeCompare('http'))===0?irl:(apiBaseUrl + irl)
    // // console.log('--- serverPost --- url:', url, ' data:', data);
    // alert('serverPost->axios.post url: ' + url + ' JSON.stringify(data):' + JSON.stringify(data))
    let axiosConfig = {
        //auth:{username, password}
    };
    axios.post(url, data, axiosConfig)
    .then(response => {
       if (response.data) {
            if (response.data.status) {
                if (response.data.status ==='OK') {
                    // statusMessage(STATUS_OK, 'OK: database modified successfully (response.data.status=' + response.data.status + 'JSON:'+ JSON.stringify(response.data) + ')');
                    // console.log('response', response.data)
                    // alert(JSON.stringify(response.data))
                } else {
                    // console.log('response', response.data)
                    alert('ERROR (in serverPost) Message:' + response.data.message?response.data.message:JSON.stringify(response))
                }    
            } else {
                // console.log('response', response.data)
                alert(JSON.stringify(response.data))
            }
        } else {    
            // console.log('WARNING: (in serverPost) No response data');
            alert('WARNING: (in serverPost) 200, No response data')
        }    
        handleReply(response.data);
    }).catch(e => {
        // console.log('ERROR (in serverPost): Failed in function serverPost for url ', url);
        // console.log('Error message:', e.message); // Error
        alert('ERROR (in serverPost) Failed to execute axios.post:' + JSON.stringify(e.message) + ' ' + JSON.stringify(e))
        handleReply({status:'ERROR', message:'No response when calling url:' + url + ' Message:' + e.message});
    });
}



