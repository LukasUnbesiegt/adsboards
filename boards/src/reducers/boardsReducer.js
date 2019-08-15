import { GET_SINGLE_BOARD, GET_BOARDS, BOARDS_WITH_ADS, GET_SCHEDULE_FOR_CHAT } from '../actions/types'



export default (state = {}, action) => {



    switch (action.type) {

        case GET_SINGLE_BOARD:
            return { ...state, board: action.payload }

        case GET_BOARDS:
            return { ...state, boards: action.payload }

        case BOARDS_WITH_ADS:
            return { ...state, requests: action.payload }

        case GET_SCHEDULE_FOR_CHAT:
            return { ...state, schedule: action.payload }

        default:
            return state
    }
}
