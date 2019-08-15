
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookNow from './BookNow'
import Slider from "react-slick";
import GoogleMapReact from 'google-map-react';
import { requestSpot , giveRating } from '../../actions/boards'
import moment from 'moment'
import StarRatingComponent from 'react-star-rating-component';
import {getTotal , getAverage} from '../../utils/rating'



const AnyReactComponent = ({ text }) => <div>
    <i className="ni ni-pin-3"
        style={{
            color: 'red',
            fontSize: '20px'
        }}
    ></i>
</div>;

const settings = {


    speed: 1500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,


    responsive: [

        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2
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


class SingleSpot extends Component {




    componentDidMount() {
        window.scrollTo(0, 0)
    }


    state = {

        startDate: null,
        endDate: null,
        advertId: null,
        calendarFocused: null,
        rating: 1
    }

    
    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ rating: nextValue });
    }
    dateChange = (startDate, endDate) => {

        this.setState({
            startDate,
            endDate
        })

    }


    giveRating = () => {

            this.props.giveRating(this.props.board.board._id , this.state.rating)

    }
    submitHandler = () => {

        this.props.requestSpot({
            startDate: moment(this.state.startDate).toDate(),
            endDate: moment(this.state.endDate).toDate(),
            advertId: this.state.advertId,
            advertiserId: this.props.advertiser._id,
            boardId: this.props.board.board._id,
            ownerId: this.props.board.board.owner
        })

    }

    onAdvertIdChange = (value) => {

        this.setState({
            advertId: value
        })

    }

    calendarFocusedChange = (calendarFocused) => {
        this.setState({
            calendarFocused
        })
    }


    renderNormalDetails = () => {

    }


    renderPhotos = () => {

        const sampleImages = [
            {
                url : 'https://via.placeholder.com/500'

             
            } ,
            {
                url : 'https://via.placeholder.com/500'

             
            },
            {
                url : 'https://via.placeholder.com/500'

             
            },
            {
                url : 'https://via.placeholder.com/500'

             
            }
        ]

        if (this.props.board && this.props.board.board.photos.length > 0) {

            return this.props.board.board.photos.map((photo) => {

                return (<img src={photo.url} className="img-fluid" />)

            })
        } else {
            return  sampleImages.map((photo) => {

                return (<img src={photo.url} className="img-fluid" />)

            })
        }

    }


    renderTargetAudiences = () => {


        if (this.props.board.board.targets && this.props.board.board.targets.length > 0) {

            return this.props.board.board.targets.map((target) => {

                return (<span className="mx-3 px-3" style={{ backgroundColor: 'blue', color: 'white' }}>
                    {target} {' '}
                </span>)
            })

        } else {
            return <span>No Target Audience Group</span>
        }


    }



    renderSingleSpot = () => {
        let adverts;
        if (this.props.adverts) {

            adverts = this.props.adverts.adverts.map((advert) => {
                return {
                    key: advert.name,
                    value: advert._id
                }
            })


        }
        if (this.props.board) {

            const { board } = this.props;
            const createMarkup = () => { return { __html: board.board.description || '<p>no descriptions</p>' }; }
            let averageRating = 0;
            
    if (board.board.rating.length > 0) {

        const oneTotal = getTotal(board.board.rating, 1)
        const twoTotal = getTotal(board.board.rating, 2)
        const threeTotal = getTotal(board.board.rating, 3)
        const fourTotal = getTotal(board.board.rating, 4)
        const fiveTotal = getTotal(board.board.rating, 5)

        averageRating = getAverage([oneTotal, twoTotal, threeTotal, fourTotal, fiveTotal])


    }
            return (
                <div className="container-fluid my-3 py-3 ">
                    <div className="mx-2 px-2">

                        <h5 className="text-center display-3">
                        
                        {this.props.board.board.name} 

                     

                        
                        </h5>

                        {!this.props.board.board.sale ? 
                            (
                            <span
                            style={{
                                backgroundColor : 'red' ,
                                fontSize : '15px' ,
                                padding : '10px' ,
                                color : '#fff'
                            }}
                            >SALE</span>) : 
                            ''}

                    </div>
                  
                    <div className="my-3 py-3">

                        <BookNow
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            calendarFocused={this.state.calendarFocused}
                            calendarFocusedChange={this.calendarFocusedChange}
                            dateChange={this.dateChange}
                            board={this.props.board}
                            onChange={this.onAdvertIdChange}
                            options={adverts || []}
                            value={this.state.advertId}
                            submitHandler={this.submitHandler}
                            credits={(this.props.advertiser.payment.credit / 100) || 0}
                            days={this.props.days}

                        />


                    </div>

                    <div className="d-flex flex-start ">
                        <div className="mx-3 px-3">

                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={this.state.rating}
                                onStarClick={this.onStarClick}
                            />

                        </div>
                        <div className="mx-3 px-3">

                            <button
                                className="btn"
                                style={{
                                    borderRadius: '10px',
                                    backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                    color: '#fff'
                                }}
                                onClick={this.giveRating}
                            >
                                Give Rating
                            </button>
                        </div>
                    </div>
                    <div className="row my-3 py-3">

                        <div className="col-md-6 ">

                            <ul className="list-group">
                            <li className="list-group-item">rating :       <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={averageRating}
                                editing={false}
                            />
                            ({board.board.rating.length})
                            
                              </li>
                                <li className="list-group-item">ID : {this.props.board.board.id || 'no id'}</li>
                                <li className="list-group-item">Price :  {this.props.board.board.price ?  ` $  ${this.props.board.board.price.normal} /  day` : 'no price'}    </li>
                                <li className="list-group-item">Promo Price :  {this.props.board.board.price ? this.props.board.board.price.promo : 'no promo'}   </li>
                                <li className="list-group-item">Region : {this.props.board.board.region || 'no region'}  </li>
                                <li className="list-group-item">Country : {this.props.board.board.country || 'no country'}  </li>
                                <li className="list-group-item"> board's width :  {this.props.board.size || '9'} inches  </li>
                                <li className="list-group-item"> board's height :  {this.props.board.size || '6'} inches  </li>
                                <li className="list-group-item">Estimate Population : {this.props.board.board.population || 'no population'}  </li>
                                <li className="list-group-item">Estimate Target Audiences : {this.renderTargetAudiences()}  </li>
                                <li className="list-group-item"><div dangerouslySetInnerHTML={createMarkup()} /></li>

                            </ul>
                        </div>
                        <div className="col-md-6">
                            <Slider {...settings}>


                                {this.renderPhotos()}


                            </Slider>

                        </div>



                    </div>

                    <div className=" d-flex my-4 py-5">


                        <div className="col-md-6 card shadow">

                            <div className="container my-1 py-1  ">
                                <h5 className="text-center display-4">Owner Details</h5>
                                <div 
                                className="d-flex justify-content-center flex-column  h-100 align-items-center "
                                style={{
                                    letterSpacing : '1px'
                                }}
                                >
                                <span>Company :   {board.board.owner ? board.board.owner.company : 'no name'}  </span> <br />
                                <span>Phone : {board.board.owner.phone.length > 0 ? board.board.owner.phone[0] : 'no phone'} </span>  <br />
                                <span>Email :  {board.board.owner.email.length > 0 ? board.board.owner.email[0]  : 'no email'} </span>  <br />
                                <span>Address :  {board.board.owner.address ? `${board.board.owner.address.line1} ${' ' } ${board.board.owner.address.line2}`  : 'no address'} </span>  <br />
                                </div>
                              

                            </div>


                        </div>
                        <div className="col-md-6" style={{ height: '400px', width: '500px' }}>

                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyD9EdV2JfPG1Vfviw9gf_HlblIUfs7Ie2E' }}
                                center={{ lat: board.board.location.coordinates[1], lng: board.board.location.coordinates[0] }}
                                zoom={18}

                            >


                                <AnyReactComponent
                                    lat={
                                        board.board.location.coordinates[1]
                                    }
                                    lng={board.board.location.coordinates[0]}

                                />


                            </GoogleMapReact>
                        </div>


                    </div>

                    <div className="my-1 py-1">



                    </div>


                </div>
            )



        } else {

            return (<div>
                <h5>Loading Spot</h5>
            </div>
            )
        }



    }





    render() {


        console.log(this.state)



        return (
            <div>
                {this.renderSingleSpot()}
            </div>
        )
    }
}




const mapStateToProps = (state) => ({
    board: state.boards ? state.boards.board : null,
    adverts: state.adverts ? state.adverts.adverts : [],
    advertiser: state.profile ? state.profile.advertiser : null,
    days: state.boards.dates || []
})

const mapDispatchToProps = {
    requestSpot ,
    giveRating
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleSpot);




