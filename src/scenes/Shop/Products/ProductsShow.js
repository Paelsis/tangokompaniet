import { connect } from 'react-redux'
import withCombinedRecords from './withCombinedRecords'
import _TableShow from 'Components/Table/_TableShow'
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

let ProductsShow = withCombinedRecords(_TableShow);

ProductsShow =  connect( 
    mapStateToProps,
    mapDispatchToProps,
) (ProductsShow);    

export default ProductsShow;
