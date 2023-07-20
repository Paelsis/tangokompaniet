import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import backgroundColor from '@material-ui/core/colors/blueGrey'
import { View1 } from 'Settings/UtilsMap';

const GROUP_BY_DEF_ARR=[
    {
        groupByField:'eventType', 
        headerFields:['eventType'],
        headerSortBy:['startDate'],
        headerProps:{
            open:{
                width:'100vw', 
                backgroundColor:backgroundColor[600]
            }, 
            closed:{
                width:'50vw',
                backgroundColor:backgroundColor[500], 
            }
        },    
    },    
    {
        groupByField:'dateRange', 
        headerFields:['dateRange'],
        headerSortBy:['startDate'],
        headerProps:{
            open:{
                width:'100vw', 
                backgroundColor:backgroundColor[600]
            }, 
            closed:{
                width:'80vw',
                backgroundColor:backgroundColor[500], 
            }
        }    
    },    
    /*
    {
        groupByField:'productType', 
        headerFields:['productType'],

        headerProps:{
            open:{
                width:'100vw', 
                backgroundColor:backgroundColor[800]
            }, 
            closed:{
                width:'80vw',
                backgroundColor:backgroundColor[700], 
            }
        }    
    },
    */    
    {
        groupByField:'product', 
        headerFields:['product'],

        headerProps:{
            open:{
                width:'100vw', 
                backgroundColor:backgroundColor[900]
            }, 
            closed:{
                width:'80vw',
                backgroundColor:backgroundColor[800], 
            }
        }    
    },    
] 

const VIEW_FIELDS=['orderId', 'role', 'firstName', 'lastName', 'email', 'phone', 'firstNamePartner', 'lastNamePartner', 'emailPartner']
const VIEW_FIELDS_EXPAND=['orderId', 'role', 'firstName', 'lastName', 'email', 'phone', 'firstNamePartner', 'lastNamePartner', 'emailPartner']
const UPDATE_FIELDS=['firstNamePartner', 'lastNamePartner','emailPartner']
const UPDATE_VIEW=['firstNamePartner', 'lastNamePartner','emailPartner']


const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/admin/getRegistrationFestivalByProduct?language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR,
        viewComponent:View1,
        viewFields:VIEW_FIELDS,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        tableUpdate:'tbl_registration_festival_product',
        urlUpdate:'/admin/updateRow',
        updateFields:UPDATE_FIELDS,
        updateView:UPDATE_VIEW,
    }
}    

export default connect( 
    mapStateToProps,
) (withRecords(GetRegistrationMapMap));    
