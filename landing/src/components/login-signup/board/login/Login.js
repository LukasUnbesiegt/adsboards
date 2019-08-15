import React, { Component } from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { signInOwner } from '../../../../actions/boards/owners'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, ButtonGroup, Badge, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Forgot from '../../../ResetPass/Forgot/Forgot'
const REDIRECT_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3002/spots' : 'https://owner.spotads.live/spots'


class Login extends Component {

    constructor(props) {
        super(props);
        this.receiver = React.createRef();
        this.state = {
            modal: false
        }
    }


    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    submitHandler = (data) => {

        this.props.signInOwner(data, (token) => {

            this.receiver.current.contentWindow.postMessage(token, REDIRECT_URL);
            window.location.assign(REDIRECT_URL);
        })


    }
    renderForgotPass = () => {

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Send Reset Code to your Email</ModalHeader>
                    <ModalBody>
                        <Forgot
                            redirect="owner"
                        />
                    </ModalBody>
                    <ModalFooter>

                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>


            </div>
        )

    }


    render() {




        return (



            <div className="container my-2 py-2">
                <h4 className="text-center my-2 py-2">Sign In  Owner Account</h4>




                <Form
                    submitCallBack={this.submitHandler}
                    errorsServer={this.props.errors.errors ? this.props.errors.errors : {}}
                    toggle={this.toggle}
                />
                {this.renderForgotPass()}
                <iframe src={REDIRECT_URL} width="500" height="200" style={{ display: 'none' }} ref={this.receiver}>
                    <p>Your browser does not support iframes.</p>
                </iframe>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    errors: state.errors
})

const mapDispatchToProps = {
    signInOwner
}



export default connect(mapStateToProps, mapDispatchToProps)(Login);