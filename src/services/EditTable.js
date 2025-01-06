import React, {useState, useEffect} from 'react';
import {replaceRow, deleteRow} from '../services/serverPost'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email'
import SearchIcon from '@mui/icons-material/Search'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import CircularProgress from '@mui/material/CircularProgress';
import { Tooltip, IconButton, Button} from '@mui/material';
import { cyan, red } from '@mui/material/colors';
import ReactRte from 'react-rte';
import EditRecord from './EditRecord'
import {serverFetchData} from './serverFetch'


const FAILED_REPLY = {status:'ERROR', message:'FAILED: No reply to db'}

const TEXTAREA_FIELDS=['textBody']

const styles = {
    root:{
        margin:'auto',
        overflow:'auto',
        paddingBottom:20, 
        paddingLeft:20,
        minHeight:'100vh',
    },
    table:{
        fontSize:22,
        padding:20
    },
    tr: active=>({
        // textDecoration:active?'none':'line-through',
        fontStyle:active?'normal':'italic',
        opacity:active?1.0:0.6,
        backgroundColor:active?'lightGrey':'whitesmoke',
        wordWrap:'break-word',
        width:20,
    }),
    th:{
        color:'white'
    },
    td: {
        wordWrap:'break-word',
        maxLength:20
    },
    add: {
        wordWrap:'break-word',
    },
    search: {
        wordWrap:'break-word',
    }
}

const Rte = ({value, handleSave}) => {
    const [rteValue, setRteValue] = useState({})
    return(
        <ReactRte 
                value={rteValue} onChange={val => setRteValue(val)}
        />
    )
}

const maillist = (list, fld) => list.map(it => it[fld]?it[fld]:'').join(', ')

const HeaderValue = ({list, fld, comment, handleClick}) => 
    fld.indexOf('email')===-1?
        <Tooltip title={<h2>{comment}</h2>}>
            <th style={styles.th} size={10} key={fld} onClick={handleClick}>
                {fld}
            </th>
        </Tooltip>
    :  
        <th style={styles.th}>
            {fld}&nbsp;
            <a href={'mailto:?bcc=' + maillist(list, fld) + '&subject=Mail från TK'} target="_top">
                <EmailIcon style={{cursor:'pointer', fontSize:'small', color:'lightBlue'}} />
            </a>
        </th>


const SearchValue = ({fld, search, setSearch}) => {
    const handleChange = e => setSearch({...search, [e.target.name]:e.target.value}) 

    return (
        fld.indexOf('Timestamp')===-1?
            <th key={fld}>
                <input type='text' size={10} name={fld} placeholder={fld} value={search[fld]?search[fld]:''} onChange={handleChange} />
            </th>
        :  
            <th>
                <input type='text' size={10} name={fld + 'From'} placeholder={fld + 'From'} value={search[fld + 'From']} onChange={handleChange} />
                <input type='text' size={10}name={fld + 'To'} placeholder={fld + 'To'} value={search[fld + 'To']} onChange={handleChange} />
            </th>
    )    
    }

const _RenderView = ({list, colObjList, buttons, handleAdd, search, setSearch, filterList, setFilterList, handleFilter, handleComment}) => {
    const [sortCol, setSortCol] = useState()
    const [asc, setAsc] = useState(false)
    const compareFunc = (a, b) => {
            if (a[sortCol] && b[sortCol]) {
                if (typeof a[sortCol] === 'string' && typeof b[sortCol] === 'string') {
                    return a[sortCol].localeCompare(b[sortCol]) * (asc?1:-1)
                } else {    
                    return a[sortCol] - b[sortCol] * (asc?1:-1)
                }    
            } else if (a[sortCol]) {
                return (asc?-1:1)
            } else {
                return (asc?1:-1)
            }
    }    
    const keys = colObjList?colObjList.map(it=>it.Field):Object.keys(list[0])
    const filterFunc = key => key=='id'?false:true 
    
    const clearFilter = () => {
        setSearch({})
        setTimeout(()=>setFilterList(list) ,500)
    }

    const sortedList = sortCol?filterList.sort(compareFunc):list

    const handleClick = colName =>{
        setSortCol(colName)
        setAsc(!asc)
    }

    return(
    <table>
        <thead>
            <tr>
                <th colSpan={2} />
                {keys.filter(filterFunc).map(colName=>
                    <Tooltip title={handleComment(colName)}>  
                        <HeaderValue list={list} fld={colName?colName:'No name'} handleClick={()=>handleClick(colName)} comment={handleComment(colName)}/>
                    </Tooltip>
                )}    
            </tr>
            {list.length > 5?
            <tr>
                {<th>
                    <IconButton  onClick={handleFilter} >
                        <SearchIcon/>
                    </IconButton> 
                </th>}
                {<th>
                    <IconButton  onClick={()=>clearFilter()} >
                        <CancelIcon />
                    </IconButton> 
                </th>}
                {keys.filter(filterFunc).map(colName=>
                    <SearchValue fld={colName} search={search} setSearch={setSearch} />
                )}
            </tr>
            :null}
        </thead>
        <tbody>
            {filterList.map(row => 
                <tr style={styles.tr(row.active)}>
                    {buttons.map(but=>
                        <td style={styles.td}>
                            <Tooltip title={<h2>{but.tooltip}</h2>}>
                                <IconButton onClick={()=>but.onClick(row)}>
                                        {but.icon}
                                </IconButton>
                            </Tooltip>
                        </td>
                    )}    
                    {keys.filter(filterFunc).map(key=>
                        <td style={styles.td}>
                            <div dangerouslySetInnerHTML={{__html: row[key]}} />
                        </td>
                    )}       
                </tr>     
            )}      
                <tr style={styles.tr(false)}>
                    <td colSpan = {keys.length + 2} style={styles.td} >
                        <IconButton>
                            <AddIcon onClick={()=>handleAdd({})} />
                        </IconButton>
                    </td>                
                </tr>       

            </tbody>    
    </table>
    )
}    

// EditTable (columnsFilterFunc removes columns you do not want to edit)
export default ({tableName, columnsFilterFunc}) => {
    const [record, setRecord] = useState()
    const [search, setSearch] = useState({})
    const [list, setList] = useState()
    const [colObjList, setColObjList] = useState()
    const [filterList, setFilterList] = useState()

    const handleReplyFetchRows = reply => {
        const data = reply?reply.data?reply.data:reply:FAILED_REPLY
        if (data.status === 'OK' || data.status === 'true' || data.status) {
            setList(data.result)
        } else {
            alert('ERROR: Call to get data from table ' + tableName + ' failed. Message:' + data.message?data.message:'')
        }
    }    

    const handleReplyFetchColumns = reply => {
        const data = reply?reply.data?reply.data:reply:FAILED_REPLY
        if (data.status === 'OK' || data.status==='true') {
            if (data.result.length > 0) {
                if (columnsFilterFunc) {
                    setColObjList(data.result.filter(columnsFilterFunc))
                } else {
                    setColObjList(data.result)
                }    
            } else {
                alert('List of colObjList ha 0 length')
            }
        } else {
            alert('ERROR: Call to get colObjList failed. Message:' + data.message?data.message:'')
        }
    }    

    useEffect(()=>{
        serverFetchData('/getColumns?tableName=' + tableName, handleReplyFetchColumns) 
        serverFetchData('/fetchRows?tableName=' + tableName, handleReplyFetchRows)
        setRecord(undefined)
        setFilterList(undefined)
        setSearch({})
    },[tableName])

    const colObjListToEmptyObject = colObjList => {
        let obj = {}
        if (colObjList) {
            colObjList.map(col=>col.Field).filter(it=> it !== 'id' && it.indexOf('Timestamp') === -1).forEach(col=>    
            obj = {...obj, [col.Field]:''}
            )
        } else {
            obj = {}
        }
        return obj
    }    

    const handleComment = key => {
        const foundColumn = colObjList?colObjList.map(co=>co.Field).indexOf(key):undefined
        return foundColumn?foundColumn.Comment?foundColumn.Comment:'No help text':'No help text'
    } 

    const handleDeleteReply = (data, id) => {
        const dt = new Date().toLocaleString()
        if (data.status === 'OK') {
            const message='Successful delete of record in table ' + tableName + ' at ' + dt

            if (data.list) {
                setList(data.list) 
                handleFilter(data.list)

            } else {    
                let newList = []
                if (id) {
                    newList = list.filter(it=>it.id !== id)
                } else {
                    newList = list 
                }
                setList(newList)
                handleFilter(newList)
            } 
        } else {
            alert('Failed to delete row, result:' + JSON.stringify(data))    
        }
    }


    const handleDelete = id => {
        deleteRow(tableName, id, data=>handleDeleteReply(data, id))
    }

    const handleReplaceReply = data => {
        const dt = new Date().toLocaleString()
        if (data.status === 'OK') {
            const message='OK: Successful save/replace of record in table ' + tableName + ' at ' + dt

            if (data.list !== undefined) {
                const message='Successful save in table ' + tableName + ' at ' + dt
                setList(data.list) 
                handleFilter(data.list)
            } else {
                let newList = []
                if (record.id) {
                    // If id exists in record, then it is an update
                    let found = false;
                    newList = list.map(it=>{
                        if (record.id === it.id) {
                            found = true
                            return record
                        } else {
                            return it
                        }    
                    })    
                } else {
                    // If id does not exist in record, then it as an add
                    let newId = data.id?data.id:list.length > 0?list[list.length-1].id+10000:10000
                    newList = [...list, {...record, id:newId}] 
                }
                setList(newList)
                handleFilter(newList)


                setRecord(undefined)
            }    
        } else {
            const message='ERROR: Failed to add row in table ' + tableName + ' at ' + dt
            alert('Failed to add row, result:' + JSON.stringify(data))    
        }
    }


    const handleReplace = () => {
        replaceRow(tableName, record, handleReplaceReply)
    }

    const handleCancel = row => {
        setRecord(undefined)
    }

    const handleFilter = list => {
        let filterList = list
        const first = list[0] 
        Object.entries(search).forEach(it => {
            const key = it[0]
            const value = it[1]?it[1].toString():''

            if ((!key.includes('From') && !key.includes('To')) || first[key]) {
                filterList = filterList.filter(li => li[key]?li[key].toString().includes(value):true)
            } else {
                if (key.includes('From')) {
                    const fld = key.split('From')[0]
                    alert('key' + key)
                    filterList = filterList.filter(li => li[fld].localeCompare(value) >= 0)
                }    
                if (key.includes('To')) {
                    const fld = key.split('To')[0]
                    filterList = filterList.filter(li => li[fld].localeCompare(value) <= 0)
                }    

            }    
        })           
        setFilterList(filterList)         
    }



    //const emptyRow = colObjListToEmptyObject(colObjList)

    const buttonsView = [
        {
            icon:<EditIcon />,
            tooltip:'Edit row',
            onClick:row=>setRecord(row)
        },
        {
            icon:<DeleteIcon />,
            tooltip:'Delete row from database',
            onClick:row=>handleDelete(row.id)
        },
    ]    

    const buttonsEdit = [
        {
            icon:<SaveIcon />,
            tooltip:'Save row to database',
            onClick:handleReplace
        },
        {
            icon:<CancelIcon />,
            tooltip:'Cancel edit',
            onClick:row=>handleCancel(row)
        },
        {
            icon:<DeleteIcon />,
            tooltip:'Delete row from database',
            onClick:row=>handleDelete(row.id)
        },
    ]

    const colsEdit = record?Object.keys(record):undefined
  
    return(
        <div style={styles.root}>
            {record?
                <>
                   <EditRecord cols={colsEdit} colObjList={colObjList} record={record} setRecord={setRecord} buttons={buttonsEdit} />
                </>
            :list?list.length > 0?
                <>
                    <_RenderView 
                        list={list}
                        colObjList={colObjList}
                        buttons={buttonsView}
                        search={search}
                        setSearch={setSearch}
                        handleAdd={setRecord}
                        filterList={filterList?filterList:list} 
                        setFilterList={setFilterList} 
                        handleFilter={()=>handleFilter(list)}
                        handleComment={handleComment} 
                    />
                </>
            :
                <h4 className='title is-4'>No rows in table {tableName}</h4>
            :
                <CircularProgress />
            }    
        </div>
    )
}


