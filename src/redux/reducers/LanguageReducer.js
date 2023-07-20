import {SET_LANGUAGE, LANGUAGE_SV} from 'redux/actions/actionsLanguage'

const initialState = LANGUAGE_SV

const LanguageReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_LANGUAGE:
        return action.language
      default:
        return state
    }
}
  
export default LanguageReducer
  