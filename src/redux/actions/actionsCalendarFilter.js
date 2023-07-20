export const SET_CALENDAR_FILTER='SET_CALENDAR_FILTER'

export const CALENDAR_ALL='CALENDAR_ALL'
export const CALENDAR_MILONGA='CALENDAR_MILONGA'
export const CALENDAR_PRAKTIKA='CALENDAR_PRAKTIKA'
export const CALENDAR_BRUNCH='CALENDAR_PRAKTIKA'

export const setVisibilityFilter = filter => {
    return {
      type: SET_CALENDAR_FILTER,
      filter
    }
}
  