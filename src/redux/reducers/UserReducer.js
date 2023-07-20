import {SET_USER_KEY} from 'redux/actions/actionsUser';

const initialState = {
    username:'',
    password:'',
    loggedInFlag:false,
} 

const UserReducer = (state = initialState, action) => { 
  switch (action.type) {
    case SET_USER_KEY:
       return Object.assign({}, state, action.payload)
    default:
      return state
  }   
}

export default UserReducer
