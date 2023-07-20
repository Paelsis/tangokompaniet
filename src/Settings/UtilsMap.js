import React, {useState, useEffect} from 'react'
import Weekdays from 'Settings/Weekdays';
import tkColors, {boxShadowValue} from 'Settings/tkColors'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Button from 'Components/Button'
import MessageIcon from '@material-ui/icons/Message';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import deleteRow from 'functions/deleteRow'
import EmailIcon from '@material-ui/icons/Email';
import {DateToDayname} from 'Settings/Weekdays';
import TextShow from 'Components/Text/TextShow'
import {TEXT_EDITOR} from 'Components/Text/TextAndHtmlEditor'
import {TBL_TEACHER_NOTE} from 'Settings/Const'
import moment from 'moment-with-locales-es6';
import fetchList from 'functions/fetchList';
import fetchResult from 'functions/fetchResult'
import config from 'Settings/config';

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;

const TEXTS = {
    'DOWNLOAD_XLS_LABEL':{
        'SV':'Ladda ner XLS-ark',
        'ES':'Descargar como archivo XLS' ,
        'EN':'Download as XLS'
    },   
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
      margin:10,
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
    const {viewFields, toggleEdit, toggleEditAndSave} = props
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
    console.log('_view1 list:', list)
    return (
        <div>
            <ReactHTMLTableToExcel
                    className="btn btnInfo"
                    table="table-map-view-1"
                    filename={props.tableUpdate?props.tableUpdate:"ReportExcel"}
                    sheet="Sheet"
                    buttonText="Download as XLS"
            />
            <button onClick={()=>setExpand(!expand)}>          
                Expand
            </button>
            <table id={'table-map-view-1'} style={styles.table}>
                <thead>
                    {
                        viewFields?
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
                            <th style={styles.th} key={'buttons'} colSpan={3}>Buttons</th>
                        </>
                    :null:null}
                </thead>
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
export const View2 = props => {
    const [expand, setExpand] = useState(false)
    const newProps = {...props, viewFields:expand?props.viewFieldsExpand:props.viewFields}
    const {list, viewFields, edit, toggleEditList, language} = newProps
    const defaultCourseDate = moment().format('YYYY-MM-DD')
    const [courseDate, setCourseDate] = useState(defaultCourseDate)
    const productId = list.length > 0?list[0].productId:undefined
    let textId = productId?productId:'NoProductId' + courseDate?courseDate:'NoCourseDate'
    const editMode = edit[list[0].id]?true:false
    const handleToggle = () => {
        let newList = list
        if  (!editMode) {
            const defaultCourseDate = moment().format('YYYY-MM-DD')
            const ans=prompt('Please enter course date', defaultCourseDate) 
            setCourseDate(ans)
            newProps.setList(props.getList().map(it =>({...it, courseDate:ans})))
            if (ans.length !== 10) {
                alert('You must enter a valid date in format YY-MON-YY. Example 2022-12-31')
                return
            }
        } 
        toggleEditList(list)
    }
    return (
        <div>
            <button onClick={()=>handleToggle()}>
                {editMode?'Save':'Edit'}  
            </button>   
            <button onClick={()=>setExpand(!expand)}>          
                Expand
            </button>
            <ReactHTMLTableToExcel
                    className="btn btnInfo"
                    table="table-map-view-2"
                    filename={props.tableUpdate?props.tableUpdate:"ReportExcel"}
                    sheet="Sheet"
                    buttonText="Download as XLS"
            />
                <table id={'table-map-view-2'} style={styles.table}>
                    <thead>
                        {viewFields.map((fld, ndx) => 
                            <th key={ndx} style={styles.th} onClick={()=>fld.includes('email')?null:props.sortStateListByKey(fld)}>    
                                {fld.includes('email') ?
                                    <a href={'mailto:?bcc=' + maillist(list, fld) + '&subject=Mail från TK'} target="_top">
                                        {fld}&nbsp;
                                        <Tooltip title={'Send mail to group'}>  
                                        <EmailIcon style={{cursor:'pointer', fontSize:'small'}} />
                                        </Tooltip>
                                    </a>
                                :fld}
                            </th>
                        )}    
                    </thead>
                    <tbody style={styles.tbody}>
                        {list.map((row, rowIdx)=> 
                            editMode?editRowWithoutButton(row, rowIdx, newProps):viewRowWithoutButton(row, rowIdx, newProps)
                        )} 
                    </tbody>
                </table>
            {newProps.insertTeacherNote && editMode?
                <TextShow tableName={TBL_TEACHER_NOTE} url={'/getTexts?tableName=' + TBL_TEACHER_NOTE} groupId={'PRESENCE'} textId={textId} language={language} /> 
            :null}    
        </div>
    )
}

export const View3 = props => {
    const {list, edit} = props
    const productId = list[0].productId
    const [value, setValue] = useState({courseDate:moment().format('YYYY-MM-DD'), textId:productId, textBody:undefined})
    const handleChange = e => {
        setValue({...value, [e.target.name]:e.target.value})
    } 
    const handleSubmit = e => {
        e.preventDefault()
        const adjValue = {
            groupId:'PRESENCE',
            textId:productId + value.courseDate,
            textBody:value.textBody,
        }
//        if (adjValue.textBody?adjValue.textBody.length > 0?true:false:false) {
            props.replaceRow(adjValue)
            setValue({...value, textBody:undefined})
            /*
        } else {
            alert('Please fill in textBody before Save')
        }   
        */
    }

    const style = {fontSize:'normal',padding: "12px 20px", margin: "8px 0", boxSizing: "border-box"}
    const textId = productId  + value.courseDate

    return (
        <div style={{width:'100%'}}>
        <form onSubmit={handleSubmit}>      
                <div style={{display:'flex',  justifyContent:'flexStart' , flexDirection:'column', width:'50vw', marginLeft:50}}>
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
                             onChange={handleChange}
                        /> 
                    </div>
                    <div style={{marginTop:10, marginBottom:20}}>
                        <button className='button' style={{color:'green', borderColor:'green'}} type="submit">Save note</button>
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
    const [matrix, setMatrix] = useState({})
    const productId = list[0]?list[0].productId:undefined

    useEffect(()=>{
        const url = apiBaseUrl + '/getPresenceHistoryMatrix?language=' + language + '&productId=' + productId
        fetchResult('', '', url, result => {/*alert(JSON.stringify(Object.keys(result)));*/ setMatrix(result?result[productId]?result[productId]:{}:{})})
    }, [])
    const firstEmail = Object.keys(matrix)[0]
    return (
        firstEmail?
        <div style={{width:'100%'}}>
            <table><thead>
                <th>email</th>
                {Object.keys(matrix[firstEmail]).map(courseDate =>
                    <th>{courseDate}</th>
                )}
            </thead>
            <tbody>
            {Object.keys(matrix).map(email =>
                <tr>
                    <td>{Object.values(matrix[email])[0].firstName}&nbsp;{Object.values(matrix[email])[0].lastName}</td>
                    {Object.values(matrix[email]).map(obj => <td>{obj.present?'X':'-'}</td>)}
                </tr>
            )}
            </tbody>    
            </table>
        </div>    
        :null
    )
}