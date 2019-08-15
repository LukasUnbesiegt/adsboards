import { SCHEDULES_BY, SINGLE_SCHEDULE, TODAY_SCHEDULES } from '../actions/types'

const initialState = {

};


export default (state = initialState, action) => {




    switch (action.type) {

        case SCHEDULES_BY:
            return { ...state, schedules: action.payload }

        case SINGLE_SCHEDULE:
            return { ...state, schedule: action.payload }
        case TODAY_SCHEDULES:
            return { ...state, today: action.payload }

        default:
            return state
    }
}
