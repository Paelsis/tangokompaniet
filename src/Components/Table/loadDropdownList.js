import fetchList from 'functions/fetchList';
import config from 'Settings/config';
import groupBy from 'functions/groupBy';

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;

export function loadDropdownList(username, password, tableName, selectKey, selectValue, func) {
    fetchList(
        username, 
        password, 
        apiBaseUrl + '/admin/tktableWithoutId?tableName=' + tableName,
        list=>{ 

            const selectList = list.map(li => ({key:li[selectKey], value:li[selectValue]}))   
            console.log('selectKey', selectKey, ' selectValue:', selectValue, ' selectList:', selectList);
            func(selectList);
        })
}   

export function loadUniqueTemplateList(username, password, tableName, func) {
    fetchList(
        username, 
        password, 
        apiBaseUrl + '/admin/tktableWithoutId?tableName=' + tableName,
        list=> { 
            const selectList = list.map(li => li.templateName)   
            const fieldMap = groupBy(selectList, it => it)
            const uniqueList = [...fieldMap.keys()]
            func(uniqueList);
        })
}   

export function loadDropdownListObjects(username, password, tableName, func) {
    fetchList(
        username, 
        password, 
        apiBaseUrl + '/admin/tktableWithoutId?tableName=' + tableName,
        objectList=>{ 

            console.log('loadDropdownListObjects:selectList=', objectList);
            func(objectList);
        })
}   
