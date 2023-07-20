import { connect } from 'react-redux';
import withRecords from 'Components/Table/withRecords';
import GetRegistrationMapMap from './GetRegistrationMapMap'
import backgroundColor from '@material-ui/core/colors/brown';
import red from '@material-ui/core/colors/red';
import { withBreakpoints } from 'react-breakpoints'
import { View1 } from '../../../Settings/UtilsMap';



const GROUP_BY_DEF_ARR = [
    {
        groupByField:'scheduleName', 
        headerFields:['scheduleName'],
        headerSortBy:['groupByProductId'],
        headerProps:{
            open:{
                width:'100vw', 
                paddingTop:10, 
                paddingBottom:10, 
                backgroundColor:backgroundColor[600],
            }, 
            imbalance:{
            }, 
            closed:{
                width:'80vw',
                padding:2, 
                backgroundColor:backgroundColor[500], 
                // background:"linear-gradient(45deg, backgroundColor[500] 0%, backgroundColor[800] 100%)",

            }
        }    
    },    
    {
        groupByField:'teachers',
        headerFields:['teachers'], 
        headerSortBy:'teachers',
        headerProps:{
            open:{
                width:'100vw', 
                paddingTop:10, 
                paddingBottom:10, 
                backgroundColor:backgroundColor[900]
            }, 
            imbalance:{
            }, 
            closed:{
                width:'80vw',
                padding:2,
                backgroundColor:backgroundColor[800], 
            }
        }
    },    
    {
        groupByField:'groupByProductId',
        headerFields:['name', 'city', 'dayname', 'startTime','startDate'], 
        headerSortBy:'dayOfWeek',
        listSortBy:['firstName','lastName'],
        headerProps:{
            open:{
                width:'100vw', 
                maxWidth:'100%', 
                paddingTop:10, 
                paddingBottom:10, 
                backgroundColor:backgroundColor[900],
            }, 
            imbalance:{
                backgroundColor:red[800]
            }, 
            closed:{
                width:'80vw',
                maxWidth:500, 
                padding:2,
                backgroundColor:backgroundColor[800], 
            }
        }    
    },    
];

const VIEW_FIELDS=['orderId', 'firstName', 'lastName', 'havePaid']
const VIEW_FIELDS_EXPAND=['orderId', ,'havePaid', 'firstName', 'lastName', 'email', 'phone', 'leader', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'danceSite', 'productType', 'productId', 'status', 'regDate', 'newsletter'];
const UPDATE_FIELDS = ['havePaid', 'firstName', 'lastName', 'email', 'phone', 'leader', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'danceSite', 'productId', 'newsletter']        
const UPDATE_VIEW = ['havePaid', 'firstName', 'lastName', 'email', 'phone', 'leader', 'status', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'danceSite', 'productId']


const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/admin/getRegistration?productType=course'  + '&language=' + state.language,
        groupByDefArr:GROUP_BY_DEF_ARR,
        viewComponent:View1,
        viewFieldsExpand:VIEW_FIELDS_EXPAND,
        viewFields:VIEW_FIELDS,
        tableUpdate:'tbl_registration',
        urlUpdate:'/admin/updateRow',
        updateView:UPDATE_VIEW,
        updateFields:UPDATE_FIELDS,
    }
}    

export default connect( 
    mapStateToProps,
) (withBreakpoints(withRecords(GetRegistrationMapMap)));    
