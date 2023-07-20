import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import { View1 } from 'Settings/UtilsMap'

const GROUP_BY_DEF_ARR=[
    /*
    {
        groupByField:'productType', 
        headerFields:['productType'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%',
                paddingTop:10, 
                paddingBottom:10, 
                backgroundColor:indigo[800],
            }, 
            imbalance:{
                backgroundColor:red[800],
            }, 
            closed:{
                width:'80vw',
                padding:2, 
                backgroundColor:indigo[800], 
            }
        }    
    },
    */    
    {
        groupByField:'productId',
        headerFields:['dayOfWeek', 'startDate', 'startTime', 'label'], 
        listSortBy:['firstName','lastName'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%',
                paddingTop:10, 
                paddingBottom:10, 
                backgroundColor:indigo[800],
            }, 
            imbalance:{
                backgroundColor:red[800],
            }, 
            closed:{
                width:'80vw',
                padding:2, 
                backgroundColor:indigo[800], 
            }
        }    
    },    
];

const VIEW_FIELDS=['orderId', 'firstName', 'lastName', 'email', 'phone', 'leader', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'productType', 'productId', 'regDate', 'newsletter'];
const VIEW_FIELDS_EXPAND=['orderId', 'firstName', 'lastName', 'email', 'phone', 'leader', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'productType', 'productId', 'regDate', 'newsletter'];
const UPDATE_FIELDS = ['firstName', 'lastName', 'email', 'phone', 'leader', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'productId', 'newsletter']        
const UPDATE_VIEW = ['firstName', 'lastName', 'email', 'phone', 'leader', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'productId', 'newsletter']        

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/admin/getRegistration?productType=social'  + '&language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR,
        productType:'social',
        viewComponent:View1,
        viewFields:VIEW_FIELDS,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        tableUpdate:'tbl_registration',
        urlUpdate:'/admin/updateRow',
        urlUpdateAll:'/admin/updateTableAll',
        updateFields:UPDATE_FIELDS,
        updateView:UPDATE_VIEW
    }
}    

export default connect(mapStateToProps)(withRecords(GetRegistrationMapMap));    
