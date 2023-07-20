import {SET_LIST} from '../actions/actionsTeacher';

const initialState = {
  list:[],
}  

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return Object.assign({}, state, 
        {
          list: [...action.list]        
        })
    default:
      return state
  }
}

export default Reducer;
