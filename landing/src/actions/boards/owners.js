import { GET_ERRORS } from '../types'
import authService from '../../services/authService'
import axiosService from '../../services/axiosService'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../asyncActions'
import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import { push, replace } from 'connected-react-router'
import { reset } from 'redux-form'
import { endpoint, prodEndpoint } from '../../config'
const URL = process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint
const axiosInstance = axiosService.getInstance();




export const signUpOwner = (data, cb) => {



    return (dispatch) => {

        dispatch(asyncActionStart())
        axios.post(`${URL}api/v1/owners/signup`, data)
            .then((response) => {

                dispatch(reset('signup-owner'))
                dispatch(asyncActionFinish())
                cb();
                toastr.success('account created! sign in now')

            })

            .catch((response) => {

            })

    }

}



export const signInOwner = (data, callback) => {


    return (dispatch) => {
        dispatch(asyncActionStart())
        axios.post(`${URL}api/v1/owners/signin`, data)
            .then((response) => {

                callback(response.data.token)

            })
            .catch((error) => {


                dispatch({
                    type: GET_ERRORS,
                    payload: error.response.data.errors
                })

                toastr.error('something wrong. check your credentials')
                dispatch(reset('login-owner'))

            })



    }

}