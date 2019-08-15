
import React, { Component, Fragment } from 'react'
import Authenticated from '../misc/auth/Authenticated'



class Home extends Component {




    render() {





        return (


            <Fragment>
                <h4>Welcome Company Name</h4>
                <p>this is where charts and stats will be shown in general</p>
            </Fragment>
        )
    }
}





export default Authenticated(Home)