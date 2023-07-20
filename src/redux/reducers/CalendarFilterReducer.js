import {SET_CALENDAR_FILTER} from 'redux/actions/actionsCalendarFilter'

const initialState = ITEM_TYPE_ALL

const CalendarFilterReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CALENDAR_FILTER:
        return action.filter
      default:
        return state
    }
}
  
export default VisibilityFilterReducer
  