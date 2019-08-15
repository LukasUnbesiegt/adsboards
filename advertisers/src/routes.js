
import React, { Component, Fragment } from 'react'
import { Switch, Route, NavLink, Link, withRouter } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import styles from './routes.module.css'
import Authenticated from './components/misc/auth/Authenticated'
import ModalManager from './components/misc/modalManager/modalManager';
import NotFound from './components/NotFound'
import { trackGoogleAnalytics } from './services/ga/ga'
import SideBar from './components/navigation/sidebar/index'
import { connect } from 'react-redux'
import { isEmpty } from './utils/isEmpty'
import { logoutUser, auth } from './actions/userActions'
import { getAdverts, getAdvertiser, editUser } from './actions/advertisers/advert'
import SingleSpot from './components/SingleSpot/SingleSpot'

import Home from './components/home/Home'
import Adverts from './components/advertisers/index'
import Spots from './components/spots/index'
import Payment from './components/profile/payment'
import Account from './components/profile/account'
import Company from './components/profile/company'
import Contact from './components/contact'
import Requests from './components/requests'
import SingleBoardWithRQs from './components/boardRequest'
import Schedules from './components/schedules'
import SingleSchedule from './components/singleSchedule'
import LoadingComponent from './components/misc/Loading/LoadingComponent'


class Routes extends React.Component {



  state = {
    dropdownOpen: false,
    direction: false,
    changeStyle: false
  }


  componentDidMount = () => {


    this.props.getAdverts()
    this.props.getAdvertiser()
    this.props.auth()
    window.ga('create', '', 'auto');






  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onMouseEnter = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onMouseLeave = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  changeWidth = () => {
    this.setState(prevState => ({
      changeStyle: !prevState.changeStyle
    }));
  }
  changeDirection = () => {
    this.setState(prevState => ({
      direction: !prevState.direction
    }));
  }


  logoutUser = () => {
    this.props.logoutUser()
  }


  renderSettingBar = () => {

    return (
      <Fragment>

        <Dropdown isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          onMouseEnter={
            () => {
              setTimeout(() => {
                this.onMouseEnter()
              }, 200);
            }
          }
          onMouseLeave={this.onMouseLeave} >
          <DropdownToggle nav>
            <a className="nav-link nav-link-icon " href="#" id="navbar-default_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              <i className="ni ni-circle-08" style={{ fontSize: '36px', color: 'white', }}></i>
              <span className="nav-link-inner--text d-lg-none">Advertiser</span>
            </a>
          </DropdownToggle>

          <DropdownMenu>


            <DropdownItem>
              <button
                className="dropdown-item"
                onClick={this.logoutUser}
              >LogOut</button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Fragment>
    )
  }

  renderUnAuthenticated = () => {

    return (
      <div
      // style={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   height: '100vh'
      // }}
      >
        <LoadingComponent />
        {/* <h4 className="display-4">YOU ARE UNAUTHENTICATED ! please Sign In from <a href="http://localhost:3001/advertiser">Landing Page</a></h4> */}
      </div>
    )

  }

  renderMainContent = () => {

    let sidebarWidth = '2';
    let topbarWidth = '10'
    let iconDirection = 'left'

    if (this.state.changeStyle) {
      sidebarWidth = '1';
      topbarWidth = '11'
    }

    if (this.state.direction) {
      iconDirection = 'right'
    }

    return (

      <Fragment>

        <nav className="navbar">
          <div className="container-fluid">
            <div className="row">
              <div className={` col-xl-${sidebarWidth} ${styles.sidebar} fixed-top`}>
                <SideBar
                  changeStyle={this.state.changeStyle}

                />
              </div>

              <div className={`col-xl-${topbarWidth} col-lg-11  ml-auto  fixed-top`}
                style={{

                  backgroundImage: `radial-gradient(circle 248px at center, #9B8281 0%, #9B8281  47%, #9B8281 100%)`
                }}

              >

                <div className="d-flex">
                  <div className="mr-auto p-3 ">
                    <a
                      style={{ color: '#fff', cursor: 'pointer' }}
                      onClick={
                        () => {
                          this.changeWidth()
                          this.changeDirection()

                        }
                      }
                    >
                      <i className={` ni ni-bold-${iconDirection}`} style={{ fontSize: '25px' }}></i>
                    </a>

                  </div>
                  <span
                    className="p-3"
                    style={{
                      color: '#fff'
                    }}
                  >credits : $ {this.props.profile ? (this.props.profile.payment.credit) : 0}

                  </span>

                  <Link className="p-3"
                    to="/account"> Top Up Credits</Link>
                  <span
                    className="p-3"
                    style={{
                      color: '#fff'
                    }}
                  >{this.props.profile ? this.props.profile.company : 'no name'}

                  </span>

                  {this.renderSettingBar()}


                </div>
              </div>
            </div>

          </div>
        </nav>

        <ModalManager />

        <section className="py-4 my-4">

          <div className="container-fluid">
            <div className="row">

              <div className={`col-xl-${topbarWidth} col-lg-10 ml-auto`}>
                <Switch>
                  <Route exact path="/" render={(props) => (<Adverts getAdverts={this.props.getAdverts} />)} />
                  <Route path="/adverts" render={(props) => (<Adverts getAdverts={this.props.getAdverts} />)} />
                  <Route path="/spots" render={(props) => (<Spots />)} />
                  <Route path="/profile" render={(props) => (<Company />)} />
                  <Route path="/contact" render={(props) => (<Contact />)} />
                  <Route path="/schedules" render={(props) => (<Schedules />)} />
                  <Route path="/requests" render={(props) => (<Requests />)} />
                  <Route path="/account" render={(props) => (<Account user={this.props.user} editUser={this.props.editUser} />)} />
                  <Route path="/single" render={(props) => (<SingleSpot />)} />
                  <Route path="/schedule/:id" render={(props) => (<SingleSchedule />)} />
                  <Route path="/singleboard" render={(props) => (<SingleBoardWithRQs />)} />
                </Switch>
                <MessengerCustomerChat
                  pageId="836186800088732"
                  appId="1349261215239476"
                  htmlRef=""
                />
              </div>

            </div>

          </div>


        </section>



      </Fragment >

    )
  }



  render() {


    trackGoogleAnalytics(this.props.location)



    return this.props.isAuth && this.props.isAuth ? this.renderMainContent() : this.renderUnAuthenticated()

  }


}

const mapStateToProps = (state) => ({

  advertiser: state.user.isAuth ? state.user.userData.advertiser._id : null,
  user: (state.user.userData && state.user.userData.isAuth) ? state.user.userData.advertiser.user : null,
  isAuth: state.user.userData ? state.user.userData.isAuth : null,
  profile: !isEmpty(state.profile) ? state.profile.advertiser : null

})

const mapDispatchToProps = {
  logoutUser,
  getAdverts,
  getAdvertiser,
  editUser,
  auth
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));


