
import { LOGIN_USER, AUTH_USER, REGISTER_USER, USER_SERVER, LOGOUT_USER, GET_ERRORS } from './types'
import authService from '../services/authService'
import axiosService from '../services/axiosService'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './asyncActions'
import toastr from 'react-redux-toastr'
import { reset } from 'redux-form'
import Chatkit from "@pusher/chatkit-client";


import axios from 'axios'

import { endpoint, prodEndpoint } from '../config'

const URL = process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint
const axiosInstance = axiosService.getInstance();




export function registerUser(dataToSubmit) {
  //   const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
  //       .then(response => response.data);

  //   return {
  //       type: REGISTER_USER,
  //       payload: request
  //   }
}



export const isRoomExist = (id, callback) => {


  return (dispatch) => {


    axiosInstance.get(`/chats/rooms/${id}`)
      .then((response) => {

        callback(response.data)

      })



  }

}

export const sendMessage = (currentUser, currentRoom, data) => {

  console.log('currentUser', currentUser)
  console.log('currentRoom', currentRoom)
  console.log('message', data.message)

  return (dispatch) => {

    currentUser.sendMessage({
      text: data.message,
      roomId: `${currentRoom.id}`
    });
    dispatch(reset('create-message'))

  }




}

export const connectToChat = (user, id, callback) => {

  return (dispatch) => {

    axiosInstance.post(`/chats/users`, { user })
      .then(() => {

        const tokenProvider = new Chatkit.TokenProvider({
          url: `${URL}api/v1/chats/authenticate`
        });

        const chatManager = new Chatkit.ChatManager({
          instanceLocator: "v1:us1:bb5df3cd-5dc0-47a0-af60-dc0e87479b25",
          userId: user.id,
          tokenProvider,
          connectionTimeout: 20000
        });

        return chatManager.connect().then(currentUser => {
          dispatch(isRoomExist(id, (exist) => {
            callback(currentUser, exist)
          }))


        });

      })

  }



}





export function loginUser(dataToSubmit, history) {

  // dataToSubmit - user object we submit in form 
  // history - react-router-history

  return async (dispatch) => {


    try {


      dispatch(asyncActionStart())

      // HERE we call 'api/v1/users/login' api endpoint with POST request. 
      const response = await axios.post(`${URL}api/v1/users/login`, dataToSubmit);

      if (response.data.success) {

        // we set token in localStrage as 'auth_token' name
        await authService.setToken(response.data.token)

        // now
        history.push('/admin')
        dispatch(asyncActionFinish())
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: response.data.message
        })
      }


    } catch (error) {


    }



  }





}
export function fbLogin(dataToSubmit, history) {



  return async (dispatch) => {

    try {
      dispatch(asyncActionStart())
      const response = await axios.post(`${URL}api/v1/users/fblogin`, dataToSubmit);

      if (response) {
        console.log(response.data.token);
        await authService.setToken(response.data.token)

        history.push('/user')
        dispatch(asyncActionFinish())
      }


    } catch (error) {
      console.log(error)
    }



  }





}

export function auth(history, reload) {



  return async (dispatch) => {


    try {


      const userData = await axiosInstance.get('/owners/auth');


      dispatch({
        type: AUTH_USER,
        payload: userData.data
      })

      console.log(userData)
      //kick user out


    } catch (error) {
      console.log(error)
    }

  }


}

export const logoutUser = (history) => dispatch => {

  authService.deleteToken()

  const REDIRECT_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://www.spotads.live'
  window.location.assign(REDIRECT_URL);



};


