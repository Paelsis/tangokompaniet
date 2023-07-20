import {SET_SCHEDULE_LIST, ADD_NEW_SCHEDULE, REMOVE_SCHEDULE, TOGGLE_SCHEDULE, CHANGE_SCHEDULE} from '../actions/actionsSchedule';

const initialState = {
  list:[],
}  

const SchedulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCHEDULE_LIST:
      return Object.assign({}, state, 
        {
          list: [...action.list]        
        })
    case ADD_NEW_SCHEDULE:
      return Object.assign({}, state, 
        {
          list: [...state.list, action.payload]        
        })
    case REMOVE_SCHEDULE:
      return Object.assign({}, state, 
        {
          list: [...state.list.slice(0, action.index), 
                   ...state.list.slice(action.index+1)]
        })
    case TOGGLE_SCHEDULE:
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
      case CHANGE_SCHEDULE:
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

export default SchedulesReducer;
