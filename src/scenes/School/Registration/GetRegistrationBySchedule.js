import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import backgroundColor from '@material-ui/core/colors/purple';
import { View1 } from 'Settings/UtilsMap';

const GROUP_BY_DEF_ARR=[
    {
        groupByField:'scheduleName', 
        headerFields:['scheduleName'],
        headerSortBy:['groupByProductId'],
        headerProps:{
            open:{
                width:'100%', 
                paddingTop:10, 
                paddingBottom:10, 
                backgroundColor:backgroundColor[800],
            }, 
            imbalance:{
            }, 
            closed:{
                width:'50%',
                padding:2, 
                backgroundColor:backgroundColor[700], 
            }
        }    
    },    
];

const VIEW_FIELDS=['orderId', 'firstName', 'lastName', 'havePaid']
const VIEW_FIELDS_EXPAND=['orderId', 'havePaid', 'firstName', 'lastName', 'email', 'phone', 'role', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'danceSite', 'productType', 'productId', 'status', 'regDate', 'newsletter'];
const UPDATE_FIELDS = ['havePaid', 'firstName', 'lastName', 'email', 'phone', 'leader', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'productId', 'newsletter']        
const UPDATE_VIEW = ['havePaid', 'firstName', 'lastName', 'email', 'phone', 'leader', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'productId']

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/admin/getRegistration?productType=course'  + '&language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR,
        viewComponent:View1,
        viewFields:VIEW_FIELDS,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        tableUpdate:'tbl_registration',
        urlUpdate:'/admin/updateRow',
        updateFields:UPDATE_FIELDS,
        updateView:UPDATE_VIEW,
    }
}    

export default connect(mapStateToProps, null) (withRecords(GetRegistrationMapMap));    
