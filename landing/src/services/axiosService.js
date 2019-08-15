import axios from 'axios';
import authService from './authService'
import { endpoint, prodEndpoint } from '../config'

const URL = process.env.NODE_ENV === 'development' ? `${endpoint}api/v1` : `${prodEndpoint}api/v1`


class AxiosService {


    axiosInstance = {}

    constructor() {
        this.initInstance()
    }


    initInstance() {


        this.axiosInstance = axios.create({

            baseURL: URL,
            withCredentials: 'include',

        })


        this.axiosInstance.interceptors.request.use(

            (config) => {
                // get token to set 'Authorization' header for send back to server
                const token = localStorage.getItem('auth_token')

                if (token) {

                    config.headers.Authorization = `${token}`
                }
                return config
            }
        )

        return this.axiosInstance;
    }

    getInstance() {

        return this.axiosInstance || this.initInstance()

    }


}





export default new AxiosService();