import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer'
import errors from './errorsReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'
import localeReducer from './localeReducer'
import { responsiveStateReducer } from 'redux-responsive'
import asyncReducer from './asyncReducer';
import modalReducer from '../components/misc/modalManager/modalReducer'
import errorsReducer from './errorsReducer';
import { connectRouter } from 'connected-react-router'
import advertsReducer from './advertsReducer'
import advertiserReducer from './advertiserReducer'
import boardsReducer from './boardsReducer'
import schedulesReducer from './schedulesReducer'


export const reducers = (history) => combineReducers({
        router: connectRouter(history),
        form: formReducer,
        user: userReducer,
        async: asyncReducer,
        modal: modalReducer,
        errors: errorsReducer,
        browser: responsiveStateReducer,
        toastr: toastrReducer,
        adverts: advertsReducer,
        profile: advertiserReducer,
        boards: boardsReducer,
        schedules: schedulesReducer
})
