
import React, { Component } from 'react'
import moment from 'moment'
import styles from '../groupDate/index.module.css'
import { Link } from 'react-router-dom'




class index extends Component {






    renderAdvertLists = (schedules) => {



        return (

            <div className="row">



                {
                    schedules.map((schedule, index) => {







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
                                        <li class="list-group-item">    Start :   {moment(schedule.from).format('DD MM YYYY')}</li>
                                        <li class="list-group-item">End in : {moment(schedule.to).format('DD MM YYYY')}</li>
                                        <li class="list-group-item">

                                            <Link
                                                className="btn btn-dark "
                                                style={{
                                                    borderRadius: '10px',
                                                    // backgroundImage: `radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)`,

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
                }





            </div>

        )


    }




    renderAdvert = () => {

        const { schedules } = this.props;
        let toArr = [];

        if (schedules) {
            for (const prop in schedules) {


                toArr.push({ name: prop, arrTo: schedules[prop] })



            }


            return toArr.map((arr) => {


                return (
                    <div className="container">
                        <div className="my-3 py-3">

                            <span className={`${styles.dateSpan}`}>{arr.name}</span>
                        </div>


                        {this.renderAdvertLists(arr.arrTo)}
                    </div>
                )


            })







        } else {


            return (
                <div>
                    <h4>Loading please wait </h4>
                </div>
            )


        }








    }


    render() {












        return (

            <div className="container">

                <h4 className="text-center">By Board</h4>


                {this.renderAdvert()}
            </div>
        )
    }
}





export default index;