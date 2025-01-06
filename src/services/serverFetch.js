import axios from 'axios'
const username = process.env.REACT_APP_SLIM_USERNAME
const password = process.env.REACT_APP_SLIM_PASSWORD
const auth = {
    username,
    password,
}

// serverFetchDataResult
export function serverFetchDataResultApi(apiBaseUrl, irl, handleResult) {
    const url= irl.slice(0,4).toLowerCase().localeCompare('http')===0?irl:apiBaseUrl + irl
    console.log('fetch url:', url)
    axios({
        method: 'get',
        url,
        auth,
      })
    .then(response => {
        const data = response.data?response.data:response
        const status = data.status?data.status:undefined
        if (status?(status === 'OK' || status === 'WARNING'):false) {
            handleResult(data.result?data.result:[]);
        } else {    
            const message = data.message?data.message:undefined
            alert('[serverFetchDataResult]' + status?status:'NO STATUS' + ': No result found in response to ' + irl + ', message:' + message?message:'No message')
        } 
    })
    .catch(e => {
        if (e?!!e.message:false) {
            const errorMessage = 'url=' + url + ' e:' + JSON.stringify(e.message)
            alert(errorMessage)
            console.log('[serverFerchDataResult] ERROR: message =' , errorMessage);
        }
        handleResult(undefined);
    });
}

// serverFetchDataResult
function serverFetchDataApi(apiBaseUrl, irl, handleReply) {
    const url= irl.slice(0,4).toLowerCase().localeCompare('http')===0?irl:apiBaseUrl + irl
    console.log('fetch url:', url)
    axios({
        method: 'get',
        url,
        auth,
      })
    .then(response => {
        const data = response?response.data?response.data:response:undefined
        if (data) {
            if (data.status === 'OK' || data.status === 'true' || data.status) {
                //const message = '[serverFetchData] status:' + data.status + ' WARNING: data:' + JSON.stringify(data)
            } else {
                const message = '[serverFetchData] status:' + data.status + ' WARNING: data:' + JSON.stringify(data)
                alert(message)
                handleReply(data)
            }
            handleReply(data);
        } else {    
            const message = '[serverFetchData] No data for request url:' + url
            alert(message)
        } 
    })
    .catch(e => {
        if (e?!!e.message:false) {
            const errorMessage = 'url=' + url + ' e:' + JSON.stringify(e.message)
            console.log('[serverFerchData] Error message:', errorMessage);
            alert('[serverFerchData] ERROR: axios call failed, message:' + errorMessage)
        }
    });
}

export const serverFetchDataResult = (irl, handleReply) => serverFetchDataResultApi(process.env.REACT_APP_API_BASE_URL, irl, handleReply)
export const serverFetchData = (irl, handleReply) =>  serverFetchDataApi(process.env.REACT_APP_API_BASE_URL, irl, handleReply)

