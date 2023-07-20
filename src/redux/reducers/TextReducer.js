import {SET_TEXT_LIST, ADD_TEXT, REMOVE_TEXT, TOGGLE_TEXT, CHANGE_TEXT} from '../actions/actionsText';

const initialState = {
  list:[],
}  

const TextReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEXT_LIST:
      return Object.assign({}, state, 
        {
          list: action.list?[...action.list]:[]        
        })
    case ADD_TEXT:
      return Object.assign({}, state, 
        {
          list: [...state.list, action.payload]        
        })
    case REMOVE_TEXT:
      return Object.assign({}, state, 
        {
          list: [...state.list.slice(0, action.index), 
                   ...state.list.slice(action.index+1)]
        })
    case TOGGLE_TEXT:
      return Object.assign({}, state, 
          {
            list: state.list.map(it => {
              if (it.id == action.id) {
                return Object.assign({}, it, {visibile: !it.visible})
              } else {
                return it
              }
            })
          })
      case CHANGE_TEXT:
      return Object.assign({}, state, 
          {
            list: state.list.map(it => {
              if (it.id == action.id) {
                return Object.assign({}, it, action.payload)
              } else {
                return it
              }
            })
          })
    default:
      return state
  }
}

export default TextReducer;
