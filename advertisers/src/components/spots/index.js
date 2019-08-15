import React, { Component, Fragment } from 'react'
import { Nav, NavItem } from 'reactstrap';
import { NavLink, Switch, Route } from 'react-router-dom'

import Find from './find'
import Favorite from './favorite'
import { Divider } from '@material-ui/core'
import { connect } from 'react-redux'






class index extends Component {




    render() {

        return (
            <Fragment>

                <div className="container-fluid">

                    {/* <div className="mb-5 py-2 d-flex justify-content-center">

                        <Nav pills className="nav-pills-circle">
                            <li className="nav-item">
                                <NavLink
                                    to="/spots/"
                                    className="nav-link"
                                >
                                    <span className="nav-link-icon d-block"><i className="ni ni-zoom-split-in"></i></span> Search
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/spots/favorites"
                                    className="nav-link"
                                >
                                    <span className="nav-link-icon d-block"><i className="ni ni-favourite-28"></i></span> Favorites
                                </NavLink>
                            </li>

                        </Nav>
                    </div> */}


                    <Switch>

                        <Route exact path="/spots" component={Find} />
                        <Route path="/spots/favorite" component={Favorite} />

                    </Switch>


                </div>


            </Fragment>
        )
    }
}



export default connect()(index);