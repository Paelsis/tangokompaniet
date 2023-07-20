import {connect} from 'react-redux';
import {ADD_PRODUCT, 
  REMOVE_PRODUCT, 
  TOGGLE_PRODUCT, 
  ADD_COUNT, 
  SUBTRACT_COUNT, 
  ADD_RESERVED_COUNT, 
  SUBTRACT_RESERVED_COUNT, 
  ADD_COMMENT} from '../actions/actionsInventory';
import {tkInventory} from 'Data/tkInventory'

const initialState = {
  list: tkInventory,
}  

const InventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
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
            list: state.list.map((it, index) => {
              if (it.productId == action.payload.productId && it.size === action.payload.size) {
                return Object.assign({}, it, {deleted: !it.deleted})
              } else {
                  return it
              }
            })
          })
    case ADD_COUNT:
    return Object.assign({}, state, 
      {
        list: state.list.map((it, index) => {
          if (it.productId == action.payload.productId && it.size === action.payload.size) {
            //alert(it.productId + ' ' + action.payload.productId + it.size + ' ' + action.payload.size)
            return Object.assign({}, it, {count: it.count+1})
            } else {
              //alert('XXXXX' + it.productId + ' ' + action.payload.productId + it.size + ' ' + action.payload.size)
              return it
            }
        })
      })
      case SUBTRACT_COUNT:
      return Object.assign({}, state, 
        {
          list: state.list.map((it, index) => {
              if (it.productId == action.payload.productId && it.size === action.payload.size) {
                 return Object.assign({}, it, {count:Math.max(it.count-1, 0)})
              } else {
                return it
              }
          })
        })  
        case ADD_RESERVED_COUNT:
        return Object.assign({}, state, 
          {
            list: state.list.map((it, index) => {
              if (it.productId == action.payload.productId && it.size === action.payload.size) {
                return Object.assign({}, it, {reservedCount: it.reservedCount+1}) 
                } else {
                  return it
                }
            })
          })
          case SUBTRACT_RESERVED_COUNT:
          return Object.assign({}, state, 
            {
              list: state.list.map((it, index) => {
                if (it.productId == action.payload.productId && it.size === action.payload.size) {
                  return Object.assign({}, it, {reservedCount: Math.max(it.reservedCount-1,0)})
                  } else {
                    return it
                  }
              })
            })  
            case ADD_COMMENT:
            return Object.assign({}, state, 
              {
                list: state.list.map((it, index) => {
                  if (it.productId == action.payload.productId && it.size === action.payload.size) {
                    return Object.assign({}, it, {comment: action.payload.comment})
                    } else {
                      return it
                    }
                })
              })  
      default:
      return state
  }
}

export default InventoryReducer;
