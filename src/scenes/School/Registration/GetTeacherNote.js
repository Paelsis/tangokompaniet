import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import lightGreen from '@material-ui/core/colors/lightGreen';
import {TBL_TEACHER_NOTE} from 'Settings/Const'
import { View1 } from 'Settings/UtilsMap'

const GROUP_BY_DEF_ARR= (language) => [
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
        headerFields:['courseName', 'dayname', 'time', 'siteName', 'startDate'], 
        listSortBy:['textId'],
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
];

const VIEW_FIELDS=['courseDate', 'textBody'];
const VIEW_FIELDS_EXPAND=['courseDate', 'textBody'];
const UPDATE_VIEW=['courseDate', 'textBody'];
const UPDATE_FIELDS=['textBody'];
const PRESENCE = 'PRESENCE'

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/getTeacherNote?tableName=' + TBL_TEACHER_NOTE + '&language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR(state.language),
        viewComponent:View1,
        viewFields:VIEW_FIELDS,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        tableUpdate:TBL_TEACHER_NOTE,
        urlUpdate:'/admin/updateRow',
        urlReplace:'/admin/replaceRow',
        updateView:UPDATE_VIEW,
        updateFields:UPDATE_FIELDS,
    }
}    

export default connect( 
    mapStateToProps,
) (withRecords(GetRegistrationMapMap));    
