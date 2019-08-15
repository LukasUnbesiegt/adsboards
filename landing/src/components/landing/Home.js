import React, { Component, Fragment } from 'react'
import Hero from './Hero/Hero'
import NavBar from '../navigation/NavBar'
import Why from '../landing/Why/Why'
import How from '../landing/How/How'
import Footer from '../landing/Footer/Footer'
import MessengerCustomerChat from 'react-messenger-customer-chat';

class Home extends Component {



    render() {




        return (
            <Fragment>


                <Hero />
                <Why />
                <Footer />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'

                }}>
                    <p>Copyrights &copy; 2019 All Rights Reserved by SpotAds</p>
                </div>


                <MessengerCustomerChat
                    pageId="299309317646338"
                    appId="1157549924413462"
                    htmlRef=""
                />

            </Fragment>
        )
    }
}




export default Home;