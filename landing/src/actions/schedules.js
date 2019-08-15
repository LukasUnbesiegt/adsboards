import axios from 'axios'
import { TODAY_SCHEDULE } from './types'
import authService from '../services/authService'
import axiosService from '../services/axiosService'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './asyncActions'
import { push } from 'connected-react-router'
import { toastr } from 'react-redux-toastr'
import { reset } from 'redux-form'
import { endpoint, prodEndpoint } from '../config'
const URL = process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint
const axiosInstance = axiosService.getInstance();





export const increateQRScanByOne = (scheduleId) => {


    return async (dispatch) => {


        console.log('id', scheduleId)
        axios.post(`${URL}api/v1/schedules/scan`, { scheduleId: scheduleId })
            .then((response) => {

            })
            .catch((err) => {


            })


    }

}

export const sendLead = (data, scheduleId) => {



    return async (dispatch) => {

        console.log('lead', data)
        console.log('id', scheduleId)
        axios.post(`${URL}api/v1/schedules/lead`, { scheduleId: scheduleId, lead: data })
            .then((response) => {

                dispatch(reset('create-quest'))
                toastr.info('thanks you')

            })
            .catch((err) => {


            })


    }


}


export const getTodaySchedule = (boardId) => {



    return async (dispatch) => {


        axios.get(`${URL}api/v1/schedules/today/${boardId}`)
            .then((response) => {

                dispatch({
                    type: TODAY_SCHEDULE,
                    payload: response.data.schedule
                })

            })
            .catch((err) => {


            })


    }




}

export const saveBoardId = (id) => {


    return async (dispatch) => {


        await authService.setBoardToken(id);
        dispatch(getTodaySchedule())
        toastr.info('set board id')
        dispatch(push(`/display/${id}`))




    }




}