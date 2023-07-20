import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import backgroundColor from '@material-ui/core/colors/blueGrey';
import { View1 } from 'Settings/UtilsMap';
   
const GROUP_BY_DEF_ARR=[
    {
        groupByField:'eventType', 
        headerFields:['eventType'],
        headerSortBy:['startDate'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                backgroundColor:backgroundColor[400]
            }, 
            closed:{
                width:'80vw',
                maxWidth:'100%', 
                backgroundColor:backgroundColor[300], 
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
                width:'50vw',
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
                backgroundColor:backgroundColor[900]
            }, 
            closed:{
                width:'80vw',
                backgroundColor:backgroundColor[800], 
            }
        }    
    },    
] 

const VIEW_FIELDS=['orderId', 'handled', 'firstName', 'lastName', 'address', 'email', 'phone','productList', 'productListPartner',  'firstNamePartner', 'lastNamePartner', 'emailPartner', 'emailPartnerAlert', 'workshopPartners', 'helper', 'comment', 'creaTimestamp'];
const VIEW_FIELDS_EXPAND=['orderId', 'handled', 'firstName', 'lastName', 'address', 'email', 'phone','productList', 'productListPartner',  'firstNamePartner', 'lastNamePartner', 'emailPartner', 'emailPartnerAlert', 'workshopPartners', 'helper', 'comment', 'creaTimestamp'];
const UPDATE_FIELDS=['handled', 'firstName', 'lastName',  'email', 'phone', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'helper'];
const UPDATE_VIEW=['handled', 'firstName', 'lastName', 'email', 'phone', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'helper'];

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/admin/getRegistrationFestival?language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR,
        viewComponent:View1,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        viewFields:VIEW_FIELDS,
        tableUpdate:'tbl_registration_festival',
        urlUpdate:'/admin/updateRow',
        updateFields:UPDATE_FIELDS,
        updateView:UPDATE_VIEW
    }
}    

export default connect( 
    mapStateToProps,
) (withRecords(GetRegistrationMapMap));    
