
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../../actions/userActions';
import { withRouter } from 'react-router-dom'
import Loading from '../Loading/LoadingComponent'


// REACT COMPONENT WHICH WILL WRAP other components when app needs userdata and authentication
export default function (ComposedClass, reload, adminRoute = null) {


    class AuthenticationCheck extends Component {


        componentDidMount() {

            // calling auth action ( redux action ) when component did mount 
            this.props.auth(this.props.history, reload, adminRoute);


        }
        render() {

            // loading is true when we are calling api 
            if (!this.props.async.loading) {

                // returning Component with props data we need ( props are user data and browser object in our case )
                return (
                    <ComposedClass {...this.props} user={this.props.user.userData} browser={this.props.browser} />
                );
            } else {

                return (
                    <Loading />
                )
            }

        }
    }


    const mapStateToProps = (state) => ({
        user: state.user,
        async: state.async,
        browser: state.browser,
        site: state.site
    })

    const mapDispatchToProps = {
        auth
    }




    return connect(mapStateToProps, mapDispatchToProps)(AuthenticationCheck)
}

