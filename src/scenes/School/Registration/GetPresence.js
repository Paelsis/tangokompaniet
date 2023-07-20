import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import lightGreen from '@material-ui/core/colors/lightGreen';
import {TBL_TEACHER_NOTE} from 'Settings/Const'
import { View2 } from 'Settings/UtilsMap';

const GROUP_BY_DEF_ARR = (language) => [
    {
        groupByField:'scheduleId', 
        headerFields:['scheduleName'],

        headerProps:{
            open:{
                padding:10,
                width:'100vw', 
                maxWidth:'100%', 
                backgroundColor:lightGreen[600]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:lightGreen[500], 
                // background:"linear-gradient(45deg, lightGreen[500] 0%, lightGreen[800] 100%)",

            }
        }    
    },    
    {
        groupByField:'productId',
        headerFields:['courseName', 'teachers', 'city', 'dayname', 'startTime', 'startDate'], 
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

const VIEW_FIELDS=['firstName', 'lastName', 'present', 'courseDate'];
const VIEW_FIELDS_EXPAND=['firstName', 'lastName', 'present', 'courseDate'];
const UPDATE_VIEW=['present']
const UPDATE_FIELDS=['productId', 'firstName', 'lastName', 'email', 'courseDate', 'courseName', 'scheduleName', 'present'];
const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/getPresence?language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR(state.language),
        urlUpdateAll:'/admin/updateRowsInPresence',
        viewComponent:View2,
        viewFields:VIEW_FIELDS,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        tableUpdate:'tbl_presence',
        updateView:UPDATE_VIEW,
        updateFields:UPDATE_FIELDS,
        insertTeacherNote:true,
    }
}    

export default connect( 
    mapStateToProps,
) (withRecords(GetRegistrationMapMap));    

