
import React, { Component } from 'react'
import FormComp from './Form/Form'
import { connect } from 'react-redux'
import { getInvoices } from '../../../actions/boards/boards'
import Incomes from './incomes'

class index extends Component {


    componentDidMount() {

    }

    submitHandler = (data) => {

        this.props.editUser(data)

    }



    render() {

        let username, email;

        if (this.props.user) {
            username = this.props.user.username;
            email = this.props.user.email;
        }

        console.log(this.props.user)
        return (
            <div className="container">

                <h5 className="text-center display-4">User Account of Owner</h5>

                <div className="my-3 py-3">
                    <FormComp
                        submitCallBack={this.submitHandler}
                        initialValues={{ email, username }}

                    />

                </div>

                <h5 className="text-center display-4">Incomes from your boards</h5>

                <Incomes
                    invoices={this.props.owner.invoices}
                />


            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    owner: state.owner ? state.owner.owner : null
})



export default connect(mapStateToProps)(index);