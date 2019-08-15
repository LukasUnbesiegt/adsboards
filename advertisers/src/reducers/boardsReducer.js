import { GET_BOARDS, GET_SINGLE_BOARD, GET_BOARDS_REQUESTED, GET_SINGLEBOARD_REQUESTS, GET_DATES } from '../actions/types'

const initialState = {

};


export default (state = initialState, action) => {




    switch (action.type) {

        case GET_BOARDS:
            return { ...state, boards: action.payload }

        case GET_SINGLE_BOARD:
            return { ...state, board: action.payload }

        case GET_SINGLEBOARD_REQUESTS:
            return { ...state, schedule: action.payload }

        case GET_BOARDS_REQUESTED:

            return { ...state, requests: action.payload }

        case GET_DATES:
            return {
                ...state, dates: action.payload
            }
        default:
            return state
    }
}
