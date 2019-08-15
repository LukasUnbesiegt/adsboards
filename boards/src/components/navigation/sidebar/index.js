
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { navitems } from './navitems'
import { NavLink } from 'react-router-dom'
import styles from './sidebar.module.css'
import { ListGroup, ListGroupItem } from 'reactstrap';
import Collapse from '../collapse/collapse'


class SideBar extends Component {











    render() {





        const renderNavItems = () => {


            const navItems = navitems.map((item, i) => {







                return (
                    <Fragment>

                        {
                            item.dropdowns ? <Collapse
                                i={i}
                                item={item}
                                sidebarlink={styles.sidebarlink}
                                changeStyle={this.props.changeStyle}

                            /> : (
                                    <li className="" key={i}>
                                        <NavLink className={`nav-link text-white p-3 mb-2  ${styles.sidebarlink} `}

                                            to={item.linkTo}
                                        >
                                            <i className={`fa ${item.icon} fa-lg`}></i>
                                            <span
                                                style={{
                                                    fontSize: '12px'
                                                }}
                                            >
                                                {
                                                    this.props.changeStyle ? '' : `${item.name}`
                                                }

                                                {item.dropdowns && !this.props.changeStyle && (<i className="ni ni-bold-down ml-2"></i>)}

                                            </span>

                                        </NavLink>

                                    </li>
                                )
                        }



                    </Fragment>



                )

            })

            return (
                <Fragment>
                    <ul className="navbar-nav mt-4">

                        {navItems}


                    </ul>




                </Fragment>



            )



        }






        return (
            <Fragment>




                {renderNavItems()}


            </Fragment>
        )
    }
}





export default SideBar;