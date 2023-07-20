import {ITEM_TYPE_ALL} from 'Data/tkShop'

const initialState = ITEM_TYPE_ALL
  

const VisibilityFilterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter
      default:
        return state
    }
}
  
export default VisibilityFilterReducer
  