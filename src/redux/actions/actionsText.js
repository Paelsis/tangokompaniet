export const SET_TEXT_LIST='SET_TEXT_LIST'
export const ADD_TEXT='ADD_TEXT'
export const REMOVE_TEXT='REMOVE_TEXT'
export const TOGGLE_TEXT='TOGGLE_TEXT'
export const CHANGE_TEXT='CHANGE_TEXT'


export const addText = (groupId, textId, textBody, language) => {
  return {
    type: ADD_TEXT,
    payload: {
      groupId,
      textId,
      textBody,
      language, 
      visible:true,
    }
  }
}

export const changeText = (rec) => {
  return {
    type: CHANGE_TEXT,
    payload: {...rec, ['modified']:true}
  }
}


export const setTextList = (list) => {
  return {
    type: SET_TEXT_LIST,
    list
  }
}

// Remove from an shopping list only needs an index
export const removeText = (index) => {
  return {
    type: REMOVE_TEXT,
    index
  }
}

// Toggle the Strikeover for an object needs only an index
export const toggleText = (index) => 
(
  {
    type: TOGGLE_TEXT,
    index
  }
)





