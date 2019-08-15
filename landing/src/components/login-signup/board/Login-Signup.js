
import React, { Component, Fragment } from 'react'
import styles from './Login-Signup.module.css'
import SignUp from './signup/SignUp'
import Login from './login/Login'


const url = {
    left: `https://images.unsplash.com/photo-1518103744022-a2121047f429?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`,
    right: `https://images.unsplash.com/photo-1550755123-3dd7994ff17e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`
}

class LoginSignup extends Component {



    state = {

        panel: 'left'
    }


    changeBtn = (btnVar) => {
        this.setState({
            panel: btnVar
        })
    }

    renderContents = () => {


        return (
            <Fragment>
                <div
                    className={`${styles.contentsWrapper}`}
                >

                    <h5 className="text-white display-4">Board Owners</h5>

                    <p className="text-white">
                        {
                            this.state.panel === 'left' ? 'Already have Owner Account ? LogIn and check who are booking your board ( spot ) '
                                : 'Do you own any display boards ( spots ) in your place ? please join us and get ads from thousands of advertisers online '
                        }


                    </p>

                    <button
                        className="btn  btn-block"
                        style={{
                            backgroundImage: `radial-gradient(circle 248px at center, #CFAA9E 0%, #CFAA9E  47%, #CFAA9E 100%)`,
                            color: '#fff'
                        }}
                        onClick={
                            () => {

                                let btnVar = this.state.panel === 'left' ? 'right' : 'left'
                                this.changeBtn(btnVar)
                            }
                        }

                    >
                        {
                            this.state.panel === 'left' ? 'Sign In' : 'Sign Up'
                        }
                    </button>

                </div>


            </Fragment>

        )



    }




    render() {


        return (




            <div className={`${styles.container}  container my-5 py-5`} >

                <div className={`${styles.formContainer} ${styles.leftContainer}  `}>

                    {
                        this.state.panel === 'left' ? <SignUp changeBtn={this.changeBtn} /> : <Login />
                    }

                </div>

                <div
                    className={`${styles.formContainer}  ${styles.rightContainer}`}

                    style={{
                        backgroundImage: `url(${url[this.state.panel]})`,
                        opacity: '1',
                        color: 'white'
                    }}
                >

                    <div className={`${styles.overlayWrapper}`}>
                        {this.renderContents()}
                    </div>
                </div>


            </div>




        )
    }
}






export default LoginSignup;