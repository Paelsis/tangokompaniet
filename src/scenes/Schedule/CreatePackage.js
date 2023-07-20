import React from 'react';
import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import ScheduleCreate from './Utils/ScheduleCreate'
import {USERNAME, PASSWORD} from 'redux/actions/actionsUser'
import {SELECTION_MENU_TYPE} from 'Settings/Const'

const TABLE_NAME='tbl_package_template'
const PRODUCTION_TABLE='tbl_package'
const RELEASE_LINK='/copyPackageTemplate'
const PRODUCT_TYPE='festival'

const COLUMNS=[
    {label:'Name (shown to customer)', name:'name',  type:'textarea', placeholder:'Name in english', required:true},    
    {label:'Shortname', name:'packageId',  type:'text', placeholder:'Ex: PACKAGE_1', unique:true, required:true, },    
    {label:'Nbr of WS in pack', name:'wsCount',  type:'number', placeholder:'Ex: 5'},    
    {label:'Minutes of WS in pack', name:'minutes',  type:'number', placeholder:450},    
    {label:'Product type', name:'productType',  type:'select', tableName:'tbl_package_product_type', selectKey:'productType', selectValue:'nameEN', required:true},    
    {label:'All workshops', name:'allWorkshops',  type:'checkbox'},    
    {label:'Price SEK', name:'priceSEK',  type:'number', placeholder:'Ex: 300 SEK', required:true},    
    {label:'Price EUR', name:'priceEUR',  type:'number', placeholder:'Ex: 300 EUR'},    
    {label:'Sekvens nummer', name:'sequenceNumber',  type:'number', placeholder:'1,2,...N'},    
]

const CreatePackage = (props) => (
    <ScheduleCreate
        {...props} 
        tableName={TABLE_NAME} 
        columns={COLUMNS} 
        selectionMenuType={SELECTION_MENU_TYPE.FESTIVAL}
        productionTable={PRODUCTION_TABLE} 
        releaseLink={RELEASE_LINK}   
        productType={PRODUCT_TYPE} 
    />
)

const mapStateToProps = (state) => {
    return {
        url:'/admin/tktable?tableName=' + TABLE_NAME,
        username: state.user.username,
        password: state.user.password,
        language: state.language,
    }
}    

export default connect(mapStateToProps)(withRecords(CreatePackage));    
