import {SET_CURRENCY, CURRENCY_SEK} from 'redux/actions/actionsCurrency'

const initialState = CURRENCY_SEK

const CurrencyReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CURRENCY:
        return action.currency
      default:
        return state
    }
}
  
export default CurrencyReducer
  