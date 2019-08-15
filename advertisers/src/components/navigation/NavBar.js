import React, { Component, Fragment } from 'react'
import { items, adminItems } from './navitems'
import styles from './Navbar.module.css';
import { connect } from 'react-redux'
import { setLocale } from '../../actions/localeActions'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';


class NavBar extends Component {








    render() {







        return (
            <Fragment>
                <div>
                    <h3>Navbar</h3>
                </div>

            </Fragment >
        )
    }
}


// const mapStateToProps = (state) => ({
//     user: state.user.userData
// })

const mapDispatchToProps = {
    setLocale

}



export default connect(null, mapDispatchToProps)(NavBar);