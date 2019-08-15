import React, { Component } from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import moment from 'moment'

const settings = {


    speed: 1500,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    dots: true,


    responsive: [

        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};



class index extends Component {





    renderTodayAds = () => {


        const { todaySchedules } = this.props;



        if (todaySchedules && todaySchedules.length > 0) {



            return todaySchedules.map((schedule, index) => {







                return (
                    <div className="col-md-4 my-2 py-2">

                        <div className="card">
                            <div class="card-header text-center">

                                {schedule.advert.name}
                            </div>

                            <div className="card-body">
                                <div className="card-title">

                                    info :  {schedule.advert.note}

                                </div>


                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">      Board :   {schedule.board.name}</li>
                                <li class="list-group-item">End in : {moment(schedule.to).format('DD MM YYYY')}</li>
                                <li class="list-group-item">Advertiser : {schedule.advertiser.company}</li>
                                <li class="list-group-item">

                                    <Link
                                        className="btn  btn-dark"
                                        style={{
                                            borderRadius: '10px',

                                            color: '#fff'
                                        }}
                                        to={`/schedule/${schedule._id}`}
                                    >

                                        Check Stats of ads
    </Link>
                                </li>
                            </ul>



                        </div>

                    </div>

                )
            })



        } else {


            return (
                <div className="container">


                    <p className="text-center">No Running Ads Today. <Link to="/spots">Request some ads</Link> </p>




                </div>
            )



        }




    }






    render() {







        return (




            <div className="container">


                <h5 className="display-4 text-center">Today Running Ads  | {moment(Date.now()).format('DD MM YYYY')}</h5>

                {this.renderTodayAds()}
            </div>
        )
    }
}




export default index;