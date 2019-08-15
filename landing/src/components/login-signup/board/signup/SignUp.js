
import React, { Component } from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { signUpOwner } from '../../../../actions/boards/owners'



class SignUp extends Component {





    submitHandler = (data) => {


        this.props.signUpOwner(data, () => {
            this.props.changeBtn('right')
        })


    }



    render() {




        return (



            <div className="container my-2 py-2">
                <h4 className="text-center my-2 py-2">Sign Up  Owner  Account</h4>




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
    signUpOwner
}



export default connect(mapStateToProps, mapDispatchToProps)(SignUp);