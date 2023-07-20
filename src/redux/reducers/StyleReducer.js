import {SET_APP_BAR_BACKGROUND} from 'redux/actions/actionsStyle';
import tkColors, {defaultGradientBackground, boxShadowValue} from 'Settings/tkColors'

const initialState = {
  color:tkColors.Purple.Light,
  background:defaultGradientBackground,
  boxShadow:boxShadowValue(tkColors.Purple.Light)
} 

const StyleReducer = (state = initialState, action) => { 
  switch (action.type) {
    case SET_APP_BAR_BACKGROUND:
       return Object.assign({}, state, action.payload)
    default:
      return state
  }   
}

export default StyleReducer
