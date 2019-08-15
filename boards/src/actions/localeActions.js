import { LOCALE_SET } from './types'


export const localSet = (lang) => {
    return { type: LOCALE_SET, lang: lang }
}


export const setLocale = (lang) => {
    return (dispatch) => {
        localStorage.Lang = lang;
        dispatch(localSet(lang))
    }
}