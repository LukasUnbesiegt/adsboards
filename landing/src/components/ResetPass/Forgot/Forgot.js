
import React, { Component } from 'react'
import Form from './Form/Form'
import { connect } from 'react-redux'
import { sendEmail } from '../../../actions/userActions'

class Forgot extends Component {


    state = {
        sent: false
    }
    submitHandler = (data) => {
        this.props.sendEmail(data, () => {
            this.setState({
                sent: true
            })
            localStorage.setItem('redirect', this.props.redirect)

        })
    }


    render() {






        return (
            <div>

                <Form
                    submitCallBack={this.submitHandler}
                    sent={this.state.sent}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    sendEmail
}


export default connect(mapStateToProps, mapDispatchToProps)(Forgot);