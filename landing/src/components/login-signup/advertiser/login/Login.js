
import React, { Component } from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { loginAdvertiser } from '../../../../actions/advertisers/advertisers'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, ButtonGroup, Badge, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Forgot from '../../../ResetPass/Forgot/Forgot'

const REDIRECT_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3003/adverts' : 'https://advertiser.spotads.live/adverts'


class Login extends Component {


    constructor(props) {
        super(props);
        this.receiver2 = React.createRef();
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

        this.props.loginAdvertiser(data, (token) => {

            var receiver = this.receiver2.current.contentWindow
            console.log(token)

            this.receiver2.current.contentWindow.postMessage(token, REDIRECT_URL);
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
                            redirect="advertiser"
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

                <h4 className="text-center my-2 py-2">Login your account</h4>

                <Form
                    submitCallBack={this.submitHandler}
                    errorsServer={this.props.errors.errors ? this.props.errors.errors : {}}
                    toggle={this.toggle}
                />
                {this.renderForgotPass()}
                <iframe src={REDIRECT_URL} width="500" height="200" style={{ display: 'none' }} ref={this.receiver2}>
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
    loginAdvertiser
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);