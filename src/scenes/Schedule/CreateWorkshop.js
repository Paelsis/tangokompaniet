import React from 'react';
import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import ScheduleCreate from './Utils/ScheduleCreate'
import {USERNAME, PASSWORD} from 'redux/actions/actionsUser'
import {SELECTION_MENU_TYPE} from 'Settings/Const'


const TABLE_NAME='tbl_workshop_template'
const PRODUCTION_TABLE='tbl_workshop'
const RELEASE_LINK='/copyWorkshopTemplate'
const PRODUCT_TYPE='festival'

const COLUMNS=[
//    {label:'Schedule', name:'scheduleId',  type:'select', tableName:'tbl_schedule_def', selectKey:'scheduleId', selectValue:'scheduleId', hidden:true},    
//    {label:'Workshop def', name:'workshopId',  type:'select', placeholer:'tbl_workshop_def', selectKey:'workshopId', selectValue:'workshopId'},    
//    {label:'Workshop id', name:'workshopId',  type:'text', placeholer:'Workshop Id'},    
    {label:'Name (shown to customer)', name:'name',  type:'textarea', placeholder:'Name in english', required:true, unique:true},    
    {label:'Shortname', name:'workshopId',  type:'text', placeholder:'Short name', required:true, unique:true},    
    {label:'Product type', name:'productType',  type:'select', tableName:'tbl_workshop_product_type', selectKey:'productType', selectValue:'nameEN', required:true},    
    {label:'Teacher 1', name:'teacher1', type:'select', tableName:'v_ref_teacher', selectKey:'shortName', selectValue:'name'},    
    {label:'Teacher 2', name:'teacher2', type:'select', tableName:'v_ref_teacher', selectKey:'shortName', selectValue:'name'},    
    {label:'Location', name:'siteId', type:'select', tableName:'tbl_site', selectKey:'siteId', selectValue:'siteName', required:true},    
    {label:'Start date', name:'startDate',  type:'date', placeholder:'YYYY-MM-DD', required:true},    
    {label:'Time', name:'startTime', type:'time', placeholder:'HH:MI', required:true},    
    {label:'Contains n workshops', name:'wsCount', type:'number', placeholder:1},  
    {label:'Length of WS in minutes', name:'minutes', type:'number', placeholder:90},  
    {label:'Price SEK', name:'priceSEK',  type:'number', placeholder:'Ex: 300 SEK', required:true},    
    {label:'Price EUR', name:'priceEUR',  type:'number', placeholder:'Ex: 300 EUR'},    
]

const CreateWorkshop = (props) => (
    <ScheduleCreate
        {...props} 
        tableName={TABLE_NAME} 
        sekectionMenuType={SELECTION_MENU_TYPE.FESTIVAL}
        columns={COLUMNS} 
        productionTable={PRODUCTION_TABLE} 
        releaseLink={RELEASE_LINK}  
        productType={PRODUCT_TYPE}
    />
)

const mapStateToProps = (state) => {
    return {
        url:'/admin/tktable?tableName=' + TABLE_NAME,
        username: state.user[USERNAME],
        password: state.user[PASSWORD],
        language: state.language,
    }
}    

export default connect(mapStateToProps)(withRecords(CreateWorkshop));    
