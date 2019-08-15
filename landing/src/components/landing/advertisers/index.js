import React, { Component, Fragment } from 'react'
import Navbar from '../../navigation/NavBar'
import styles from './advertisers.module.css'
import { Button, ButtonGroup } from 'reactstrap';
import { NavLink, Switch, Route } from 'react-router-dom'
import LoginForm from '../../login-signup/advertiser/login/Login'
import SignupForm from '../../login-signup/advertiser/signup/SignUp'
import Footer from '../Footer/Footer'


class index extends Component {






    render() {





        return (
            <Fragment>
                <Navbar
                    navbar={{
                        backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                        color: '#fff'
                    }}

                />
                <section className={`${styles.advertiserWrapper} section-lg`}>
                    <div>


                        <div className={`container text-center p-3`}>

                            <h4 className="display-3 text-center">Welcome advertisers</h4>
                            <p>Sign Up or Login into advertiser dashboard. you can search many digital boards offered by agencies. you can create ads images , videos and forms. start scheduling your ads displaying on boards now</p>
                            <ButtonGroup size="lg">
                                <Button
                                    className={`${styles.bgNav}`}
                                    style={{
                                        backgroundImage: `radial-gradient(circle 248px at center,#CFAA9E 0%, #CFAA9E  47%, #CFAA9E 100%)`,
                                        color: '#fff'
                                    }}
                                >
                                    <NavLink to="/advertiser/signup" style={{ color: '#fff' }}>SignUp</NavLink>

                                </Button>
                                <Button className={`${styles.bgNav}`} style={{
                                    backgroundImage: `radial-gradient(circle 248px at center, #CFAA9E 0%, #CFAA9E  47%, #CFAA9E 100%)`,
                                    color: '#fff'
                                }}>
                                    <NavLink to="/advertiser/login" style={{ color: '#fff' }}>Login</NavLink>

                                </Button>

                            </ButtonGroup>



                        </div>

                        <div className="">

                            <Switch>
                                <Route exact path="/advertiser/" component={SignupForm} />
                                <Route path="/advertiser/signup" component={SignupForm} />
                                <Route path="/advertiser/login" component={LoginForm} />
                            </Switch>


                        </div>

                    </div>


                </section>
                <Footer />
            </Fragment>



        )
    }
}



export default index;
