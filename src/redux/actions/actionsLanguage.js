export const SET_LANGUAGE='SET_LANGUAGE'
export const LANGUAGE_EN='EN' // English
export const LANGUAGE_SV='SV' // Swedish
export const LANGUAGE_ES='ES' // Spanish

export const setLanguage = (language) => {
    return {
      type: SET_LANGUAGE,
      language,
    }
}
  