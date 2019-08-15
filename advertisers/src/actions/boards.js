import { GET_BOARDS, LOGOUT_USER, GET_ERRORS, GET_SINGLE_BOARD, GET_BOARDS_REQUESTED, GET_DATES, GET_SINGLEBOARD_REQUESTS } from './types'
import authService from '../services/authService'
import axiosService from '../services/axiosService'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './asyncActions'
import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import { push } from 'connected-react-router'
import { endpoint, prodEndpoint } from '../config'
const URL = process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint
const axiosInstance = axiosService.getInstance();





export const deleteRequest = (scheduleId, advertiserId) => {



    return (dispatch) => {

        axiosInstance.post(`/boards/delete`, { scheduleId })

            .then((response) => {
                toastr.info('delete a request')
                dispatch(getBoardsRequested(advertiserId, 1))

            })

            .catch((err) => {
                console.log(err)
            })
    }

}

export const giveRating = (boardId, rating) => {

    // boardId - id of a board which redux-form send
    // rating - number which user set 

    return (dispatch) => {

        // calling api POST /api/v1/boards/rate with data above
        axiosInstance.post(`/boards/rate`, { boardId, rating })
            .then((response) => {

                // call getBoards action for reflecting all changes in board
                dispatch(getBoards())
                // pop up
                toastr.info('thanks for rating')

                // redirect to /spots url
                dispatch(push(`/spots`))


            })

            .catch((err) => {




            })


    }
}


export const getDatesFromBoard = (boardId) => {

    // GETTING DISABLED DATES FROM SERVER ASSOCIATED TO BOARD ID
    // boardId from redux-form to send server
    return (dispatch) => {

        // calling api GET request with boardId
        axiosInstance.get(`/boards/dates/${boardId}`)
            .then((response) => {


                // setting GET_DATES action and set disabled dates to reducer
                dispatch({
                    type: GET_DATES,
                    payload: response.data.dates
                })

            })

            .catch((err) => {




            })

    }



}


export const redirectChatRoom = (data) => {

    return (dispatch) => {
        dispatch({
            type: GET_SINGLEBOARD_REQUESTS,
            payload: data
        })

        dispatch(push('/singleboard'))
    }


}

export const searchBoardRequested = (advertiserId, page = 1, text) => {

    // search boards with advertiserId , page and text from redux-form form

    return (dispatch) => {

        // pop up
        toastr.info('searching')

        // calling api POST request with above data
        axiosInstance.post(`/boards/requests`, { advertiserId, page, text })
            .then((response) => {


                // dispatch GET_BOARDS_REQUESTED action type and set payload as response boards we get›
                dispatch({
                    type: GET_BOARDS_REQUESTED,
                    payload: response.data
                })



            })

    }

}

export const getBoardsRequested = (advertiserId, page = 1) => {



    return (dispatch) => {


        axiosInstance.post(`/boards/requests`, { advertiserId, page })
            .then((response) => {
                dispatch({
                    type: GET_BOARDS_REQUESTED,
                    payload: response.data
                })


            })

    }

}

export const requestSpot = (data) => {


    // requesting board to book an ads


    return (dispatch) => {

        // api route POST request /api/v1/boards/request with data from redux-form form
        axiosInstance.post(`/boards/request`, data)
            .then((response) => {

                // dispatch getBoardRequested action with advertiserId and page number 1 
                dispatch(getBoardsRequested(data.advertiserId, 1))
                // pop up 
                toastr.info('you request a board')

                // redirect to /request url 
                dispatch(push(`/requests`))

            })

    }

}




export const getSingleBoard = (boardId) => {



    return (dispatch) => {

        axios.get(`${URL}api/v1/boards/single/${boardId}`)

            .then((response) => {


                dispatch({
                    type: GET_SINGLE_BOARD,
                    payload: response.data
                })

                dispatch(push('/single'))


            })


            .catch(() => {

            })

    }





}

export const getBoards = (page = 1, filters = {}) => {



    return (dispatch) => {

        axios.post(`${URL}api/v1/boards/search`, { page, filters })

            .then((response) => {

                console.log(response)
                toastr.info('rendering boards ')
                dispatch({
                    type: GET_BOARDS,
                    payload: response.data
                })


            })


            .catch(() => {

            })

    }


}