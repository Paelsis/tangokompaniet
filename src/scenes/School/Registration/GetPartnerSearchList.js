// import React, {Component} from 'react';
import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import lightGreen from '@material-ui/core/colors/lightGreen';
import deepOrange from '@material-ui/core/colors/deepOrange';
import lime from '@material-ui/core/colors/lime';
import { View1 } from 'Settings/UtilsMap';

const GROUP_BY_DEF_ARR = [
    {
        groupByField:'teachers', 
        headerFields:['teachers'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                backgroundColor:deepOrange[600]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:lime[700], 
            }
        }    
    },    
    {
        groupByField:'productId', 
        headerFields:['name', 'city', 'weekday', 'startDate'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                backgroundColor:deepOrange[700]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:lime[800], 
            }
        }    
    },    
    {
        groupByField:'spaceAvailable', 
        headerFields:['spaceAvailable'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                backgroundColor:deepOrange[800]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:lime[900], 
            }
        }    
    },    
];

const TAB_FIELDS=['id', 'firstName', 'lastName', 'leader', 'email', 'phone', 'partnerFound'];
const UPDATE_FIELDS = ['status', 'leader', 'havePaid', 'shallPay', 'presense', 'deleted']        

const mapStateToProps = (state) => {
    return {
        username: '',
        password: '',
        language: state.language,
        url:'/getPartnerSearchList',
        groupByDefArr:GROUP_BY_DEF_ARR,
        tableUpdate:'tbl_partner_search',
        viewComponent:View1,
        viewFields:TAB_FIELDS,
        urlUpdate:'/admin/updateRow',
        updateFields:UPDATE_FIELDS,
    }
}    

let GetPartnerSearchList = withRecords(GetRegistrationMapMap);
GetPartnerSearchList =  connect( 
    mapStateToProps,
) (GetPartnerSearchList);    

export default GetPartnerSearchList