import React, {useState, useEffect} from 'react';
import fetchList from 'functions/fetchList';
import config from 'Settings/config' 
const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;

const styles = {
    table:{
        fontSize:'small',
        border:'2px solid grey',
        borderCollapse:'collapse'
    },    
    th:{
        backgroundColor:'grey',
        color:'white',
        border:'2px solid grey'
    },
    td:{
        border:'1px solid grey'
    }
}

const renderList = list =>
<table style={styles.table}>
    <thead>
        <tr>
            {Object.entries(list[0]).map(it=>
                <th style={styles.th}>{it[0]}</th>
            )}
        </tr>
    </thead>
    <tbody>
        {list.map(li =>
            <tr>
                {Object.entries(li).map(it=>
                    <td style={styles.td}>{it[1]}</td>
                )}
            </tr>
        )}
    </tbody>
</table>

// More components
const loadRecords = (props) => {
    const [list, setList] = useState([])
    const url = props.url?props.url:props.match.params.url
    useEffect(() => {
        const fullPath = apiBaseUrl + '/' + url
        fetchList('', '', fullPath, (list)=> setList(list));
    }, [])
    return(
        list.length > 0?
            renderList(list)
        :
            <h3>List not loaded yet ...</h3>
    )       
}   

export default loadRecords
