import React, {Component} from 'react';
import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import backgroundColor from '@material-ui/core/colors/indigo';
import { View1 } from 'Settings/UtilsMap';

const GROUP_BY_DEF_ARR=[
    {
        groupByField:'scheduleName', 
        headerFields:['scheduleName'],
        headerSortBy:['groupByProductId'],
        headerProps:{
            open:{
                padding:10,
                width:'100vw', 
                backgroundColor:backgroundColor[600]
            }, 
            closed:{
                width:'50vw',
                maxWidth:'100%', 
                backgroundColor:backgroundColor[500], 
            }
        }    
    },    
    {
        groupByField:'email', 
        headerFields:['firstName', 'lastName', , 'role', 'email', 'phone', 'packageName', 'priceSEK', 'priceEUR'],

        headerProps:{
            open:{
                padding:10,
                width:'100vw', 
                backgroundColor:backgroundColor[600]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:backgroundColor[500], 
            }
        }    
    },    
];

const VIEW_FIELDS=['orderId', 'firstName', 'lastName', 'havePaid']
const VIEW_FIELDS_EXPAND = ['orderId', 'nameEN', 'dayName', 'startTime', 'siteName', 'firstNamePartner', 'lastNamePartner', 'emailPartner',  'phonePartner', 'danceSite', 'id', 'productId']
const UPDATE_FIELDS = ['productId']
const UPDATE_VIEW = ['prodictId']

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/getForm?idByProduct',
        groupByDefArr:GROUP_BY_DEF_ARR,
        viewComponent:View1,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        viewFields:VIEW_FIELDS,
        updateFields:UPDATE_FIELDS,
        updateView:UPDATE_VIEW,
        urlUpdate:'/admin/updateRow',
        tableUpdate:'tbl_reg_event_product',
    }
}    

export default connect( 
    mapStateToProps,
) (withRecords(GetRegistrationMapMap));    
