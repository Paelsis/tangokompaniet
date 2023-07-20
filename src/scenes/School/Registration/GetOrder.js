// import React, {Component} from 'react';
import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import lightGreen from '@material-ui/core/colors/lightGreen';
import {USERNAME, PASSWORD} from 'redux/actions/actionsUser'
import { View1 } from 'Settings/UtilsMap';


const GROUP_BY_DEF_ARR = [
    {
        groupByField:'orderId', 
        headerFields:['orderId', 'firstName', 'lastName', 'amount', 'paidAmount', 'discount'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                backgroundColor:blue[900]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:green[900], 
            }
        }    
    },    
];

const TAB_FIELDS=['id','firstName', 'lastName', 'email',  'phone', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'havePaid', 'shallPay', 'updTimestamp'];
const UPDATE_FIELDS = ['havePaid', 'shallPay']        

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/admin/getOrder',
        groupByDefArr:GROUP_BY_DEF_ARR,
        viewComponent:View1,
        tableUpdate:'tbl_order_product',
        urlUpdate:'/admin/updateRow',
        viewFields:TAB_FIELDS,
        updateFields:UPDATE_FIELDS,
    }
}    

export default connect(mapStateToProps) (withRecords(GetRegistrationMapMap));    

