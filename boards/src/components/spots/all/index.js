
import React, { Component, Fragment } from 'react'
import Table from '../../misc/table/Table'
import { connect } from 'react-redux'
import moment from 'moment'
import { deleteBoard, getSingleBoard, lockBoard, getBoards } from '../../../actions/boards/boards'
import Pagination from '../../misc/pagination/Pagination'



class index extends Component {



    submitHandler = (filters, page) => {
        this.props.getBoards(filters, page)
    }
    _editHandler = (id) => {

        this.props.getSingleBoard(id)


    }

    _deleteHandler = (id) => {

        this.props.deleteBoard(id)


    }

    _viewHandler = () => {

        alert('Nothing to view for board')

    }

    _lockHandler = (id) => {
        this.props.lockBoard(id)
    }


    render() {

        let rows;
        let tableheads = ['id', 'name', 'region', 'locked', 'createdAt', 'price', 'company', 'population']

        console.log(this.props.boards)
        if (this.props.boards && this.props.boards.boards.length > 0) {

            rows = this.props.boards.boards.map((board) => {

                let momentDate = moment(board.createdAt).format('YYYY MM DD')
                return {
                    id: board._id,
                    name: board.name,
                    region: board.region,
                    locked: board.locked ? 'true' : 'false',
                    createdAt: momentDate,
                    price: board.price.normal || 'no price',
                    company: board.owner.company || 'no company',
                    population: board.population || 'no population'

                }

            })
            console.log(rows)

        }

        return (



            <Fragment>
                <h5 className="text-center text-muted display-4 my-3 py-3">All Spots you owned</h5>


                <div className="my-2 py-2">

                    <Pagination
                        items={this.props.boards ? this.props.boards : []}
                        submitCallback={this.submitHandler}
                    />

                </div>
                <div className="">

                    <Table
                        tableheads={tableheads}
                        rows={rows}
                        handlers={
                            [
                                { name: 'edit', func: this._editHandler },
                                { name: 'delete', func: this._deleteHandler },
                                { name: 'lock/unlock', func: this._lockHandler },


                            ]
                        }
                    />

                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    boards: state.board ? state.board.boards : []
})

const mapDispatchToProps = {
    deleteBoard,
    getSingleBoard,
    lockBoard,
    getBoards
}


export default connect(mapStateToProps, mapDispatchToProps)(index);