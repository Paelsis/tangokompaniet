import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import backgroundColor from '@material-ui/core/colors/teal';
import { View1 } from 'Settings/UtilsMap'

const GROUP_BY_DEF_ARR=[
    {
        groupByField:'eventType', 
        headerFields:['eventType'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                backgroundColor:backgroundColor[600]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:backgroundColor[500], 
            }
        }    
    },    
    {
        groupByField:'dateRange', 
        headerFields:['dateRange'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                backgroundColor:backgroundColor[600]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:backgroundColor[500], 
            }
        }    
    },    
    {
        groupByField:'role', 
        headerFields:['role'],

        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                backgroundColor:backgroundColor[600]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:backgroundColor[500], 
            }
        }    
    },    
] 

const VIEW_FIELDS=['orderId', 'handled', 'firstName', 'lastName', 'email', 'food', 'allergies', 'helper', 'agentCode', 'comment', 'creaTimestamp'];
const VIEW_FIELDS_EXPAND=['orderId', 'handled', 'firstName', 'lastName',  'address', 'email', 'phone', 'food', 'allergies', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'helper', 'agentCode', 'comment', 'creaTimestamp'];
const UPDATE_FIELDS=['handled', 'firstName', 'lastName',  'email', 'phone', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'helper', 'agentCode'];
const UPDATE_VIEW=['handled', 'firstName', 'lastName', 'email', 'phone', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'helper', 'agentCode'];

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/admin/getRegistrationMarathon?language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR,
        viewFields:VIEW_FIELDS,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        viewComponent:View1,
        tableUpdate:'tbl_registration_marathon',
        urlUpdate:'/admin/updateRow',
        updateFields:UPDATE_FIELDS,
        updateView:UPDATE_VIEW,
    }
}    

export default connect( 
    mapStateToProps,
) (withRecords(GetRegistrationMapMap));    
