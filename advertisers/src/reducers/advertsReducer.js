
import { GET_ADVERTS, GET_SINGLE_ADVERT, SPOT_LISTS } from '../actions/types'

const initialState = {

};


export default (state = initialState, action) => {




    switch (action.type) {

        case GET_ADVERTS:
            return { ...state, adverts: action.payload }

        case GET_SINGLE_ADVERT:

            return { ...state, advert: action.payload }
        case SPOT_LISTS:

            return { ...state, lists: action.payload }
        default:
            return state
    }
}
