
import React, { Component, Fragment } from 'react'
import Navbar from '../../navigation/NavBar'
import Footer from '../Footer/Footer'




class index extends Component {






    render() {


        return (



            <Fragment>
                <Navbar navbar={{ backgroundImage: `linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)` }} />
                <div>
                    <h4>Boards Locations Coming soon</h4>
                </div>
                <Footer />
            </Fragment>



        )
    }
}





export default index;