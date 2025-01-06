import React, {useState, useEffect} from 'react'
import Weekdays from 'Settings/Weekdays';
import tkColors, {boxShadowValue} from 'Settings/tkColors'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Button from '@material-ui/core/Button';
import MessageIcon from '@material-ui/icons/Message';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import deleteRow from 'functions/deleteRow'
import EmailIcon from '@material-ui/icons/Email';
import EditText from 'Components/Text/EditText'
import {TBL_TEACHER_NOTE} from 'Settings/Const'
import moment from 'moment-with-locales-es6';
import {serverFetchData} from 'functions/serverFetch'
import config from 'Settings/config';
import {replaceRow} from 'functions/tableUtils'
import {acceptKeys} from 'Settings/Utils'


const apiBaseUrl=process.env.REACT_APP_API_BASE_URL;

const TEXTS = {
    'DOWNLOAD_XLS_LABEL':{
        'SV':'Ladda ner XLS-ark',
        'ES':'Descargar como archivo XLS' ,
        'EN':'Download as XLS'
    },   
}

const isValidDate = dateString => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString) return false; // No date string
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
}

let styles = {
    table: {
        // marginLeft:'auto',
        // marginRight:'auto',
        fontSize:15,
        fontWeight: 'lighter',
        borderCollapse:'collapse',
        border:'1px solid',
        borderColor:tkColors.border,
        color:tkColors.Text.Dark,
        backgroundColor:tkColors.background
    },
    tbody: {
      overflowX:'auto',
      border:'0.1px solid',
      borderColor:tkColors.border,
    },  
    tr:{
        borderBottom:'0.1px solid',
        borderColor:tkColors.border,
    },    
    th: {
        fontSize:14, 
        fontWeight:500,
        paddingBottom: 4,
        paddingLeft: 2,
        paddingRight:2, 
        height:12,
        color:tkColors.background,
        backgroundColor:tkColors.Text.Dark,
        overflowWrap:'normal',
        cursor:'pointer'
    },
    td: {
        verticalAlign:'top',
        paddingLeft: 2,
        paddingRight:2, 
        maxWidth:300,
        overflowWrap:'normal',
        wordBreak:'break-all'
    },
    msgButton:{
        backgroundColor:tkColors.background,
        boxShadow: boxShadowValue(tkColors.Marathon.Light),
    },
}

function _validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const _typeOf = (row, fld) => 
    ['deleted', 'present', 'handled', 'havePaid', 'helper'].includes(fld)?'checkbox':typeof row[fld]



const _viewValue = (row, fld, language) =>
    row[fld]===undefined?undefined
    :_typeOf(row,fld)==='checkbox'?row[fld]==1?<span>&#x2705;</span>:<span>&#x2610;</span>
    :fld.includes('emailPartner') && row[fld]===undefined?undefined
    :fld==='dayname'?row[fld]?(row[fld][0].toUpperCase() + row[fld].substring(1)):'(No dayname)'
    :fld==='present'?row[fld]==1?'present':'-'
    :fld==='fullName'?row.email?<a href={"mailto:" + row[fld]}>{row[fld]}</a>:row[fld]
    :fld==='phone'?<a href={"tel:" + row[fld]}>{row[fld]}</a>
    :fld==='textBody'?<div dangerouslySetInnerHTML={{__html: row[fld]}} />
    :_validateEmail(row[fld])?row.emailPartnerAlert && fld ==='emailPartner'?row[fld]:<a href={"mailto:" + row[fld]}>{row[fld]}</a>                          
    :row[fld]


const _stylesTr = (row) => {
    const opacity = row.deleted?row.deleted==1?0.7:1.0:1.0
    const textDecoration = row.deleted?row.deleted==1?'line-through':'none':'none'
    const backgroundColor = row.handled?row.handled==1?'#7FFFAA':'transparent':'transparent'
    const color = row.status?row.status === 'OK'?tkColors.Text.Dark:row.status === 'WL' || row.status==='WF'?'orange':'red':'black'
    const fontWeight = row.shallPay?row.shallPay === 0?'bold':'lighter':'lighter'
    const style = {...styles.tr, opacity, color, backgroundColor, fontWeight, textDecoration}
    return style;
}

const _stylesTd = (row, fld) => {
    const partnerMissingEmail = row.emailPartnerAlert?row.emailPartnerAlert.includes('MISSING')?fld.includes('emailPartner'):false:false
    const partnerWrongEmail = row.emailPartnerAlert?row.emailPartnerAlert.includes('@')?fld ==='emailPartner':false:false
    const opacity = partnerWrongEmail||partnerMissingEmail?0.7:1.0
    const color =  partnerMissingEmail?'red':'black'
    const fontStyle = partnerMissingEmail?'oblique':'normal'
    const textDecoration = row.linethrough?'line-through':undefined
    const style = {...styles.td, opacity, color, fontStyle, textDecoration}
    return style;
}

const _viewRow = (row, viewFields, language) => 
    viewFields.map((fld) => 
        <td style={_stylesTd(row, fld)}>
            {_viewValue(row, fld, language)}
        </td>
    )

const viewRowWithButton = (row, rowIndex, props) => {
    const text = row.firstName + ' ' + row.lastName
    return(
        <tr key={rowIndex} style={_stylesTr(row)}>
            {_viewRow(row, props.viewFields, props.language)}
            {row.message?
                <td style={styles.td} onClick={() => alert(row.message)}> 
                    <Tooltip title={'Message from customer'}>
                        <MessageIcon style={{cursor:'pointer'}} />
                    </Tooltip>
                </td>
            :
                <td />
            }
            {props.updateView?props.updateView.length >0?
                <td style={styles.td}> 
                    <Tooltip title={'Edit row'}>
                        <EditIcon style={{color:'green', cursor:'pointer'}} onClick={() => props.toggleEdit(row)}/>
                    </Tooltip>
                </td>
            :null:null}
            <td style={styles.td} > 
                <Tooltip title={'Delete in database'}>
                    <DeleteForeverIcon style={{color:'red', cursor:'pointer'}} onClick={() => handleDelete(row.id, props, text)} />
                </Tooltip>
            </td>
        </tr>
    )            
}    

const viewRowWithoutButton = (row, rowIdx, props) =>
    <tr key={rowIdx} style={{..._stylesTr(row), opacity:row.opacity?row.opacity:1.0}}>
        {_viewRow(row, props.viewFields, props.language)}
    </tr>            

const _inputOrView = (row, fld, colIndex, props) => {
    const type=_typeOf(row, fld);
    const isView = props.viewFields?props.viewFields.some(it => it === fld):true 
    const isUpdate = props.updateView?props.updateView.some(it => it === fld):false
    return(
        isUpdate? 
            type==='checkbox'?
                <input 
                    key={colIndex}
                    size={2}
                    type={type}
                    name={fld} 
                    checked={(row[fld]==1)?true:false}
                    onChange={e=>props.handleChangeId(e, row.id)} 
                />
            :fld==='textBody'?    
                <textarea 
                    type={type} 
                    cols={35}
                    rows={6}
                    maxLength={300}
                    value={row[fld]} name={fld} 
                    onChange={e=>props.handleChangeId(e, row.id)}
                />
            :    
                <input 
                    key={colIndex}
                    type={type}
                    size={Math.max(row[fld]?row[fld].length-3:1, 1)}
                    name={fld} 
                    value={row[fld]}
                    onChange={e=>props.handleChangeId(e, row.id)}
                />
        :isView?
            _viewValue(row, fld, props.language)    
        :null    
    )    
}


const editFields = (row, props) => 
    props.viewFields.map((fld, colIndex) => 
        <td key={fld} style={styles.td}>
            {_inputOrView(row, fld, colIndex, props)}
        </td>
    )

const handleDelete = (id, props, text) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete registration of " + text + " ?")) {
        deleteRow(props.tableUpdate, id, reply =>  {
            if (reply.status !== 'OK') {
                alert('Delete failed:' + JSON.stringify(reply))
            } else {    
                props.fetchListAgain?props.fetchListAgain():alert('List not fetched after delete. Contact Per')
            }    
        })
    } 
}    

const editRowWithButton = (row, rowIndex, props) => {
    const {toggleEdit, toggleEditAndSave} = props
    const text = row.firstName + ' ' + row.lastName
    return (
        <tr key={rowIndex} style={_stylesTr(row)}>
            {editFields(row, props)}
            {row.message?
                <td key={'messageIcon'} style={styles.td} onClick={() => alert(row.message)}> 
                    <MessageIcon />
                </td>
                :
                <td />
            }
            {props.updateView?props.updateView.length > 0?
                <td key={'cancel'} style={styles.td}> 
                    <Tooltip title={'Cancel edit mode without save'}>
                        <CloseIcon style={{color:'orange', cursor:'pointer' }}  onClick={() => toggleEdit(row)}/>
                   </Tooltip>  
                </td>
            :null:null}
            {props.updateView?props.updateView.length >0?
                <td key={'save'} style={styles.td}> 
                    <Tooltip title={'Save changes in database'}>
                        <SaveIcon style={{color:'orange', cursor:'pointer' }}  onClick={() => toggleEditAndSave(row)}/>
                    </Tooltip>  
                </td>
            :null:null}
            <td key={'deleteForever'} style={styles.td} onClick={() => handleDelete(row.id, props, text)}> 
                <DeleteForeverIcon style={{color:'red', cursor:'pointer'}} />
            </td>
        </tr>            
    )
}

const editRowWithoutButton = (row, rowIndex, props) => 
    <tr key={rowIndex} style={_stylesTr(row)}>
        {editFields(row, props)}
    </tr>            


const isPaid = pr => {
    return pr?pr.amount?pr.paidAmount?pr.paidAmount === pr.amount?true:false:false:false:false;
}

const isPartiallyPaid = pr => {
    return pr?pr.amount?pr.paidAmount?pr.paidAmount === pr.amount?true:false:false:false:false;
}

const maillist = (list, fld) => list.map(it => it[fld]?it[fld]:null).join(', ')

/* Replace underscore with blank {row[fld].replace(/_/gi,' ')} &nbsp;&nbsp; */
export const View1 = props => {
    const [expand, setExpand] = useState(false)
    const {list, edit, viewFieldsExpand} = props
    let {viewFields} = props
    viewFields = expand?viewFieldsExpand?viewFieldsExpand:viewFields:viewFields 
    const newProps = {...props, viewFields}
    // console.log('_view1 list:', list)
    return (
        <div>
            <ReactHTMLTableToExcel
                    className="btn btnInfo"
                    table="table-map-view-1"
                    filename={props.tableUpdate?props.tableUpdate:"ReportExcel"}
                    sheet="Sheet"
                    buttonText="Download as XLS"
            />
            <Button variant='outlined'  onClick={()=>setExpand(!expand)}>          
                {expand?'Collapse':'Expand'}
            </Button>
            <table id={'table-map-view-1'} style={styles.table}>
                <tr>
                    {viewFields?        
                            viewFields.map(fld => 
                                <th key={fld} style={styles.th} onClick={()=>fld.includes('email')?null:props.sortStateListByKey(fld)}>    
                                    {fld.includes('email')?
                                        <>
                                            {fld}&nbsp;
                                            <a href={'mailto:?bcc=' + maillist(list, fld) + '&subject=Mail från TK'} target="_top">
                                                <Tooltip title={'Send mail to group'}>  
                                                <EmailIcon style={{cursor:'pointer', fontSize:'small', color:'lightBlue'}} />
                                                </Tooltip>
                                            </a>
                                        </>
                                    :fld
                                }
                                </th>
                            )
                        :
                            <h1>WARNING:viewFields is missing</h1>
                    }    

                    <th key={'Message'} style={styles.th}>Message</th>
                    

                    {newProps.updateView?newProps.updateView.length > 0?
                        <>
                            <th style={styles.th} key={'Buttons'} colSpan={3}>Buttons</th>
                        </>
                    :null:null}
                </tr>
                <tbody>
                    {list.map((row, rowIndex)=> 
                        edit[row.id]?editRowWithButton(row, rowIndex, newProps)
                        :viewRowWithButton(row, rowIndex, newProps)
                    )} 
                </tbody>

            </table>
        </div>

    )
}

/*
    <Button onClick={() => toggleEditList(list)}>
    {props.edit[list[0].id]?'Save All':'Edit All'}  
    </Button>    
    {props.edit[list[0].id]?<UpdateProductId fromProductId = {list[0].productId} handleResult={(data) => props.fetchListAgain()} />:null}
*/
const TextArea = props => {
    const {productId, courseDate, handleSave} = props
    const [textBody, setTextBody] = useState()
    const handleReply = reply => {
        if (reply.status === 'OK') {
            const text = reply.result?reply.result[0]?reply.result[0].textBody:'':''
            setTextBody(text)
        } else {
            // alert('Text not found ' + JSON.stringify(reply))
        }
    }
    useEffect(()=>{
        const url = apiBaseUrl + '/getTeacherNote?productId=' + productId + '&courseDate=\'' + courseDate + '\''
        serverFetchData(url, '', '', handleReply)
    }, [productId, courseDate])

    const handleReplaceRowReply = reply => {
        if (reply.status === 'OK') {
            handleSave()
        } else {
            alert('ERROR: reply:' + JSON.stringify(reply))
        }

    }

    const handleClick = () => {
        if (textBody) {
            const value = {
                data:{
                    productId,
                    courseDate:courseDate,
                    textBody:textBody,
                }    
            }
                replaceRow('tbl_teacher_note', value.data, handleReplaceRowReply);
        } else {
            handleSave()
        }    
    }

    return(
        <>
            <textarea rows={4} cols={40} value={textBody} placeholder={'Write your comment here'} onChange={e=>{setTextBody(e.target.value)}} />
            <br/>
            <Tooltip title = 'Saves both text and presence'>
                <div>
                <Button variant='outlined' onClick={handleClick}>Save</Button> 
                </div>
            </Tooltip>
        </>            
    )
}



export const View2 = props => {
    const {list, viewFields} = props
    const defaultCourseDate = moment().format('YYYY-MM-DD')
    const [courseDate, setCourseDate] = useState(defaultCourseDate)
    const [localList, setLocalList] = useState()
    const productId = list.length > 0?list[0].productId:undefined
    const [edit, setEdit] = useState(false)

    const toggleEditList = () => {
        // Don't remove the row.id for updateFields 
        // const acceptList = list.map(row => ({...acceptKeys(row, this.props.updateFields), id:row.id}));  
        
        // 15/5-2022 Remove id's. The id must be undefined, otherwise replace stmt will update primary key id, instead of unique key on name and course date  
    }

    const handleToggle = () => {
        if  (!edit) {
            if (isValidDate(courseDate)) {
                const url = apiBaseUrl + '/getPresence?productId=' + productId + '&courseDate=' + courseDate 
                let lclList = []
                if (list.find(it=>it.courseDate === courseDate)) {
                    lclList = list.filter(it=>it.courseDate===courseDate).map(it=>({...it, exist:true}))
                } else {    
                    // Use first date of the list since all are coming up on that date
                    lclList = list.filter((it)=>it.courseDate === list[0].courseDate).map((it, idx)=>({...it, courseDate, present:0, id:idx, exist:false}));
                }    
                // alert(JSON.stringify(lclList))
                setLocalList(lclList)
                // serverFetchData(url, '', '', reply => handleReply(reply, ans))
            } else {
                alert('Please enter a valid date in format YYYY-MM-DD. Example 2024-06-30')
                return
            }
        } else {
            // alert('VVVVVVV ' + JSON.stringify(localList))
            props.updateList(localList.map(it => ({...it, update:undefined, id:it.exist === true?it.id:undefined})))
        }
        setEdit(!edit);
    }

    const handleChangeChecked = (e, idx) => {
        let newList = localList.map((it, ix) => {
            if (ix === idx) {
                return {...it, [e.target.name]:e.target.checked?1:0}
            } else {
                return it
            }
        })            
        setLocalList(newList)
    }

    return (
        <div>
            
            <div>
                {!edit?
                <div style={{textAlign:'center', width:'100%'}}>
                <input type='date' value={courseDate} onChange={e=>setCourseDate(e.target.value)} />
                <Button variant='outlined' onClick={()=>handleToggle()}>
                    Hämta deltagare 
                </Button>  
                </div>
                :null} 
                
                {edit?
                
                <table style={styles.table}>
                    <tr>
                        {viewFields.map((fld, ndx) => 
                            <th key={ndx} style={styles.th} onClick={()=>fld.includes('email')?null:props.sortStateListByKey(fld)}>    
                                {fld}
                            </th>
                        )}    
                        <th style={styles.th}>Exists</th>
                    </tr>
                    <tbody style={styles.tbody}>
                        {localList?localList.map((row, idx)=> 
                            <tr>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td><input type='checkbox' name='present' checked={row.present==1?1:0} onChange={e=>handleChangeChecked(e, idx)} /></td>
                                <td>{row.courseDate}</td>
                                <td style={{paddingLeft:10}}>{row.exist?' Yes ':'  '}</td>
                            </tr>
                        ):null}
                    </tbody>
                </table>
                :null}
            </div>
            <div>
                {edit?<TextArea productId={productId} handleSave={handleToggle} courseDate={courseDate} {...props} />:null}
            </div>
        </div>
    )
}

export const View3 = props => {
    const {list, edit} = props
    const productId = list[list.length -1].productId
    const courseName = list[list.length -1].courseName 

    const [value, setValue] = useState({courseDate:moment().format('YYYY-MM-DD'), textId:productId, textBody:undefined})
    const handleChange = e => {
        setValue({...value, [e.target.name]:e.target.value})
    } 
    const handleSubmit = e => {
        e.preventDefault()
        const adjValue = {
            productId,
            courseName,
            courseDate:value.courseDate,
            textBody:value.textBody,
        }
        // alert(JSON.stringify(adjValue))

        props.replaceRow(adjValue)
        setValue({...value, textBody:undefined})
    }

    const style = {fontSize:'normal',padding: "12px 20px", margin: "8px 0", boxSizing: "border-box"}

    return (
        <div style={{width:'100%'}}>
            <form onSubmit={handleSubmit}>      
                <div style={{display:'flex',  justifyContent:'flexStart' , flexDirection:'column', width:'80vw', marginLeft:50}}>
                    <div style={{marginTop:5, marginBottom:5}}>
                        <label>Course date:&nbsp;
                            <input type="date" name='courseDate' value={value.courseDate} onChange={handleChange} />                     <p/>   
                        </label> 
                    </div>    
                    <div style={{flex:1, flexDirection:'row'}}>
                        <textarea
                             type="text" 
                             name="textBody" 
                             rows={4} 
                             cols={50} 
                             value={value.textBody?value.textBody:''} 
                             required placeholder={'Teachers note ...'} 
                             autoFocus={true}
                             onChange={handleChange}
                        /> 
                    </div>
                    <div style={{marginTop:10, marginBottom:20}}>
                        <Button variant='outlined'  className='Button' style={{color:'green', borderColor:'green'}} type="submit">Save note</Button>
                    </div>
                </div>
            </form>
            <table style={{fontSize:'small'}}>
            <tbody>
                    {list.map((row, rowIndex)=> 
                        edit[row.id]?editRowWithButton(row, rowIndex, props)
                        :viewRowWithButton(row, rowIndex, props)
                    )} 
                </tbody>
            </table>
        </div>
    )
}

export const View4 = props => {
    const {list, language} = props
    const [matrix, setMatrix] = useState(undefined)
    const productId = list[0]?list[0].productId:undefined

    const handleReply = reply => {
        if (reply.status === 'OK') {
            const result = reply.result
            setMatrix(result?result[productId]?result[productId]:undefined:undefined)
        } else {
            alert('Cannot find any presence records')
        }    
    }

    const compareFunction = (email1, email2) => {
        return (Object.values(matrix[email1])[0].firstName?Object.values(matrix[email1])[0].firstName:'ZZZ')
        .localeCompare(
            Object.values(matrix[email2])[0].firstName?Object.values(matrix[email2])[0].firstName:'ZZZ')
    }

    useEffect(()=>{
        const url = apiBaseUrl + '/getPresenceHistoryMatrix?language=' + language + '&productId=' + productId
        serverFetchData(url, '', '', handleReply)
    }, [])
    const firstEmail = matrix!==undefined?(Object.keys(matrix)[0]):undefined
    return (
        !firstEmail?
            <h1 style={{textAlign:'center'}}>No data</h1>
        :
            <div style={{width:'100%'}}>
                <table>
                    <thead>
                    <th style={{paddingRight:3}}>name</th>
                    {Object.keys(matrix[firstEmail]).map(courseDate =>
                        <th style={{padding:3}}>{courseDate}</th>
                    )}
                    </thead>
                <tbody>
                {Object.keys(matrix)?Object.keys(matrix).sort(compareFunction).map(email =>
                    <tr>
                        <td style={{paddingRight:3}}>{Object.values(matrix[email])[0].firstName}&nbsp;{Object.values(matrix[email])[0].lastName}</td>
                        {Object.values(matrix[email]).map(obj => <td>{obj.present?'X':'-'}</td>)}
                    </tr>
                ):null}
                </tbody>    
                </table>
            </div>    
    )
}