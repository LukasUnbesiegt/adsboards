
import React from 'react'
import { connect } from 'react-redux'




// import Modal Components you want in below arrays and use it from here

const modalArrays = [];


const mapState = (state) => ({
    currentModal: state.modal
})


const ModalManager = ({ currentModal }) => {

    let renderModal;

    if (currentModal) {
        const { modalType, modalProps } = currentModal;

        const ModalWeWant = modalArrays.find((modal) => {
            return modal.name = modalType
        })
        console.log(ModalWeWant);
        const ModalComponent = ModalWeWant.modal;

        renderModal = <ModalComponent {...modalProps} />;

    }




    return (
        <span>
            {renderModal}
        </span>

    )
}





export default connect(mapState)(ModalManager);