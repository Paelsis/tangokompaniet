
export const SET_PRODUCT_FILTER='SET_PRODUCT_FILTER'

export const addFilterKey = (name, value) => {
  return {
    type: SET_PRODUCT_FILTER,
    name,
    payload: {
      [name]:value,
    }
  }
}



