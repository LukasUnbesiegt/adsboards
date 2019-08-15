import { LOGIN_USER, AUTH_USER, REGISTER_USER, USER_SERVER, LOGOUT_USER, GET_ERRORS, GET_ADVERTS, GET_SINGLE_ADVERT, GET_SINGLE_ADVERTISER, SPOT_LISTS } from '../types'
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


export const getSpotListsByAds = (advertId) => {




    return (dispatch) => {

        axiosInstance.post('/advertisers/spotlists', { advertId })
            .then((response) => {

                // toastr.success('successfuly recharge credits')
                dispatch({
                    type: SPOT_LISTS,
                    payload: response.data.schedules
                })
            })
            .catch(() => {
                toastr.error('something wrong with finding spot lists')
            })
    }

}


export const stripeCheckOut = (data) => {



    // stripe checkout action 
    // data - stripe credit and topup informaiton to send to server
    return (dispatch) => {

        // making api POST request to /api/v1/advertiser/stripe with data object and getting back response
        axiosInstance.post('/advertisers/stripe', data)
            .then((response) => {

                // pop up showing
                toastr.success('successfuly recharge credits')

                // dispatching getAdvertiser action to reflect all update changes in advertiser object
                dispatch(getAdvertiser())
            })
            .catch(() => {
                toastr.error('something wrong with recharging credits')
            })
    }


}



export const editUser = (data) => {

    return (dispatch) => {
        axiosInstance.post(`/users/edit`, { ...data })
            .then((response) => {

                dispatch(auth())
                toastr.success('changed user account')
            })
    }


}

export const getAdvertiser = () => {

    return (dispatch) => {

        // making api GET request to /api/v1/single 
        axiosInstance.get(`/advertisers/single`)
            .then((response) => {


                // getting response data from server
                // and set response advertiser object as payload for GET_SINGLE_ADVERTISER action type
                dispatch({
                    type: GET_SINGLE_ADVERTISER,
                    payload: response.data.advertiser
                })


            })
    }



}
export const createProfile = (advertiserId, data) => {

    console.log('data', data)
    return (dispatch) => {


        axiosInstance.post(`/advertisers/profile/create`, { advertiserId, ...data })
            .then((response) => {

                toastr.info('edit the profile')
                dispatch(getAdvertiser())


            })
    }
}





export const clearForm = (actionType) => {


    return (dispatch) => {
        dispatch({
            type: actionType,
            payload: null
        })
    }

}

export const sendImages = (blobs, callback) => {


    return (dispatch) => {
        const formData = new FormData()
        for (let i = 0; i < blobs.length; i++) {

            formData.append(`file${i}`, blobs[i])

        }

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }



        axiosInstance.post(`/advertisers/upload`, formData)
            .then((response) => {

                callback(response.data)



            })








    }




}



export const deleteOriginalImg = (imageId, productId) => {



    return (dispatch) => {


        axiosInstance.post(`/advertisers/upload/${productId}/${imageId}`)
            .then((response) => {


                dispatch({

                })

            })

            .catch((err) => {
                console.log(err);
            })



    }


}

export const getAdverts = (filters = {}, page = 1) => {

    // filters object and page number from form of redux-form

    return (dispatch) => {

        // calling api POST request to /api/v1/advertises/all enpoint along with filters object and page id
        axiosInstance.post(`/advertisers/all`, { filters, page })

            .then((response) => {


                // getting response back from server

                // dispatching GET_ADVERTS action type and send response adverts as payload
                dispatch({
                    type: GET_ADVERTS,
                    payload: response.data
                })


            })

            .catch((err) => {


            })


    }



}

export const getSingleAdvert = (advertId) => {

    return (dispatch) => {

        axiosInstance.get(`/advertisers/advert/${advertId}`)
            .then((response) => {

                dispatch({
                    type: GET_SINGLE_ADVERT,
                    payload: response.data.advert
                })

                dispatch(push('/adverts/create'))

            })

            .catch((err) => {
                console.log(err.response.data)
            })



    }


}

export const editAdvert = (advertId, advert) => {

    // advertId - id string from redux-form to send to server
    // advert - object from redux-form form to send to server
    return (dispatch) => {

        // making api GET request to /api/v1/advertisers/advert/edit with advertId and advert object 
        axiosInstance.post(`/advertisers/advert/edit`, { advertId, advert })

            .then((response) => {
                // getting response data from server
                // and call getAdverts action for reflect the changes in adverts table
                dispatch(getAdverts())

                // pop up shown
                toastr.info('edited')

                // redirect to /adverts url of advertiser app
                dispatch(push('/adverts'))
            })
    }

}


export const deleteAdvert = (advertId) => {

    // advertId - id string from redux-form to send to server
    return (dispatch) => {
        // making api GET request to /api/v1/advertisers/advert/delete with advertId
        axiosInstance.post(`/advertisers/advert/delete/${advertId}`)

            .then((response) => {
                // getting response data from server
                // and call getAdverts action for reflect the changes in adverts table
                dispatch(getAdverts())
                toastr.info('deleted an advert')

            })

    }


}

export const createAdvert = (advert) => {


    // advert - object to create as new advert and send to server

    return (dispatch) => {
        // making api GET request to /api/v1/advertisers/advert/create with advert object
        axiosInstance.post('/advertisers/advert/create', advert)
            .then((response) => {
                toastr.success('success')
                // getting response data from server
                // and call getAdverts action for reflect the changes in adverts table
                dispatch(getAdverts())
                // redirect to /adverts table list
                dispatch(push('/adverts'))


            })
            .catch(() => {

            })




    }


}

