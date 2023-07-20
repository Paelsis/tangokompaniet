import {LOAD_FORM} from '../actionsShop'

const initialData = {}  // used to populate "account" reducer when "Load" is clicked

// Reducer for Customer
const ReducerForm = (state = initialData, action) => {
  switch (action.type) {
    case LOAD_FORM:
      return Object.assign({}, state, 
       {
          form: action.payload?action.payload:undefined        
       })
    default:
      return state
  }
}

export default ReducerForm