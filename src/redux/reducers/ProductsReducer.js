import {SET_PRODUCT_LIST, ADD_NEW_PRODUCT, REMOVE_PRODUCT, TOGGLE_PRODUCT, CHANGE_PRODUCT} from '../actions/actionsProducts';

const initialState = {
  list:[],
}  

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return Object.assign({}, state, 
        {
          list: [...action.list]        
        })
    case ADD_NEW_PRODUCT:
      return Object.assign({}, state, 
        {
          list: [...state.list, action.payload]        
        })
    case REMOVE_PRODUCT:
      return Object.assign({}, state, 
        {
          list: [...state.list.slice(0, action.index), 
                   ...state.list.slice(action.index+1)]
        })
    case TOGGLE_PRODUCT:
      return Object.assign({}, state, 
          {
            list: state.list.map(it => {
              if (it.id == action.id) {
                return Object.assign({}, it, {visibile: !it.visible})
              } else {
                return it
              }
            })
          })
      case CHANGE_PRODUCT:
      return Object.assign({}, state, 
          {
            list: state.list.map(it => {
              if (it.id == action.id) {
                return Object.assign({}, it, action.payload)
              } else {
                return it
              }
            })
          })
    default:
      return state
  }
}

export default ProductsReducer;
