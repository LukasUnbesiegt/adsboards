import React from 'react'
import HateImg from '../../static/block.svg'
import styles from './Why.module.css'





function Why() {




    return (




        <section
            className="section-lg"
            style={{

            }}
        >

            <div className="container">


                <div className="row">

                    <div className="col-lg-6 col-md-6">

                        <h3 className="display-3">People Hate Forced Ads on their devices</h3>
                        <p>
                            It is pretty annoying when we see forced ads appearing in our personal life .  <strong>SpotAds</strong> are just display touch screen boards where
                            will be near you and not bothering you or forced but get attracted to you.
                            <br />
                            <strong>SpotAds</strong>  is like airbnb for advertisers and marketing agencies (display boards owners). Our App will help advertisers for finding spots ( display boards) and help agencies for getting clients.
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className={`${styles.imgWrapper} floating`}>

                            <img src={HateImg} className="img-fluid" />
                        </div>

                    </div>




                </div>

            </div>


        </section>
    )
}



export default Why;