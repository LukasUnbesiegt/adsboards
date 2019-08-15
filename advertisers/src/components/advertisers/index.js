
import React, { Component, Fragment } from 'react'
import { Nav, NavItem } from 'reactstrap';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Divider } from '@material-ui/core'
import Create from './create'

import Lists from './lists'
import { connect } from 'react-redux'








class index extends Component {

    componentDidMount() {

        this.props.getAdverts()

    }


    render() {
        return (
            <Fragment>

                <div className="container">
                    <h2 className="text-center display-3 my-2 py-2">Adverts Management</h2>

                    <Divider />
                    <div className="my-2 py-2">

                        <Nav pills>
                            <li className="nav-item  rounded-circle active">
                                <NavLink
                                    to="/adverts/create"
                                    className="nav-link"
                                    style={{
                                        backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                        color: 'white'
                                    }}
                                >
                                    Create Advert
                                </NavLink>
                            </li>

                            <li className="nav-item  rounded-circle active">
                                <NavLink
                                    to="/adverts"
                                    className="nav-link"
                                    style={{
                                        backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                        color: 'white'
                                    }}
                                >
                                    All Adverts
                                </NavLink>
                            </li>

                        </Nav>
                    </div>


                    <Switch>

                        <Route exact path="/adverts" component={Lists} getAdverts={this.props.getAdverts} />
                        <Route path="/adverts/create" component={Create} />


                    </Switch>


                </div>


            </Fragment>

        )
    }
}



export default index;