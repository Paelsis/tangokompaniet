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
import ReactRte from 'react-rte';
import tkColors from 'Settings/tkColors'
import RadioInput from '../RadioInput'
import CheckboxInput from '../CheckboxInput'
const TEXTAREA_FIELDS=['textBody']

const styles = {
    root:{
        marginRight:'10px',
        overflowX:'auto',
    },
    th: {
        color:tkColors.background,  
        backgroundColor:'black',
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
        fontSize:18,
        background:'lightGreen'
    },
    search: {
        background:'lightYellow'
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




const RenderRow = ({ky, value, columns, handleChange}) => {

    let col = columns.find(col => ky === col.Field)
    const {Comment, MaxLength, Type, Type2, Min, Max, RadioValues} = col
    return(
        <tr style={{fontSize:18}}>
        {ky === 'id'?
            <td style={{opacity:0.5}} colSpan={3}>{ky}={value}</td>
        :
            <>
                <Tooltip title = {Comment} >
                    <td>{ky}</td>
                </Tooltip>
                <td>
                    {Type2 === 'radio'?
                        <RadioInput name={ky} value={value} radioValues={RadioValues} handleChange={handleChange} />
                    :Type2 === 'checkbox'?
                        <CheckboxInput label={ky} name={ky} value={value} handleChange={handleChange} /> 
                    :Type2 === 'textarea'?
                        <textarea 
                            style={styles.add} 
                            rows={3} 
                            columns={50} 
                            name={ky} 
                            value={value} 
                            maxLength={MaxLength}
                            onChange={handleChange}/>
                    :
                        <input 
                            style={styles.add} 
                            type={Type2} 
                            min={Min} 
                            max={Max} 
                            name={ky} 
                            maxLength={MaxLength} 
                            value={value} 
                            onChange={handleChange}
                        />
                    }    
                </td>
                <td style={{fontSize:12}}>&nbsp;{MaxLength?'Max length=' + MaxLength:''}</td>
            </>
        }
        </tr>
    )
}

const RenderEdit = ({record, columns, handleChange, handleSave, handleCancel}) => {
    const entries = record?Object.entries(record):[]
    return(
        record?
            <div style={styles.root}>
                {entries.map(it=>
                    <RenderRow ky={it[0]} value={it[1]} columns={columns} handleChange={handleChange} />
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
            <th size={10} key={fld} style={styles.th}>
                {fld}
            </th>
        </Tooltip>
    :  
        <th>
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
                <input type='text' style={styles.search} size={10} name={fld} placeholder={fld} value={search[fld]} onChange={handleChange} />
            </th>
        :  
            <th>
                <input type='text' style={styles.search} size={10} name={fld + 'From'} placeholder={fld + 'From'} value={search[fld + 'From']} onChange={handleChange} />
                <input type='text' style={styles.search} size={10}name={fld + 'To'} placeholder={fld + 'To'} value={search[fld + 'To']} onChange={handleChange} />
            </th>
    )    
}

const RenderTable = ({list, filterList, handleEdit, handleDelete, search, setSearch, handleFilter, handleComment}) =>
    <table style={{...styles.root, border:'1px solid lightGrey', margin:0}} >
        <tr style={{color:'white', backgroundColor:'black'}}>
            <th colSpan={1} style={styles.th}/>
            {Object.keys(list[0]).filter(it=>it !=='id').map(it=>
                <Tooltip title={handleComment(it)}>  
                    <HeaderValue list={list} fld={it?it:'No name'} comment={handleComment(it)}/>
                </Tooltip>
            )}    
            <th colSpan={1} style={styles.th}/>
        </tr>
        <tr>
            {<th><SearchIcon onClick={handleFilter} /></th>}
            {Object.entries(list[0]).filter(it=>it[0]!=='id').map(it=><SearchValue fld={it?it[0]?it[0]:'No name':'No object'} search={search} setSearch={setSearch} />)}
            <th colSpan={1} />
        </tr>
        <tbody>
            {filterList.map(row => 
                    <tr style={styles.tr(row.active)}>
                        <td><EditIcon onClick={()=>handleEdit(row)} /></td>
                        {Object.entries(row).filter(it=>it[0]!=='id').map(it=>
                            <td style={styles.td}>
                                <div dangerouslySetInnerHTML={{__html: it[1]}} />
                            </td>
                        )}       
                        <td><DeleteForeverIcon onClick={()=>handleDelete(row.id)} /></td>
                    </tr>            
                )
            }      
        </tbody>    
    </table>

// _TableShow
export default ({table, list, setList, columns, style}) => {
    const [record, setRecord] = useState(undefined)
    const [recordRte, setRecordRte] = useState(undefined)
    const [search, setSearch] = useState({})
    const [filterList, setFilterList] = useState()

    useEffect(()=>{
        setRecord(undefined)
        setFilterList(undefined)
        setSearch({})
    },[table])

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
                handleFilter(data.list)
            } else {
                alert('Delete successful but the reply is missing value data.list, data:' + JSON.stringify(data))    
            }    
        } else {
            alert('Failed to delete row, result:' + JSON.stringify(data))    
        }
    }


    const handleDelete = id => {
        //eslint-disable-next-line
        if (confirm("Are you sure you want to delete this row with id = " + id + ' ?')) {
            deleteRow(table, id, handleDeleteReply)
        }    
    }

    const handleAddReply = data => {
        if (data.status === 'OK') {
            if (data.list !== undefined) {
                setList(data.list) 
                handleFilter(data.list)
            } else {
                alert('Replace successful but the reply is missing value data.list, message:' + data.message)    
            }    
        } else {
            alert('ERROR: Failed to add row\nmessage:\n' + data.message)    
        }
    }

    const handleReplaceReply = data => {
        if (data.status === 'OK') {
            setList(data.list)
            handleFilter(data.list)
        } else {
            alert('Failed to replace row, message:' + data.message)    
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
        setRecord({...record, [e.target.name]:e.target.type==='checkbox'?e.target.checked?1:0:e.target.value})
    }

    const handleChangeRte = (key, val) => {
        setRecordRte({...recordRte, [key]:val})
    }

    const handleCancel = e => {
        setRecord(undefined)
    }


    const handleFilter = list => {
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
                    columns={columns}
                    handleChange={handleChange} 
                    handleChangeRte={handleChangeRte} 
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
                        handleFilter={()=>handleFilter(list)}
                        handleEdit={rec=>setRecord(rec)} 
                        handleDelete={handleDelete} 
                        handleComment={handleComment} 
                    />
                </>
            :null}
        </div>
    )
}


/* {JSON.stringify(columnsToObject(columns))} */
