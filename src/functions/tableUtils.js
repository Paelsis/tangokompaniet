import postData from "./postData"

const username = process.env.REACT_APP_SLIM_USERID
const password = process.env.REACT_APP_SLIM_PASSWORD
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export const addRow = (table, row, handleReply) =>
{
    const url = apiBaseUrl + '/admin/replaceRow'
    const value = {
        table,
        data:row
    }  

    postData(url, username, password, value, handleReply)
}



export const replaceRow = (table, row, handleReply) =>
{
    const url = apiBaseUrl + '/admin/replaceRow'
    const value = {
        table,
        data:row
    }  

    postData(url, username, password, value, handleReply)
}

export const deleteRow = (table, id, handleReply) =>
{
    const url=apiBaseUrl + '/admin/deleteRow'
    const value = {
        table, 
        id
    }  

    postData(url, username, password, value, handleReply)
}
