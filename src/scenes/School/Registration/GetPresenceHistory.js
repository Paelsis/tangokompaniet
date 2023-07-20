import React from 'react';
import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import lightGreen from '@material-ui/core/colors/lightGreen';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import { View1 } from 'Settings/UtilsMap';

const GROUP_BY_DEF_ARR= (language) => [
    {
        groupByField:'scheduleName',
        headerFields:['scheduleName'], 
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                padding:10,
                backgroundColor:lightGreen[800]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:lightGreen[700], 
            }
        }    
    },
    {
        groupByField:'productId',
        headerFields:['courseName', 'city', 'siteName', 'dayname', 'startTime', 'startDate'], 
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                padding:10,
                backgroundColor:lightGreen[800]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:lightGreen[700], 
            }
        }    
    },
    {
        groupByField:'courseDate',
        headerFields:['dayname', 'courseDate'], 
        headerProps:{
            open:{
                padding:10,
                width:'100vw', 
                maxWidth:'100%', 
                backgroundColor:lightGreen[800]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:lightGreen[700], 
            }
        }    
    },
];

const VIEW_FIELDS=['firstName', 'lastName', 'email', 'present'];
const VIEW_FIELDS_EXPAND=['firstName', 'lastName', 'email', 'present'];
const UPDATE_VIEW=['present'];
const UPDATE_FIELDS=['present'];

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/getPresenceHistory?language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR(state.language),
        viewComponent:View1,
        tableUpdate:'tbl_presence',
        viewFields:VIEW_FIELDS,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        updateView:UPDATE_VIEW,
        updateFields:UPDATE_FIELDS,
    }
}    

export default connect( 
    mapStateToProps,
) (withRecords(GetRegistrationMapMap));    
