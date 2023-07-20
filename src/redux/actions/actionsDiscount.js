export const SET_TOTAL_DISCOUNT='SET_TOTAL_DISCOUNT'
export const SET_GROUP_BY_DISCOUNT='SET_GROUP_BY_DISCOUNT'

export const setTotalDiscount = (totalDiscount) => {
  // console.log('setStatusMessage action -> status:' + status + ' message:' + message)
  return {
    type: SET_TOTAL_DISCOUNT,
    payload: {
      totalDiscount, 
    }
  }
}

export const setGroupByDiscount = (groupByDiscount) => {
  // console.log('setStatusMessage action -> status:' + status + ' message:' + message)
  return {
    type: SET_GROUP_BY_DISCOUNT,
    payload: {
      groupByDiscount,
    }
  }
}


