import React, {Component} from 'react'
import { connect } from 'react-redux'
import withRecords from 'Components/Table/withRecords'
import GetRegistrationMapMap from './GetRegistrationMapMap'
import lightGreen from '@material-ui/core/colors/lightGreen'
import red from '@material-ui/core/colors/red'
import indigo from '@material-ui/core/colors/indigo'
import { View1 } from 'Settings/UtilsMap'


const GROUP_BY_DEF_ARR=[
    {
        groupByField:'scheduleName', 
        headerFields:['scheduleName'],

        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%',
                paddingTop:10, 
                paddingBottom:10, 
                backgroundColor:indigo[600],
            }, 
            imbalance:{
            }, 
            closed:{
                width:'80vw',
                maxWidth:900, 
                padding:2, 
                backgroundColor:lightGreen[600], 
            }
        }    
    },    
    {
        groupByField:'groupByProductId',
        headerFields:['name',  'city', 'siteName', 'dayname', 'startTime', 'teachers', 'startDate'], 
        headerSortBy:'productId',
        listSortBy:['firstName','lastName'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%',
                paddingTop:10, 
                paddingBottom:10, 
                backgroundColor:indigo[800],
            }, 
            imbalance:{
                backgroundColor:red[800],
            }, 
            closed:{
                width:'80vw',
                maxWidth:900, 
                padding:2, 
                backgroundColor:lightGreen[800], 
            }
        }    
    },    
];

const TAB_FIELDS=['orderId', 'firstName', 'lastName', 'email', 'phone', 'leader', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'year', 'productType', 'productId'];
const UPDATE_FIELDS = ['productId']        

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/admin/getRegistrationHistory?language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR,
        viewComponent:View1,
        viewFields:TAB_FIELDS,
        updateFields:UPDATE_FIELDS,
        tableUpdate:'tbl_registration_history',
        urlUpdate:'/admin/updateRow',
        urlUpdateAll:'/admin/updateTableAll',
    }
}    

export default connect( 
    mapStateToProps,
) (withRecords(GetRegistrationMapMap));    
