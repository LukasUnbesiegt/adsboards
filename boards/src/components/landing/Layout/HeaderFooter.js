import React, { Component, Fragment } from 'react'
import Navbar from '../../navigation/NavBar'
import Footer from '../Footer/Footer'




class HeaderFooter extends Component {




    render() {



        return (
            <Fragment>
                <Navbar />
                {this.props.children}
                <Footer />
            </Fragment>
        )
    }
}





export default HeaderFooter;