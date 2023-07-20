import {ITEM_TYPE_SHOE} from 'Data/tkShop'
export const SET_PRODUCT_LIST='SET_PRODUCT_LIST'
export const ADD_NEW_PRODUCT='ADD_NEW_PRODUCT'
export const CHANGE_PRODUCT='CHANGE_PRODUCT'
export const REMOVE_PRODUCT='REMOVE_PRODUCT'
export const TOGGLE_PRODUCT='TOGGLE_PRODUCT'

export const setProductList = (list) => {
  return {
    type: SET_PRODUCT_LIST,
    list
  }
}

export const addProduct = (image) => {
  return {
    type: ADD_NEW_PRODUCT,
    payload: {
      id:null,
      productType:ITEM_TYPE_SHOE,
      productId:'',
      productName:'', 
      gender:'F',
      image,
      brandId:'',
      priceGroup:0,
      price:0,
      whenSoldOut:'stop sell',
      comment:'This product is new',
      sizes:'Comma separated string with initial incoming sizes'
    }
  }
}

export const changeProduct = (rec) => {
  return {
    type: CHANGE_PRODUCT,
    payload: {...rec, ['modified']:true}
  }
}

// Remove from an shopping list only needs an index
export const removeProduct = (index) => {
  return {
    type: REMOVE_PRODUCT,
    index
  }
}

// Toggle the Strikeover for an object needs only an index
export const toggleProduct = (index) => 
(
  {
    type: TOGGLE_PRODUCT,
    index
  }
)





