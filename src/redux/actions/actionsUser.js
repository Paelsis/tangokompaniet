
// User keys for key-value pair
export const LOGGED_IN_FLAG = 'loggedInFlag'
export const USERNAME='username'
export const PASSWORD='password'

// Action key
export const SET_USER_KEY='SET_USER_KEY'

export const setUser = (key, value) => {
  return {
    type: SET_USER_KEY,
    payload: {
      [key]:value,
    }
  }
}



