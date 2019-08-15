import { SCHEDULES_BY, ASYNC_ACTION_START, ASYNC_ACTION_FINISH, TODAY_SCHEDULES } from './types'
import authService from '../services/authService'
import axiosService from '../services/axiosService'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './asyncActions'
import toastr from 'react-redux-toastr'
import axios from 'axios'
import { push } from 'connected-react-router'
import { endpoint, prodEndpoint } from '../config'
const URL = process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint
const axiosInstance = axiosService.getInstance();



export const todaySchedules = (ownerId) => {



    return (dispatch) => {

        axiosInstance.post(`/schedules/now`, { type: 'owner', ownerId })
            .then((response) => {

                dispatch({
                    type: TODAY_SCHEDULES,
                    payload: response.data.schedules
                })
            })
            .catch((err) => {
                console.log(err)
            })


    }



}



export const getSchedulesBy = (actor, group) => {



    return (dispatch) => {


        axiosInstance.post(`/schedules/get`, { actor, group })
            .then((response) => {

                dispatch({
                    type: SCHEDULES_BY,
                    payload: response.data
                })
            })


    }






}