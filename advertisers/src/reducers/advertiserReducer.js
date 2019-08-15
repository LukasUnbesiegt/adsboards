import { GET_SINGLE_ADVERTISER } from '../actions/types'

const initialState = {

};


export default (state = initialState, action) => {




    switch (action.type) {

        case GET_SINGLE_ADVERTISER:

            return { ...state, advertiser: action.payload }
        default:
            return state
    }
}