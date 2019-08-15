
import React from 'react'
import moment from 'moment'
import { } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';
import { getAverage, getTotal } from '../../../../../utils/rating'


function BoardCard({ board, getSingleBoard, getDatesFromBoard }) {

    let averageRating = 0;

    if (board.rating.length > 0) {

        const oneTotal = getTotal(board.rating, 1)
        const twoTotal = getTotal(board.rating, 2)
        const threeTotal = getTotal(board.rating, 3)
        const fourTotal = getTotal(board.rating, 4)
        const fiveTotal = getTotal(board.rating, 5)

        averageRating = getAverage([oneTotal, twoTotal, threeTotal, fourTotal, fiveTotal])


    }


    return (

        <div className="col-md-4 col-lg-4 col-sm-4 mb-2">

            <div className="card shadow"


            >
                <img src={board.photos.length > 0 ? board.photos[0].url : "https://via.placeholder.com/300"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{board.name}</h5>
                    <div>
                        <StarRatingComponent
                            name="rate2"
                            editing={false}
                            starCount={5}
                            value={averageRating}
                        /> ({board.rating.length > 0 ? board.rating.length : 0})
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Price :    {board.price ? ` $ ${board.price.normal}` : 'no price'}</li>
                    <li className="list-group-item">Region : {board.region}</li>
                    <li className="list-group-item">Owner : {board.owner.company}</li>
                </ul>
                <div className="card-body">

                    <button onClick={() => {
                        getSingleBoard(board._id)
                        getDatesFromBoard(board._id)



                    }} href="#" className="btn" style={{
                        color: 'white',
                        backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`
                    }} > Book or Check Details</button>
                </div>
                <div className="card-footer  " style={{ color: 'white', backgroundImage: `radial-gradient(circle 248px at center, #DE7E73 0%, #DE7E73  47%, #DE7E73 100%)` }}>
                    launched at  {moment(board.createdAt).fromNow()}
                </div>

            </div>
        </div>

    )
}



export default BoardCard;