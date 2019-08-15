import { LOCALE_SET } from '../actions/types'



export default (state = { lang: 'english' }, action) => {
    switch (action.type) {

        case LOCALE_SET:
            return { ...state, lang: action.lang }

        default:
            return state
    }
}
