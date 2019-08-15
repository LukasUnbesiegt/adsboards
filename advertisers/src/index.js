import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux'
import { configureStore } from './store'
import './index.css';
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'react-dates/lib/css/_datepicker.css';
import 'react-input-range/lib/css/index.css'
import { ConnectedRouter } from 'connected-react-router'


const store = configureStore().store;





ReactDOM.render(

        <Provider store={store} >
                <ConnectedRouter history={configureStore().history}>


                        <div>
                                <ReduxToastr
                                        position="bottom-right"
                                        transitionIn="fadeIn"
                                        transitionOut="fadeOut"
                                        timeOut={2000}

                                />
                                <Routes />

                        </div>




                </ConnectedRouter>

        </Provider>




        , document.getElementById('root'));



