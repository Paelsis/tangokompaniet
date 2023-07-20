import {SET_PRODUCT_FILTER} from '../actions/actionsFilterKeys'

const initialState = {}

// Remove property from object
const removeProperty = (obj, property) => {
  return  Object.keys(obj).reduce((acc, key) => {
    if (key !== property) {
      return {...acc, [key]: obj[key]}
    }
    return acc;
  }, {})
}

const FilterKeysReducer = (state = initialState, action) => { 
  switch (action.type) {
    case SET_PRODUCT_FILTER:
      if (action.payload[action.name]==='undefined') {
        return Object.assign({}, removeProperty(state, action.name))
      } else {
        return Object.assign({}, state, action.payload)
      }  
    default:
      return state
  }   
}

export default FilterKeysReducer
