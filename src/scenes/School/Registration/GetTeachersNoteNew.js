import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import orange from '@material-ui/core/colors/orange';
import {TBL_TEACHER_NOTE} from 'Settings/Const'
import { View3 } from 'Settings/UtilsMap';

const GROUP_BY_DEF_ARR= (language) => [
    {
        groupByField:'scheduleId', 
        headerFields:['scheduleName'],

        headerProps:{
            open:{
                padding:10,
                width:'100vw', 
                maxWidth:'100%', 
                backgroundColor:orange[400]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:orange[500], 
                // background:"linear-gradient(45deg, lightGreen[500] 0%, lightGreen[800] 100%)",

            }
        }    
    },    
    {
        groupByField:'productId',
        headerFields:['courseName', 'courseId', 'dayname', 'startTime', 'siteName', 'startDate'], 
        listSortBy:['courseDate'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                padding:10,
                backgroundColor:orange[800]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:orange[700], 
            }
        }    
    },
];
const VIEW_FIELDS=['courseDate', 'textBody'];
const VIEW_FIELDS_EXPAND=['courseDate', 'textBody'];
const UPDATE_VIEW=['textBody']
const UPDATE_FIELDS=['productId', 'courseName', 'courseDate', 'textBody'];
const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/getTeacherNote?language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR(state.language),
        viewComponent:View3,
        viewFields:VIEW_FIELDS,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        tableUpdate:TBL_TEACHER_NOTE,
        updateView:UPDATE_VIEW,
        updateFields:UPDATE_FIELDS,
        forceEdit:true,
    }
}    

export default connect( 
    mapStateToProps,
) (withRecords(GetRegistrationMapMap));    

