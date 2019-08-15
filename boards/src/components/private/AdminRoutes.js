import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import DashBoard from './dashboard/DashBoard'
import Authenticated from '../misc/auth/Authenticated'





class AdminRoutes extends Component {









  render() {





    return (


      <Fragment>
        <Switch>
          <Route exact component={DashBoard} path="/admin" />

        </Switch>
      </Fragment>
    )





  }
}





// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }



export default connect()(AdminRoutes);