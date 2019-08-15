
import React, { Component, Fragment } from 'react'
import { Nav, NavItem } from 'reactstrap';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Divider } from '@material-ui/core'
import Create from './create'
import All from './all'
import { connect } from 'react-redux'

import { getBoards, getOwner } from '../../actions/boards/boards'


class index extends Component {




    componentDidMount() {
        this.props.getBoards()
        this.props.getOwner()
    }


    render() {





        return (



            <Fragment>

                <div className="container-fluid">
                    <h2 className="text-center display-3 my-2 py-2">Boards Management</h2>

                    <Divider />
                    <div className="my-2 py-2">

                        <Nav pills>
                            <li className="nav-item"

                            >
                                <NavLink
                                    to="/spots/"
                                    className="nav-link"
                                    style={{
                                        backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                        color: 'white'
                                    }}

                                >
                                    All Boards
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/spots/create"
                                    className="nav-link"
                                    style={{
                                        backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                        color: 'white'
                                    }}
                                >
                                    Create Board
                                </NavLink>
                            </li>

                        </Nav>
                    </div>


                    <Switch>

                        <Route exact path="/spots" component={All} />
                        <Route path="/spots/create" component={Create} />


                    </Switch>


                </div>


            </Fragment>
        )
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    getBoards,
    getOwner
}

export default connect(null, mapDispatchToProps)(index);