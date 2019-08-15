import {MODAL_OPEN , MODAL_CLOSE} from './modalConstants'

const initialState = null ;

export default (state = initialState, action) => {
  
  
  
    switch (action.type) {

    case MODAL_OPEN:
        const {modalType , modalProps} = action.payload;
            return {modalType , modalProps}
                break;

    case MODAL_CLOSE :
            return null 
                 break;


  default:
    return state
  }
}
