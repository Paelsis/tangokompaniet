import axios from 'axios'
import statusMessage, {STATUS_OK, STATUS_WARNING, STATUS_ERROR} from 'functions/statusMessage'

export const postUpdTable = (url, table, username, password, id, data, handleReply) => {
    console.log('--- postUpdTable ---')
    console.log('url=', url);
    console.log('table=', table);
    console.log('id=', id);
    console.log('data=', data);

    if (data === undefined) {
        statusMessage(STATUS_ERROR, 'ERROR: data is undefined for url:' + url)
        handleReply(false, 'No data found');
    } else {
        axios.post(url, {table, id, data}, {auth:{username,password}})
        .then((response) => {
            console.log('url:', url);
            console.log('response:', response);
            if (response.status === 200) {
                console.log('postUpdData, status:', response.status)
                if (response.data.status === 'OK') {
                    statusMessage(STATUS_OK, 'OK: database modified successfully (status=' + response.status + ')')
                    handleReply(true, {...data, id});
                } else {
                    statusMessage(STATUS_WARNING, 'WARNING failed to update (status=' + response.status + 'data:' + JSON.stringify(response.data) + ')')
                }   
            } else {    
                console.log('postUpdData, status:', response.status)
                statusMessage(STATUS_WARNING, 'WARNING: database update responded with status=' + response.status + ' data=' + JSON.stringify(response.data))
                handleReply(false, {message:JSON.stringify(response.data), id});
            }    
        })
        .catch(e => {
            console.log('ERROR: Failed to post URL:' + url);
            console.log('Error object:', e); // Error
            statusMessage(STATUS_ERROR, 'ERROR: postUpdTable transaction failed for url:' + url + ' with error:' + e.message)
            handleReply(false, e.message);
        });
    }
}

export const postUpdTableAll = (url, table, username, password, data, handleReply) => {
    console.log('--- postUpdTableAll ---')
    console.log('url=', url);
    console.log('table=', table);
    console.log('data=', data);
    
    axios.post(url, {table, data}, {auth:{username,password}})
    .then((response) => {
        console.log('url:', url);
        console.log('response:', response);
        if (response.status === 200) {
            console.log('postUpdData, status:', response.status)
            statusMessage(STATUS_OK, 'OK: database modified successfully (status=' + response.status + ')')
            handleReply(true, {...data});
        } else {    
            console.log('postUpdData, status:', response.status)
            statusMessage(STATUS_WARNING, 'WARNING: database update responded with status ' + response.status)
            handleReply(false, {...data});
        }    
    })
    .catch((e) => {
        console.log('ERROR: Failed to post URL:' + url);
        console.log('Error object:', e); // Error
        statusMessage(STATUS_ERROR, 'ERROR: postUpdTable transaction failed for url:' + url)
        handleReply(false, e.message);
    });
}


  