import {SET_STATUS_MESSAGE, SET_SLEEP_TIME} from 'redux/actions/actionsStatusMessage';
import {STATUS_OK} from 'functions/statusMessage';

const initialStateShow = {
    status:STATUS_OK,
    message:'My very initial error message from initialState',
    sleepTime:4000,
} 
const initialState = {
    status:null,
    message:null,
    sleepTime:2000,
} 

const StatusMessageReducer = (state = initialState, action) => { 
  switch (action.type) {
    case SET_STATUS_MESSAGE:
       return Object.assign({}, state, action.payload)
    case SET_SLEEP_TIME:
       return Object.assign({}, state, action.payload)
    default:
      return state
  }   
}

export default StatusMessageReducer
