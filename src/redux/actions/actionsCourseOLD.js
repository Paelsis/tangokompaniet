export const ADD_COURSE='ADD_COURSE'
export const REMOVE_COURSE='REMOVE_COURSE'
export const TOGGLE_COURSE='TOGGLE_COURSE'
export const RESET_LIST='RESET_COURSELIST'

let nextShoppingIndex = 0

export const toggleCustomer = () => {
  return {
    type: TOGGLE_CUSTOMER,
  }
}
ß
export const addRegistration = (course) => {
  return {
    type: ADD_COURSE,
    payload: {
      index:nextShoppingIndex++,
      deleted:false, 
      ...course
    }
  }
}

// Remove from an shopping list only needs an index
export const removeCourse = (index) => {
  return {
    type: REMOVE_COURSE,
    index
  }
}


// Remove from an shopping list only needs an index
export const resetCourseList = ()  => {
  nextShoppingIndex = 0
  return {
    type: RESET_COURSE_LIST,
  }
}

// Toggle the Strikeover for an object needs only an index
export const toggleCourse = (index) => 
(
  {
    type: TOGGLE_COURSE,
    index
  }
)
