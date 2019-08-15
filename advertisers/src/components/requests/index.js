
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBoardsRequested, redirectChatRoom , searchBoardRequested } from '../../actions/boards'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { Link } from 'react-router-dom'
import moment from 'moment'
import {deleteRequest} from '../../actions/boards'


class index extends Component {

    state = {
        name: null
    }

    componentDidMount() {


        this.props.getBoardsRequested(this.props.advertiser)



        
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

                let calcPrice = (price) => {

                  return    moment(schedule.to).diff(moment(schedule.from), 'days') * price 

                }



                return (
                    <div className="col-md-4">

                        <div className="card border-light mb-3" style={{ maxWidth: '18rem' }}>
                            <div className="card-header">{schedule.board.name || 'no name'}</div>
                            <div className="card-body">
                            <h5 className="card-title">Status : {schedule.rejected ? 'rejected' : 'pending'}</h5>
                            <h5 className="card-title"> <i class="fas fa-dollar-sign"></i>   {calcPrice(schedule.board.price.normal)}</h5>
                                <h5 className="card-title">Start :  <i className="far fa-calendar-alt"></i>  {momentStart}</h5>
                                <h5 className="card-title">End :  <i className="far fa-calendar-alt"></i>  {momentEnd}</h5>
                                <h5 className="card-title">Your Ads :    {schedule.advert.name}</h5>
                                <p className="card-text">{schedule.advert.note}</p>
                            </div>
                            <div className="card-footer bg-transparent border-success">

                                <button className="btn" style={{
                                    borderRadius: '10px',
                                    backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                    color: 'white'
                                 
                                }}
                                onClick={()=> {
                                    
                                    this.props.redirectChatRoom(schedule)
                                
                                
                                }
                                }
                                > 
                                 <i className="far fa-comments"></i> Chat with Owner
                                
                                </button>
                            </div>
                            <div className="card-footer bg-transparent border-success">

<button className="btn" style={{
    borderRadius: '10px',
    backgroundImage: `radial-gradient(circle 248px at center, #DE7E73 0%, #DE7E73 47%, #DE7E73 100%)`,
    color: 'white'
                                     
}}
onClick={()=> {this.props.deleteRequest(schedule._id  , schedule.advertiser._id)}}
> 
 <i className="far fa-trash-alt"></i> Delete Request

</button>
</div>
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

        console.log('requestsIn', this.props.requests)







        return (
            <div className="container-fluid text-center">

                <div className="text-center">
                    <h4 className="display-4">Pending Ads Requested</h4>
                    <p>Accepted ads will be moved into <Link to="/schedules"> scheduled ads section </Link>. or chat with owner if you have questions for spot.</p>
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
                                backgroundImage: `radial-gradient(circle 248px at center, #F7AA97 0%, #F7AA97  47%, #F7AA97 100%)`,
                                color: `#fff`
                            }}
                            onClick={() => {
                                this.props.searchBoardRequested(this.props.advertiser , 1 , this.state.name)
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
    advertiser: state.profile ? state.profile.advertiser._id : null,
    requests: state.boards.requests || null
})

const mapDispatchToProps = {
    getBoardsRequested,
    redirectChatRoom , 
    deleteRequest , 
    searchBoardRequested , 
   
}




export default connect(mapStateToProps, mapDispatchToProps)(index);