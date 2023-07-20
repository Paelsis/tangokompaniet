export const ADD_ITEM='ADD_ITEM'
export const UPDATE_ITEM='UPDATE_ITEM'
export const ADD_COURSE='ADD_COURSE'
export const REMOVE_ITEM='REMOVE_ITEM'
export const TOGGLE_ITEM='TOGGLE_ITEM'
export const RESET_ITEM_LIST='RESET_ITEM_LIST'

let nextShoppingIndex = 0

export const addItem = (product, value) => {
  return {
    type: ADD_ITEM,
    payload: {
      index:nextShoppingIndex++,
      showInCart:true,
      debitable:true, 
      deleted:false,
      value,
      ...product,
    }
  }
}

export const addRegistration = (reg) => {
  return {
    type: ADD_COURSE,
    payload: {
      index:nextShoppingIndex++,
      showInCart:false,
      debitable:false,
      deleted:false,
      ...reg, 
    }
  }
}

export const updateRegistration = (reg) => {
  console.log(reg.productId?'OK: Object reg exists and contains productId:' + reg.productId:'WARNING: Object reg does not contain productId')
  return {
    type: UPDATE_ITEM,
    payload: reg
  }
}

// Remove from an shopping list only needs an index
export const removeItem = (index) => {
  return {
    type: REMOVE_ITEM,
    index
  }
}

// Toggle the Strikeover for an object needs only an index
export const toggleItem = (index) => 
({
  type: TOGGLE_ITEM,
  index
})

// Remove from an shopping list only needs an index
export const resetItemList = ()  => {
  nextShoppingIndex = 0
  return {
    type: RESET_ITEM_LIST,
  }
}




