import React, { Component } from 'react'
import BoardCard from './card/BoardCard'
import Pagination from '../../../misc/pagination/Pagination'





class Lists extends Component {







    renderCards = () => {

        const { boards } = this.props.boards

        if (boards) {


            return boards.map((board) => {

                return (

                    <BoardCard board={board} getSingleBoard={this.props.getSingleBoard} getDatesFromBoard={this.props.getDatesFromBoard} />


                )




            })
        } else {
            return (
                <div className="text-center display-3">

                    <h2>Loading Spots</h2>

                </div>

            )
        }
    }





    render() {








        return !this.props.loading ? (
            <div className="container-fluid">
                <div>
                    <Pagination
                        items={this.props.boards ? this.props.boards : []}
                        submitCallback={this.props.paginateHandler}
                    />

                </div>
                <div className="row">

                    {this.renderCards()}

                </div>
            </div>

        )

            : (<p>Loading spots</p>)


    }


}









export default Lists;