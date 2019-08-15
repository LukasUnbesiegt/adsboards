
import React, { Component } from 'react'
import moment from 'moment'




class index extends Component {





    renderRequestList = () => {

        const { requests } = this.props

        console.log(requests)
        if (requests) {


            return requests.map((request) => {
                let momentFromDate = moment(request.from).format('DD MM YYYY')
                let momentToDate = moment(request.to).format('DD MM YYYY')
                let momentRequest = moment(request.requestAt).format('DD MM YYYY')
                return (
                    <div className="col-md-4 col-lg-4">
                        <div className="card bg-light mb-3" style={{ maxWidth: '18rem' }}>
                            <div className="card-header"> Ads :  {request.advert.name}</div>
                            <div className="card-body">
                                <h5 className="card-title">From :  {momentFromDate}</h5>
                                <h5 className="card-title">To :  {momentToDate} </h5>
                                <p className="card-text">{request.advert.note}</p>
                                <p className="card-text"> You requested since {momentRequest}</p>
                            </div>
                        </div>
                    </div>

                )
            })




        } else {


            return (
                <div>Loading Request Lists</div>
            )
        }


    }



    render() {









        console.log(this.props.requests)






        return (



            <div className="container my-2 py-2">

                <div className="row">
                    {this.renderRequestList()}

                </div>


            </div>
        )
    }
}


export default index;