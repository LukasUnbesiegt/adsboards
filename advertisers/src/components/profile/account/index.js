
import React, { Component } from 'react'
import FormComp from './Form/Form'
import { connect } from 'react-redux'
import StripeCheckOut from '../payment'
import { TabContent, TabPane, Nav, Card, Button, CardTitle, CardText, NavItem, NavLink, } from 'reactstrap';
import { stripeCheckOut } from '../../../actions/advertisers/advert'

class index extends Component {

    state = {

        activeTab: '1',
        amount: 0
    }

    submitHandler = (data) => {

        this.props.editUser(data)



    }

    componentWillUnmount() {
        this.setState({
            amount: 0
        })
    }




    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }



    inputChangeHandler = (e) => {

        e.persist();
        console.log('in callback');
        console.log(e.target.value);

        this.setState(function (prevState, props) {
            console.log('in async callback');
            console.log({ isNull: e.target === null })

            console.log(e.target.value);

            return {
                amount: e.target.value
            }
        })

    }

    onToken = (token) => {
        const fromEuroToCent = amount => amount * 100;
        this.props.stripeCheckOut({
            amount: fromEuroToCent(this.state.amount),
            description: 'recharge credits',
            source: token.id,
            currency: 'USD',
            advertiserId: this.props.advertiser
        })

    }


    render() {

        let username, email;

        if (this.props.user) {
            username = this.props.user.username;
            email = this.props.user.email;
        }


        console.log(this.props.advertiser)
        return (
            <div className="container">

                <h5 className="text-center display-4">User Account</h5>

                <div className="my-3 py-3">
                    <FormComp
                        submitCallBack={this.submitHandler}
                        initialValues={{ email, username }}

                    />

                </div>


                <div className="my-3 py-3">

                    <h4 className="text-center display-4 my-2 py-2">Top Up your credits here</h4>



                    <div className="form-group my-2 py-2">
                        <div className="input-group mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-hand-holding-usd"></i></span>
                            </div>
                            <input
                                className="form-control" placeholder="enter your credit amount u want to add" type="number" name="amount"
                                onChange={this.inputChangeHandler}
                            />
                        </div>

                    </div>

                </div>

                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={`${this.state.activeTab === '1' && 'active'}`}
                                onClick={() => { this.toggle('1'); }}
                            >
                                <i class="far fa-credit-card"></i>  credit cards
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="my-4 py-4">
                                <StripeCheckOut
                                    onToken={this.onToken}
                                />

                            </div>
                        </TabPane>

                    </TabContent>
                </div>


            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    advertiser: state.user.userData.isAuth ? state.user.userData.advertiser._id : null,
})

const mapDispatchToProps = {
    stripeCheckOut
}

export default connect(mapStateToProps, mapDispatchToProps)(index);