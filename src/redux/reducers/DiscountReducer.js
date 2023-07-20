import {SET_TOTAL_DISCOUNT, SET_GROUP_BY_DISCOUNT} from 'redux/actions/actionsDiscount';

const initialState = {
    totalDiscount:0,
    groupByDiscount:{},
} 

const DiscountReducer = (state = initialState, action) => { 
  switch (action.type) {
    case SET_TOTAL_DISCOUNT:
       return Object.assign({}, state, action.payload)
    case SET_GROUP_BY_DISCOUNT:
       return Object.assign({}, state, action.payload)
    default:
      return state
  }   
}

export default DiscountReducer
