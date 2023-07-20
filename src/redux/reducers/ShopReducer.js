import {connect} from 'react-redux';
import {ADD_ITEM, UPDATE_ITEM, ADD_COURSE, REMOVE_ITEM, TOGGLE_ITEM, RESET_ITEM_LIST} from '../actions/actionsShop';

const initialState = {
  list: [],
}  

const ShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
    //console.log('ShopReducer - payload:', action.payload)
    return Object.assign({}, state, 
        {
          list: [...state.list, action.payload]        
        })
    case ADD_COURSE:
        return Object.assign({}, state, 
          {
            list: [...state.list.filter(it=>it.showInCart), action.payload]        
          })
    case REMOVE_ITEM:
      return Object.assign({}, state, 
        {
          list: [...state.list.slice(0, action.index), 
                   ...state.list.slice(action.index+1)]
        })
    case TOGGLE_ITEM:
      return Object.assign({}, state, 
          {
            list: state.list.map((it) => {
                if (it.index === action.index) {
                  console.log('deleted:', it.deleted)
                  return Object.assign({}, it, {deleted: !it.deleted})
                } else {
                  return it
                }
            })
          })
      case UPDATE_ITEM:
        console.log('In ShopReducer: reg', action.payload)  
        return Object.assign({}, state, 
          {
            list: state.list.map((it) => {
              if (it.productId === action.payload.productId) {
                //alert(it.productId + ' ' + action.payload.productId + it.size + ' ' + action.payload.size)
                return Object.assign({}, it, action.payload)
              } else {
                return it
              }
            })
          })
      

    case RESET_ITEM_LIST:
      return Object.assign({}, state, 
        {
          list: []
        })
    default:
      return state
  }
}

export default ShopReducer;
