import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';

import styles from './Footer.module.css'


function Footer() {





    return (




        <footer
            className={`section-lg ${styles.footerWrapper}`}
        >

            <div className="container">


                <div className="row">

                    <div className="col-lg-6 col-md-6">
                        <h4 className="text-white">SpotAds</h4>
                        <p className="text-white">We want to change or promote non-invasive display advertising industry with digitalized product.</p>

                    </div>
                    <div className="col-lg-6 col-md-6">


                        <Nav vertical className="float-right">
                            <NavItem >
                                <NavLink className={`${styles.linkItem}`} href="#">Contact</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={`${styles.linkItem}`} href="#">About SpotAds</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={`${styles.linkItem}`} href="#">Future Plans</NavLink>
                            </NavItem>

                        </Nav>
                    </div>


                </div>



            </div>


        </footer>

    )
}



export default Footer;