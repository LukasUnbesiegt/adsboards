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
import { logoutUser, auth } from './actions/userActions'
import { connect } from 'react-redux'
import { getBoards, getOwner, editUser, getAdsRequested } from './actions/boards/boards'
import LoadingComponent from './components/misc/Loading/LoadingComponent'
import Home from './components/landing/Home'
import Spots from './components/spots'
import Requests from './components/ads'
import Profile from './components/profile/company/index'
import Account from './components/profile/account'
import Chats from './components/ads/chat'
import Schedules from './components/schedules'
import { isEmpty } from './utils/isEmpty'


class Routes extends React.Component {



  state = {
    dropdownOpen: false,
    direction: false,
    changeStyle: false
  }


  componentDidMount = () => {
    window.ga('create', '', 'auto');
    this.props.auth()
    this.props.getBoards()
    this.props.getOwner()




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
    )
  }


  renderMainContents = () => {
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
                  >

                    {
                      this.props.owner ? this.props.owner.company : 'no company name'
                    }
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
                  <Route exact path="/" render={(props) => (<Home />)} />
                  <Route path="/spots" render={(props) => (<Spots />)} />
                  <Route path="/ads" render={(props) => (<Requests />)} />
                  <Route path="/profile" render={(props) => (<Profile />)} />
                  <Route path="/chat" render={(props) => (<Chats />)} />
                  <Route path="/schedules" render={(props) => (<Schedules />)} />
                  <Route path="/account" render={(props) => (<Account user={this.props.user} editUser={this.props.editUser} />)} />


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
      </Fragment>
    )

  }

  renderUnAuthenticated = () => {

    return (
      <div

      >
        <LoadingComponent />

      </div>
    )

  }

  render() {



    trackGoogleAnalytics(this.props.location)



    return this.props.isAuth && this.props.isAuth ? this.renderMainContents() : this.renderUnAuthenticated()

  }


}

const mapStateToProps = (state) => ({
  isAuth: state.user.userData ? state.user.userData.isAuth : null,
  user: (state.user.userData && state.user.userData.isAuth) ? state.user.userData.owner.user : null,
  owner: (state.user.userData && state.user.userData.isAuth) ? state.user.userData.owner : null,

})

const mapDispatchToProps = {
  logoutUser,
  auth,
  getBoards, getOwner,
  editUser,

}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));