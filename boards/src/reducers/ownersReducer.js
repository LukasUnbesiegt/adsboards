import { GET_SINGLE_OWNER } from '../actions/types'



export default (state = {}, action) => {



    switch (action.type) {

        case GET_SINGLE_OWNER:
            return { ...state, owner: action.payload }



        default:
            return state
    }
}
