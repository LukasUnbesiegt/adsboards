import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';



class index extends Component {








    render() {


        return (
            <div className="container">

                <StripeCheckout
                    token={this.props.onToken}
                    stripeKey="pk_test_0yB66l32DERu39byDb56CTHc"
                    allowRememberMe
                    name="SpotAds" // the pop-in header title
                    description="recharge credits for ads "
                    email="wafa@spotads.live"
                />


            </div>
        )
    }
}





export default index;