
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAdsRequested, redirectToChat , acceptRequest , rejectRequest  , searchAdsRequested} from '../../actions/boards/boards'
import { isEmpty } from '../../utils/isEmpty'
import moment from 'moment'


class index extends Component {



    state = {
        name: null
    }






    componentDidMount() {
        this.props.getAdsRequested(this.props.owner._id)
    }




    inputChangeHandler = (e) => {

        e.persist();
        console.log('in callback');
        console.log(e.target.value);

        this.setState(function (prevState, props) {
            console.log('in async callback');
            console.log({ isNull: e.target === null })

            console.log(e.target.value);

            return {
                name: e.target.value
            }
        })

    }

    renderSchedules = () => {

        const { requests } = this.props;
        console.log('requests', requests)

        if (requests && requests.schedules.length > 0) {

            return requests.schedules.map((schedule) => {
                let momentStart = moment(schedule.from).format('DD MM YYYY')
                let momentEnd = moment(schedule.to).format('DD MM YYYY')
                let requestDate = moment(schedule.createdAt).fromNow()

                let calcPrice = (price) => {

                    return moment(schedule.to).diff(moment(schedule.from), 'days') * price

                }

                return (
                    <div className="col-md-4">
                        <div class="card border-warning mb-3">
                            <div class="card-header border-warning">

                                Ads Name :    {schedule.advert.name || 'no ads name'}
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-secondary"
                                    onClick={() => {this.props.acceptRequest(schedule , this.props.owner)}}
                                    >
                                    
                                    Accept
                                    
                                    </button>
                                    <button type="button" class="btn btn-secondary"
                                    onClick={() => {this.props.rejectRequest(schedule , this.props.owner)}}
                                    >
                                    
                                    Reject
                                    
                                    </button>

                                </div>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Start :  <i className="far fa-calendar-alt"></i>  {momentStart}</li>
                                <li class="list-group-item">End :  <i className="far fa-calendar-alt"></i>  {momentEnd}</li>
                                <li class="list-group-item">Your Board :  {schedule.board.name || 'no name'}</li>
                                <li class="list-group-item">Advertiser :  {schedule.advertiser.company || 'no name'}</li>
                                <li class="list-group-item">Earning : $ {calcPrice(schedule.board.price.normal)}  </li>
                            </ul>

                            <div class="card-footer bg-transparent border-warbubg">
                                <button
                                    type="button"
                                    className="btn"
                                    style={{
                                        backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                        color: 'white'
                                    }}
                                    onClick={() => { this.props.redirectToChat(schedule) }}


                                >   <i className="far fa-comments"></i>Chat with Advertiser</button>
                            </div>
                            <div class="card-footer bg-transparent border-warning">Requested at {requestDate} ago.</div>
                        </div>

                    </div >

                )
            })

        } else {


            return (
                <div >No  Ads Requests for now.</div>
            )
        }




    }


    render() {



        return (
            <div className="container">
                <div className="text-center">
                    <h4 className="display-4">Your Own Boards with ads requests from advertisers</h4>
                    <p>Check ads requests from each board and decide to accept or reject</p>
                </div>
                <div className="row my-2 py-2">
                    <div className="col-md-10 col-sm-12 py-2">
                        <div className="form-group">
                            <div className="input-group mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="ni ni-zoom-split-in"></i></span>
                                </div>
                                <input
                                    className="form-control" placeholder="Search ads requests by name" type="text" name="name"
                                    onChange={this.inputChangeHandler}
                                />
                            </div>

                        </div>

                    </div>

                    <div className="col-md-2 col-sm-12  py-2">

                        <button
                            className="btn"
                            style={{
                                borderRadius: '10px',
                              
                                    backgroundImage: `radial-gradient(circle 248px at center, #F7AA97 0%, #F7AA97  47%, #F7AA97 100%)`,
                                    color: `#fff`
                               
                            }}
                            onClick={() => {
                                this.props.searchAdsRequested(this.props.owner._id , this.state.name)
                            }}

                        >
                            Search
                    </button>

                    </div>

                </div>
                <div className="card-deck row">



                    {this.renderSchedules()}

                </div>


            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    owner: !isEmpty(state.owner) ? state.owner.owner: null,
    requests: !isEmpty(state.board) ? state.board.requests : null 
})

const mapDispatchToProps = {
    getAdsRequested,
    redirectToChat ,
    acceptRequest ,
    rejectRequest ,
    searchAdsRequested
}


export default connect(mapStateToProps, mapDispatchToProps)(index);