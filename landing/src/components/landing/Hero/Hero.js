import React, { Component } from 'react'
import styles from './Hero.module.css'
import { connect } from 'react-redux'
import bgVideo from './Piccadilly.mp4'
import Navbar from '../../navigation/NavBar'


class Hero extends Component {






    componentDidMount = () => {





    }



    renderHero = () => {



        return (
            <header className={styles.headerWrapper}>

                <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                    <source src={bgVideo} type="video/mp4" />>
                 </video>

                <div className={`${styles.container} h-100`}>

                    <Navbar />
                    <div className="d-flex h-50 text-center align-items-center">
                        <div className="w-100 text-white">


                            <h2 className="text-white display-2">SpotAds</h2>
                            <p>Put your ads in tons of display touch screen boards around the tunisia just in minutes</p>


                            {/* <button
                                className={`btn`}
                                style={{
                                    borderRadius: '10px',
                                    backgroundImage: `radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)`,
                                    color: 'white'
                                }}

                            >Why SpotAds?</button> */}


                        </div>
                    </div>
                </div>
                <div className={styles.overlayWrapper}>

                </div>
            </header>







        )




    }

    render() {

        return (
            this.renderHero()
        )
    }
}


const mapStateToProps = (state) => ({
    // locale: state.locale
})

const mapDispatchToProps = {

}


export default connect()(Hero);