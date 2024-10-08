
import {store} from 'index.js'
import config from 'Settings/config';
import postPayload from 'functions/postPayload'

const apiBaseUrl=process.env.REACT_APP_API_BASE_URL;
const url = apiBaseUrl + '/admin/deleteRow'

// deleteRow
export default (table, id, handleReply) => {
    const payload = {table, id}
    const user = store.getState().user
    const username = user?user.username:''
    const password = user?user.password:''
    // console.log(url, username, password, payload)
    postPayload(url, username, password, payload, handleReply)
}
