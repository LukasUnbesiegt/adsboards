import React, { Component, Fragment } from 'react'
import { items, adminItems } from './navitems'
import styles from './Navbar.module.css';
import { connect } from 'react-redux'
import { NavLink as NavigationLink } from 'react-router-dom'

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


    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }



    render() {

        const styleObj = this.props.navbar || { background: 'transparent' }



        return (
            <Fragment>
                <div>
                    <Navbar style={styleObj} dark expand="md">
                        <NavbarBrand href="/" style={{ letterSpacing: '1px', color: '#fff', fontSize: '20px' }}>SpotAds</NavbarBrand>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>

                                <NavItem>
                                    <NavigationLink className={`${styles.navigationItem} nav-link`} to="/advertiser">Advertisers</NavigationLink>
                                </NavItem>
                                <NavItem>
                                    <NavigationLink className={`${styles.navigationItem} nav-link`} to="/board">Board Owners</NavigationLink>
                                </NavItem>

                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>

            </Fragment >
        )
    }
}


// const mapStateToProps = (state) => ({
//     user: state.user.userData
// })

const mapDispatchToProps = {

}



export default connect(null, mapDispatchToProps)(NavBar);