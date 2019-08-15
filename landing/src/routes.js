
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Home from './components/landing/Home'
import Authenticated from './components/misc/auth/Authenticated'
import AdminRoutes from './components/private/AdminRoutes'
import ModalManager from './components/misc/modalManager/modalManager';
import NotFound from './components/NotFound'
import { trackGoogleAnalytics } from './services/ga/ga'
import Advertiser from './components/landing/advertisers/index'
import Board from './components/landing/boards/index'
import Locations from './components/landing/location/index'
import SpotDisplay from './components/SpotDisplay/Display'
import Lock from './components/landing/Lock'
import Reset from './components/ResetPass/Pass/ResetPass'

class Routes extends React.Component {





  componentDidMount = () => {
    window.ga('create', '', 'auto');


  }




  render() {


    trackGoogleAnalytics(this.props.location)



    return (

      <div>

        <ModalManager />
        <Switch>
          <Route exact component={Home} path="/" />
          <Route component={Advertiser} path="/advertiser" />
          <Route component={Board} path="/board" />
          <Route component={Locations} path="/location" />
          <Route component={SpotDisplay} path="/display/:boardId" />
          <Route component={Lock} path="/lock" />
          <Route component={Reset} path="/reset_password/:token" />
          <AdminRoutes />
          <Route path="*" component={NotFound} />
        </Switch>

        <MessengerCustomerChat
          pageId="836186800088732"
          appId="1349261215239476"
          htmlRef=""
        />
      </div >




    )

  }


}




export default withRouter(Routes);

