import { connect } from 'react-redux'
import withCombinedRecords from './withCombinedRecords'
import _TableEdit from 'Components/Table/_TableEdit'
import {setProductList} from 'redux/actions/actionsProducts'

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        list: state.products.list,
    }
}    

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
    return {
        setList: (list) => { dispatch(setProductList(list)) }
    }        
}

const ProductEdit = withCombinedRecords(_TableEdit);

export default connect( 
    mapStateToProps,
    mapDispatchToProps,
) (ProductEdit);    
