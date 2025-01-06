import axios from 'axios'
import statusMessage, {STATUS_OK, STATUS_WARNING, STATUS_ERROR} from 'functions/statusMessage'

const SLIM_USERNAME = process.env.REACT_APP_SLIM_USERID 
const SLIM_PASSWORD = process.env.REACT_APP_SLIM_PASSWORD 

// postUpdTable
export const postUpdTable = (url, table, id, data, handleReply) => {
    // console.log('--- postUpdTable ---')
    // console.log('url=', url);
    // console.log('table=', table);
    // console.log('id=', id);
    // console.log('data=', data);

    const username = SLIM_USERNAME
    const password = SLIM_PASSWORD

    if (data === undefined) {
        alert('ERROR: data is undefined for url:' + url)
        handleReply(STATUS_ERROR, 'No data found');
    } else {
        axios.post(url, {table, id, data}, {auth:{username,password}})
        .then((response) => {
            // console.log('url:', url);
            // console.log('response:', response);
            if (response.status === 200) {
                // console.log('postUpdData, status:', response.status)
                if (response.data.status === 'OK') {
                    handleReply(STATUS_OK, {...data, id});
                } else if (response.data.status) {
                    const message = response.data.status + ':Update failed for url:' + url 
                    alert(message)
                } else {
                    const message = 'UNSET reply status. Update failed for url:' + url 
                    alert(message)
                }   
            } else {    
                // console.log('postUpdTable, status:', response.status)
                const message = 'WARNING: database update responded with status=' + response.status + ' data=' + JSON.stringify(response.data)
                alert(message)
                handleReply(STATUS_ERROR, {message:JSON.stringify(response.data), id});
            }    
        })
        .catch(e => {
            // console.log('ERROR: Failed to post URL:' + url);
            // console.log('Error object:', e); // Error
            const message = 'ERROR: postUpdTable transaction failed for url:' + url + ' with error:' + e.message
            handleReply(STATUS_ERROR, message);
        });
    }
}

export const postUpdTableAll = (url, table, data, handleReply) => {

    const username = SLIM_USERNAME
    const password = SLIM_PASSWORD

    axios.post(url, {table, data}, {auth:{username,password}})
    .then((response) => {
        // console.log('url:', url);
        // console.log('response:', response);
        if (response.status === 200) {
            // console.log('postUpdTableAll, status:', response.status)
            statusMessage(STATUS_OK, 'OK: database modified successfully (status=' + response.status + ')')
            handleReply(STATUS_OK, data);
        } else {    
            // console.log('postUpdTableAll, status:', response.status)
            statusMessage(STATUS_WARNING, 'WARNING: database update responded with status ' + response.status)
            handleReply(false, data);
        }    
    })
    .catch((e) => {
        // console.log('ERROR: Failed to post URL:' + url);
        // console.log('Error object:', e); // Error
        statusMessage(STATUS_ERROR, 'ERROR: postUpdTableAll transaction failed for url:' + url)
        handleReply(false, e.message);
    });
}


  