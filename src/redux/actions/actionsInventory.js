export const ADD_PRODUCT='ADD_PRODUCT'
export const REMOVE_PRODUCT='REMOVE_PRODUCT'
export const TOGGLE_PRODUCT='TOGGLE_PRODUCT'
export const ADD_COUNT='ADD_COUNT'
export const SUBTRACT_COUNT='SUBTRACT_COUNT'
export const ADD_RESERVED_COUNT='ADD_RESERVED_COUNT'
export const SUBTRACT_RESERVED_COUNT='SUBTRACT_RESERVED_COUNT'
export const ADD_COMMENT='ADD_COMMENT'

let nextShoppingIndex = 0

export const addProduct = (productId, size, count, reservedCount) => {
  return {
    type: ADD_PRODUCT,
    payload: {
      index:nextShoppingIndex++,
      productId,
      size,
      count,
      reservedCount,
    }
  }
}

// Remove from an shopping list only needs an index
export const removeProduct = (productId, size) => {
  return {
    type: REMOVE_PRODUCT,
    productId, 
    size
  }
}

// Toggle the Strikeover for an object needs only an index
export const toggleProduct = (productId, size) => 
(
  {
    type: TOGGLE_PRODUCT,
    payload:{
      productId, 
      size:size++,
    }  
  }
)

// Add count
export const addCount = (productId, size) => 
(
  {
    type: ADD_COUNT,
    payload:{
      productId, 
      size,
    }  
  }
)

export const subtractCount = (productId, size) => 
(
  {
    type: SUBTRACT_COUNT,
    payload:{
      productId, 
      size,
    }  
  }
)

// Add count
export const addReservedCount = (productId, size) => 
(
  {
    type: ADD_RESERVED_COUNT,
    productId, 
    payload:{
      productId, 
      size,
    }  
 }
)

export const subtractReservedCount = (productId, size) => 
(
  {
    type: SUBTRACT_RESERVED_COUNT,
    payload:{
        productId, 
        size,
    }  
  }
)

export const addComment = (productId, size, comment) => 
(
  {
    type: ADD_COMMENT,
    payload:{
        productId, 
        size,
        comment,
    }  
  }
)

