import { LOGIN_USER, AUTH_USER, REGISTER_USER, USER_SERVER, LOGOUT_USER, GET_ERRORS } from '../types'
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



export const signUpAdvertiser = (data) => {



    return (dispatch) => {

        dispatch(asyncActionStart())
        axios.post(`${URL}api/v1/advertisers/signup`, data)
            .then((response) => {

                dispatch(reset('signup-advertiser'))
                dispatch(asyncActionFinish())
                dispatch(push('/advertiser/login'))
                toastr.success('account created . sign in now')

            })

            .catch((response) => {



            })

    }




}


export const loginAdvertiser = (data, callback) => {

    // window.onload = function () {
    //     // Get the window displayed in the iframe.
    //     var receiver = document.getElementById('receiver').contentWindow;

    //     // Get a reference to the 'Send Message' button.
    //     var btn = document.getElementById('send');

    //     // A function to handle sending messages.
    //     function sendMessage(e) {
    //       // Prevent any default browser behaviour.
    //       e.preventDefault();

    //       // Send a message with the text 'Hello Treehouse!' to the receiver window.
    //       receiver.postMessage('Hello Treehouse!', 'http://demos.matt-west.com');
    //     }

    //     // Add an event listener that will execute the sendMessage() function
    //     // when the send button is clicked.
    //     btn.addEventListener('click', sendMessage);
    //   }


    return (dispatch) => {

        axios.post(`${URL}api/v1/advertisers/login`, data)
            .then((response) => {

                callback(response.data.token)
            })

            .catch((error) => {

                console.log(error)
                dispatch({
                    type: GET_ERRORS,
                    payload: error.response.data.errors
                })
                console.log(error.response.data.errors)
                toastr.error('something wrong.check your credientials')
                dispatch(reset('add-advertiser'))

            })



    }

}