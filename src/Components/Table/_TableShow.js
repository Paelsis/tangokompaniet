import React, {useState, useEffect} from 'react';
import {addRow, replaceRow, deleteRow} from 'functions/tableUtils'
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import AddIcon from '@material-ui/icons/PlaylistAdd';
import Tooltip from '@material-ui/core/Tooltip';
import EmailIcon from '@material-ui/icons/Email'
import SearchIcon from '@material-ui/icons/Search'
import CancelIcon from '@material-ui/icons/Cancel'

const styles = {
    root:{
        margin:'auto'
    },
    th: {
        wordWrap:'break-word',
        width:20
    },
    tr: active=>({
        backgroundColor:active?active==1?'orange':'transparent':'transparent',
        textDecoration:active?active==1?'none':'line-through':'none',
        opacity:active?active==1?1.0:0.4:1.0,
        wordWrap:'break-word',
        width:20
    }),
    td: {
        wordWrap:'break-word',
        maxLength:20
    },
    add: {
        fontSize:20,
        background:'lightGreen'
    },
    search: {
        background:'lightYellow'
    }
}

const RenderEdit = ({record, handleChange, handleSave, handleCancel}) => {

    return(
        record?
            <div style={styles.root}>
                {Object.entries(record).filter(it=>it[0] !== 'id' && it[0].indexOf('Timestamp') === -1).map(it=>
                    <tr style={{fontSize:20}}>
                        <td>{it[0]}</td>
                        <td><input  style={styles.add} type='text' name={it[0]} placeholder={it[0]} value = {it[1]} onChange={handleChange}/></td>
                    </tr>
                )}       
                <td>
                    {record.id?
                        <Tooltip title={'Save'}>
                           <SaveIcon onClick={handleSave}/>
                        </Tooltip>   
                    :
                        <Tooltip title={'Add row to table'}>
                            <AddIcon size={'large'} onClick={handleSave}/>
                        </Tooltip>   
                    }
                    &nbsp;
                    {
                        <Tooltip title={'Cancel'}>
                            <CancelIcon onClick={handleCancel}/>
                        </Tooltip>   
                    }
                </td>
            </div>
        :
            <h3>No record</h3>
    )
}

const maillist = (list, fld) => list.map(it => it[fld]?it[fld]:'').join(', ')

const HeaderValue = ({list, fld, comment}) => 
    fld.indexOf('email')===-1?
        <Tooltip title={<h2>{comment}</h2>}>
            <th size={10} key={fld}>
                {fld}
            </th>
        </Tooltip>
    :  
        <th>
            {fld}&nbsp;
            <a href={'mailto:?bcc=' + maillist(list, fld) + '&subject=Mail från TK'} target="_top">
                <EmailIcon style={{cursor:'pointer', fontSize:'small'}} />
            </a>
        </th>


const SearchValue = ({fld, search, setSearch}) => {
    const handleChange = e => setSearch({...search, [e.target.name]:e.target.value}) 

    return (
        fld.indexOf('Timestamp')===-1?
            <th key={fld}>
                <input type='text' style={styles.search} size={10} name={fld} placeholder={fld} value={search[fld]} onChange={handleChange} />
            </th>
        :  
            <th>
                <input type='text' style={styles.search} size={10} name={fld + 'From'} placeholder={fld + 'From'} value={search[fld + 'From']} onChange={handleChange} />
                <input type='text' style={styles.search} size={10}name={fld + 'To'} placeholder={fld + 'To'} value={search[fld + 'To']} onChange={handleChange} />
            </th>
    )    
}

const RenderTable = ({list, filterList, handleEdit, handleDelete, search, setSearch, handleSearch, handleComment}) =>
    <table style={{...styles.root, border:'1px solid lightGrey', margin:10}} >
        <thead>
            <tr>
                {Object.keys(list[0]).filter(it=>it !=='id').map(it=>
                    <Tooltip title={handleComment(it)}>  
                        <HeaderValue list={list} fld={it?it:'No name'} comment={handleComment(it)}/>
                    </Tooltip>
            )}    
            </tr>
            <tr>
                {Object.entries(list[0]).filter(it=>it[0]!=='id').map(it=><SearchValue fld={it?it[0]?it[0]:'No name':'No object'} search={search} setSearch={setSearch} />)}
                {<th><SearchIcon onClick={handleSearch} /></th>}
            </tr>
        </thead>          
        <tbody>
            {filterList.map(row => 
                    <tr style={styles.tr(row.active)}>
                        {Object.entries(row).filter(it=>it[0]!=='id').map(it=>
                            <td style={styles.td}>
                                <div dangerouslySetInnerHTML={{__html: it[1]}} />
                            </td>
                        )}       
                        <td><EditIcon onClick={()=>handleEdit(row)} /></td>
                        <td><DeleteForeverIcon onClick={()=>handleDelete(row.id)} /></td>
                    </tr>            
                )
            }      
        </tbody>    
    </table>


export default ({table, list, setList, columns, style}) => {
    const [record, setRecord] = useState(undefined)
    const [search, setSearch] = useState({})
    const [filterList, setFilterList] = useState()

    useEffect(()=>setRecord(undefined), [columns])

    const columnsToObject = columns => {
        let obj = {}
        columns.filter(col=>col.Field !== 'id' && col.Field.indexOf('Timestamp') === -1).forEach(col=>    
           obj = {...obj, [col.Field]:''}
        )
        return obj
    }    

    const handleComment = key => {
        const foundColumn = columns.find(co=>co.Field===key)
        return foundColumn?foundColumn.Comment?foundColumn.Comment:'No help text':'No help text'
    } 

    const handleDeleteReply = data => {
        if (data.status === 'OK') {
            if (data.list !== undefined) {
                setList(data.list) 
            } else {
                alert('Delete successful but the reply is missing value data.list, data:' + JSON.stringify(data))    
            }    
        } else {
            alert('Failed to delete row, result:' + JSON.stringify(data))    
        }
    }


    const handleDelete = id => {
        deleteRow(table, id, handleDeleteReply)
    }

    const handleAddReply = data => {
        if (data.status === 'OK') {
            if (data.list !== undefined) {
                setList(data.list) 
                setFilterList(undefined)
            } else {
                alert('Replace successful but the reply is missing value data.list, data:' + JSON.stringify(data))    
            }    
        } else {
            alert('Failed to add row, result:' + JSON.stringify(data))    
        }
    }

    const handleReplaceReply = data => {
        if (data.status === 'OK') {
            if (data.record) {
                setList(list.map(it=> {
                    if (it.id === data.record.id) {
                        return {...it, ...data.record}
                    } else {
                        return it
                    } 
                })) 
            } else {
                alert('Replace successful but the reply is missing value data.record, data:' + JSON.stringify(data))    
            }       
        } else {
            alert('Failed to replace row, result:' + JSON.stringify(data))    
        }
    }    

    const handleSave = () => {
        if (record.id === undefined) {
            // alert('add row:' + JSON.stringify(record))
            replaceRow(table, record, handleAddReply)
        } else {
            // alert('change row:' + JSON.stringify(record))
            replaceRow(table, record, handleReplaceReply)
        }   
            // Replace row in database
        setRecord(undefined)
    }

    const handleChange = e => {
        setRecord({...record, [e.target.name]:e.target.value})
    }

    const handleCancel = e => {
        setRecord(undefined)
    }


    const handleSearch = () => {
        let filterList = list
        const first = list[0] 
        Object.entries(search).forEach(it => {
            const key = it[0]
            const value = it[1]

            if ((!key.includes('From') && !key.includes('To')) || first[key]) {
                filterList = filterList.filter(li => li[key].includes(it[1]))
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

    const emptyRow = columnsToObject(columns)
  
    return(
        <div style={styles.root}>
            {record?
                <RenderEdit 
                    record={record} 
                    handleChange={handleChange} 
                    handleSave={handleSave} 
                    handleCancel={handleCancel}
                    />
            :list.length > 0?
                <>
                    <Tooltip title={'Add row'}>
                        <AddIcon onClick={()=>setRecord(emptyRow)} />
                    </Tooltip>    
                    <RenderTable 
                        list={list}
                        filterList={filterList?filterList:list} 
                        search={search}
                        setSearch={setSearch}
                        handleSearch={handleSearch}
                        handleEdit={row=>setRecord(row)} 
                        handleDelete={handleDelete} 
                        handleComment={handleComment} 

                    />
                </>
            :null}
        </div>
    )
}


/* {JSON.stringify(columnsToObject(columns))} */

