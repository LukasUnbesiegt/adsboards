
import React, { Component } from 'react'
import { resetPassword } from '../../../actions/userActions'
import Form from './Form/Form'
import { connect } from 'react-redux'

class ResetPass extends Component {


    state = {
        resetToken: ''
    }


    componentDidMount() {
        const resetToken = this.props.match.params.token;
        this.setState({ resetToken })
    }

    submitHandler = (data) => {

        this.props.resetPassword({ resetToken: this.state.resetToken, password: data.password }, () => {

        })

    }

    render() {



        return (
            <div className="container my-2 py-2 justify-contents-center"
                style={{
                    height: '100vh'
                }}
            >
                <h4 className="text-center">Change your new password</h4>

                <Form
                    submitCallBack={this.submitHandler}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    resetPassword
}


export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);