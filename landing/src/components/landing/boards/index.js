
import React, { Component, Fragment } from 'react'
import Navbar from '../../navigation/NavBar'
import Footer from '../Footer/Footer'
import LoginSignUp from '../../login-signup/board/Login-Signup'



class index extends Component {



    render() {









        return (



            <Fragment>
                <Navbar navbar={{
                    backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                    color: '#fff'
                }} />
                <div>

                    <LoginSignUp />
                </div>
                <Footer />
            </Fragment>



        )
    }
}





export default index;