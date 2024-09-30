import config from 'Settings/config';
import fetchList from './fetchList';

const apiBaseUrl=process.env.REACT_APP_API_BASE_URL;

export const fetchSelectList = (username, password, table, func) => {
    const url=apiBaseUrl + '/admin/tktable?tableName=' + table;
    fetchList(username, password, url, 
        list=>{
            // console.log('selectList:', list);
            func(list)
        }
    )  
}

export default fetchSelectList;
