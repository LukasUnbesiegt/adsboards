
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'
const initialState = {

}

export default (state = initialState, { type, payload }) => {



    switch (type) {

        case GET_ERRORS:
            return { ...state, error: payload }
            break;
        case CLEAR_ERRORS:
            return {}

        default:
            return state
    }
}
