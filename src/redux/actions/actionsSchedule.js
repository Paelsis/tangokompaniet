export const SET_SCHEDULE_LIST='SET_SCHEDULE_LIST'
export const ADD_NEW_SCHEDULE='ADD_NEW_SCHEDULE'
export const CHANGE_SCHEDULE='CHANGE_SCHEDULE'
export const REMOVE_SCHEDULE='REMOVE_SCHEDULE'
export const TOGGLE_SCHEDULE='TOGGLE_SCHEDULE'

export const setScheduleList = (list) => {
  return {
    type: SET_SCHEDULE_LIST,
    list
  }
}

export const addSchedule = (payload) => {
  return {
    type: ADD_NEW_SCHEDULE,
    payload,
  }
}

export const changeSchedule = (rec) => {
  return {
    type: CHANGE_SCHEDULE,
    payload: {...rec, ['modified']:true}
  }
}

// Remove from an shopping list only needs an index
export const removeSchedule = (index) => {
  return {
    type: REMOVE_SCHEDULE,
    index
  }
}

// Toggle the Strikeover for an object needs only an index
export const toggleSchedule = (index) => 
(
  {
    type: TOGGLE_SCHEDULE,
    index
  }
)





