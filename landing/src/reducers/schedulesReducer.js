import { TODAY_SCHEDULE } from '../actions/types'




const initialState = {

};


export default (state = initialState, action) => {




    switch (action.type) {

        case TODAY_SCHEDULE:
            return { ...state, schedule: action.payload }



        default:
            return state
    }
}
