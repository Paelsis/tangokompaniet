import React from 'react'
import { connect } from 'react-redux'
import withRecords from 'Components/Table/withRecords'
import GetRegistrationMapMap from './GetRegistrationMapMap'
import backgroundColor from '@material-ui/core/colors/indigo'
import red from '@material-ui/core/colors/red'
import { View1 } from 'Settings/UtilsMap';

const GROUP_BY_DEF_ARR=[
    {
        groupByField:'scheduleName', 
        headerFields:['scheduleName'],
        headerSortBy:['groupByProductId'],

        headerProps:{
            open:{
                width:'100vw', 
                paddingTop:10, 
                paddingBottom:10, 
                backgroundColor:backgroundColor[600],
            }, 
            imbalance:{
            }, 
            closed:{
                width:'50vw',
                padding:2, 
                backgroundColor:backgroundColor[500], 
            }
        }    
    },    
    {
        groupByField:'groupByProductId',
        headerFields:['name',  'city', 'dayname', 'startTime', 'teachers', 'startDate'], 
        headerSortBy:'dayOfWeek',
        listSortBy:['firstName','lastName'],
        headerProps:{
            open:{
                width:'100vw', 
                paddingTop:10, 
                paddingBottom:10, 
                backgroundColor:backgroundColor[900],
            }, 
            imbalance:{
                backgroundColor:red[800],
            }, 
            closed:{
                width:'80vw',
                padding:2, 
                backgroundColor:backgroundColor[800], 
            }
        }    
    },    
];

const VIEW_FIELDS=['orderId', 'firstName', 'lastName', 'havePaid']
const VIEW_FIELDS_EXPAND=[ 'havePaid', 'orderId', 'firstName', 'lastName', 'email', 'phone', 'role', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'danceSite', 'regDate', 'newsletter', 'productId']
const UPDATE_FIELDS = ['havePaid', 'firstName', 'lastName', 'email', 'phone', 'leader', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'danceSite', 'productId']        
const UPDATE_VIEW = [
    'havePaid', 'firstName', 'lastName', 'email', 'phone', 'leader', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'danceSite', 'productId']
const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/admin/getRegistration?productType=course' + '&language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR,
        viewComponent:View1,
        viewFields:VIEW_FIELDS,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        updateFields:UPDATE_FIELDS,
        updateView:UPDATE_VIEW,
        tableUpdate:'tbl_registration',
        urlUpdate:'/admin/updateRow',
        urlUpdateAll:'/admin/updateTableAll',
    }
}    

export default connect( 
    mapStateToProps,
) (withRecords(GetRegistrationMapMap));    
