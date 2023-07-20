export const SET_CURRENCY='SET_CURRENCY'
export const CURRENCY_SEK='SEK' // Swedish
export const CURRENCY_DKK='DKK' // Danish
export const CURRENCY_EUR='EUR' // Euro

export const setCurrency = (currency) => {
    return {
      type: SET_CURRENCY,
      currency,
    }
}
  