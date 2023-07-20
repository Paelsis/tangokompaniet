import React from 'react';
import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import ScheduleCreate from './Utils/ScheduleCreate'
import {setStatusMessage, setSleepTime} from 'redux/actions/actionsStatusMessage' 
import {USERNAME, PASSWORD} from 'redux/actions/actionsUser'
import {SELECTION_MENU_TYPE} from 'Settings/Const'

const TABLE_NAME='tbl_course_template'
const PRODUCTION_TABLE='tbl_course'
const RELEASE_LINK='/copySchedule'

const COLUMNS = [
    {label:'Kurs id', name:'courseId', type:'select', tableName:'tbl_course_def', selectKey:'courseId', selectValue:'courseId', required:true},    
    {label:'Lärare 1', name:'teacher1', type:'select', tableName:'v_ref_teacher', selectKey:'shortName', selectValue:'name', required:true},    
    {label:'Lärare 2', name:'teacher2', type:'select', tableName:'v_ref_teacher', selectKey:'shortName', selectValue:'name'},    
    {label:'Plats', name:'siteId', type:'select', tableName:'tbl_site', selectKey:'siteId', selectValue:'siteName', required:true},    
    {label:'Startdatum', name:'startDate', type:'date', placeholder:'YYYY-MM-DD', required:true},    
    {label:'Tid', name:'startTime', type:'time', placeholder:'HH:MI', required:true},    
    {label:'Slutdatum', name:'endDate', type:'date', placeholder:'YYYY-MM-DD'},    
    {label:'Online', name:'online', type:'checkbox'},    
    {label:'Max leaders', name:'maxLeader', type:'number'},    
    {label:'Max followers', name:'maxFollower', type:'number'},    
    {label:'Max total', name:'maxTotal', type:'number'},    
]
 
const _CreateCourse = (props) => (
    <ScheduleCreate 
        {...props} 
        tableName={TABLE_NAME} 
        productionTable={PRODUCTION_TABLE} 
        selectionMenuType={SELECTION_MENU_TYPE.COURSE}
        columns={COLUMNS} 
        releaseLink={RELEASE_LINK}    
    />
)

const mapStateToProps = (state) => {
    return {
        // Note shoppingList is the slice of the store defined by ShoppingCart reducer 
        url:'/admin/tktable?tableName=' + TABLE_NAME,
        username: state.user[USERNAME],
        password: state.user[PASSWORD],
        language: state.language,

        // Status message
        status: state.statusMessage.status,
        message: state.statusMessage.message,
        sleepTime: state.statusMessage.sleepTime,
    }
}    

const mapDispatchToProps = (dispatch) => {
    return {
        setStatusMessage: (status, message) => {dispatch(setStatusMessage(status, message))},
        setSleepTime: (sleepTime) => {dispatch(setSleepTime(sleepTime))},
    }        
}


export default connect(mapStateToProps, mapDispatchToProps)(withRecords(_CreateCourse));    
