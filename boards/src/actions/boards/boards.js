import { GET_SINGLE_BOARD, GET_BOARDS, GET_SINGLE_OWNER, BOARDS_WITH_ADS, GET_SCHEDULE_FOR_CHAT } from '../types'
import authService from '../../services/authService'
import axiosService from '../../services/axiosService'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../asyncActions'
import { reset } from 'redux-form'
import axios from 'axios'
import { push } from 'connected-react-router'
import { toastr } from 'react-redux-toastr'
import { endpoint, prodEndpoint } from '../../config'
import { auth } from '../userActions'
const URL = process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint
const axiosInstance = axiosService.getInstance();


export const getInvoices = () => {


}



export const clearForm = (actionType) => {


    return (dispatch) => {
        dispatch({
            type: actionType,
            payload: null
        })
    }

}

export const getSingleBoard = (boardId) => {

    // boardId argument [String]

    // return dispatch function 
    return (dispatch) => {

        // we are making POST api request to /api/v1/boards/single/:boardId
        axiosInstance.get(`/boards/single/${boardId}`)


            .then((response) => {

                // calling GET_SINGLE_BOARD action type and set payload as board object from server 
                dispatch({
                    type: GET_SINGLE_BOARD,
                    payload: response.data.board
                })

                // redirecting to create form with react-router
                dispatch(push('/spots/create'))

            })
    }

}

export const rejectRequest = (schedule, owner) => {



    return (dispatch) => {

        toastr.info('please wait')
        axiosInstance.post('/owners/request/reject', { schedule })


            .then((response) => {

                dispatch(getAdsRequested(owner._id))
                toastr.info('rejected')

            })
    }



}


export const deleteBoard = (id) => {

    // id is the board id coming from redux-form form . it is string id


    return (dispatch) => {

        // we are making POST api request to /api/v1/boards/single/delete
        axiosInstance.post('/boards/single/delete', { boardId: id })


            .then((response) => {


                // pop up 'delete a board'
                toastr.info('delete a board')

                // again we call getBoards Action so that we can see updated boards list
                dispatch(getBoards())

            })

            .catch((err) => {
                console.log(err.response.data)
                // warning back to redux-form that we can't delete board since it has running schedules ( ads )
                toastr.error(`can't delete this board. it has scheduled ads or requests`)

            })
    }



}

export const acceptRequest = (schedule, owner) => {



    return (dispatch) => {

        toastr.info('please wait')
        axiosInstance.post('/owners/request/accept', { schedule, owner })


            .then((response) => {

                dispatch(getAdsRequested(owner._id))
                dispatch(getOwner())
                toastr.info('accepted')

            })
    }



}




export const redirectToChat = (schedule) => {


    return (dispatch) => {


        dispatch({
            type: GET_SCHEDULE_FOR_CHAT,
            payload: schedule
        })

        dispatch(push('/chat'))

    }


}

export const searchAdsRequested = (ownerId, text) => {

    return (dispatch) => {

        toastr.info('searching')
        axiosInstance.post(`/boards/reqboards`, { ownerId, text })
            .then((response) => {

                dispatch({
                    type: BOARDS_WITH_ADS,
                    payload: response.data
                })
            })
            .catch((err) => {

                // console.log(err.response.data)


            })


    }



}


export const getAdsRequested = (ownerId) => {

    return (dispatch) => {


        axiosInstance.post(`/boards/reqboards`, { ownerId })
            .then((response) => {

                dispatch({
                    type: BOARDS_WITH_ADS,
                    payload: response.data
                })
            })
            .catch((err) => {

                // console.log(err.response.data)


            })


    }



}


export const editUser = (data) => {

    // editing user data 
    // data - data object such as username etc
    return (dispatch) => {

        // we are making POST api request to /api/v1/users/edit
        axiosInstance.post(`/users/edit`, { ...data })
            .then((response) => {
                // calling auth function so that. checking user is authorized or now
                dispatch(auth())
                toastr.success('changed user account')
            })
    }


}


export const createProfile = (ownerId, data) => {


    // ownerId - id of owner we try to edit  for sending to server side
    // data - data object such as username etc

    return (dispatch) => {

        // we are making POST api request to /api/v1/owners/profile.create
        axiosInstance.post(`/owners/profile/create`, { ownerId, ...data })
            .then((response) => {

                // pop up showing that we edit user profile
                toastr.info('edit the profile')

                // calling getOwner action so that app reflect the changes instantly
                dispatch(getOwner())


            })
    }
}




export const getOwner = () => {


    // action for getting single owner object for owner profile
    return (dispatch) => {


        // we are making GET api request to /api/v1/owners/single
        axiosInstance.get(`/owners/single`)
            .then((response) => {


                // Adding owner object which we got from server to GET_SINGLE_OWNER as payload
                dispatch({
                    type: GET_SINGLE_OWNER,
                    payload: response.data.owner
                })

            })
    }



}


// getting boards ACTION  - used in redux-form
export const getBoards = (filters = {}, page = 1) => {


    // initially filters object is empty and we assume as page number 1 

    // returning redux-thunk function
    return (dispatch) => {



        // we are making POST api request to /api/v1/boards/all
        axiosInstance.post(`/boards/all`, { filters, page })

            .then((response) => {


                // dispatching GET_BOARDS action type and save data ( boards we got from server) as payload
                dispatch({
                    type: GET_BOARDS,
                    payload: response.data
                })

            })

            .catch((err) => {


            })

    }

}



// LOCK/UNLOCK board actions


export const lockBoard = (boardId) => {

    // board id from redux-form 
    return (dispatch) => {


        // we are making POST api request to /api/v1/boards/lock
        axiosInstance.post(`/boards/lock`, { boardId })
            .then((response) => {

                // popup for showing action of unlock/lock
                toastr.info('lock/unlock activate')

                // again we call getBoards Action so that we can see updated boards list
                dispatch(getBoards())


            })

    }


}

// editing a board ACTION
export const editBoard = (board, boardId) => {

    // we have two argument from redux-form >  board and boardId

    // returning redux-thunk function
    return (dispatch) => {


        // we are making POST api request to /api/v1/boards/edit
        axiosInstance.post(`/boards/edit`, { board, boardId })
            .then((response) => {

                // we alert popup as edited
                toastr.info('edited')

                // calling getBoards action for updateding boards list
                dispatch(getBoards())

                // now we redirect to /spots url of our owner app .  using react-router
                dispatch(push('/spots'))

            })

    }

}


// creation of board action - we use that action in create board form 
export const createBoard = (board) => {


    // returning redux-thunk function
    return (dispatch) => {


        // we are making POST api request to /api/v1/boards
        axiosInstance.post(`/boards`, board)
            .then((response) => {

                // getting response.

                // calling getBoards action for updateding boards list
                dispatch(getBoards())

                // now we redirect to /spots url of our owner app .  using react-router
                dispatch(push('/spots'))

            })

    }


}



export const sendImages = (blobs, callback) => {


    // blobs -  images objects which we get from react-dropzone library + react-cropper ( cropping images library)
    // callback - function which we use when we get images url back to our client-side. we store these url .
    return (dispatch) => {

        // initializing formData to send images to server
        const formData = new FormData()

        // looping blobs array and append each into formData object
        for (let i = 0; i < blobs.length; i++) {

            formData.append(`file${i}`, blobs[i])

        }

        // setting multiplart/formdata header - since we need this when normally we send files to server. it is protocol for global.
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }



        // we are making POST api request to /api/v1/boards/upload
        axiosInstance.post(`/boards/upload`, formData)
            .then((response) => {

                // now we got images url as response.data from server and we will send these images url 
                //into callback function and it will save into board model .

                callback(response.data)

            })


    }




}



export const deleteOriginalImg = (imageId, productId) => {



    return (dispatch) => {


        axiosInstance.post(`/boards/upload/${productId}/${imageId}`)
            .then((response) => {


                dispatch({

                })

            })

            .catch((err) => {
                console.log(err);
            })



    }


}
