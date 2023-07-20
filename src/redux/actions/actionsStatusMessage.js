export const SET_STATUS_MESSAGE='SET_STATUS_MESSAGE'
export const SET_SLEEP_TIME='SET_SLEEP_TIME'

export const setStatusMessage = (status, message) => {
  // console.log('setStatusMessage action -> status:' + status + ' message:' + message)
  return {
    type: SET_STATUS_MESSAGE,
    payload: {
      status, 
      message,
    }
  }
}

export const setSleepTime = (sleepTime) => {
  return {
    type: SET_SLEEP_TIME,
    payload: {
      sleepTime,
    }
  }
}

