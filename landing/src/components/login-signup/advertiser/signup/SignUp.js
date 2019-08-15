
import React, { Component } from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { signUpAdvertiser } from '../../../../actions/advertisers/advertisers'



class SignUp extends Component {





    submitHandler = (data) => {

        this.props.signUpAdvertiser(data)


    }



    render() {




        return (



            <div className="container my-2 py-2">
                <h4 className="text-center my-2 py-2">Sign Up Advertiser Account</h4>




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
    signUpAdvertiser
}



export default connect(mapStateToProps, mapDispatchToProps)(SignUp);