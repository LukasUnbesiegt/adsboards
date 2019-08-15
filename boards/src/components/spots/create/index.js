
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Form from './Form/Form'
import { isEmpty } from '../../../utils/isEmpty'
import { createBoard, getOwner, clearForm, editBoard } from '../../../actions/boards/boards'

class index extends Component {


    state = {
        country: 'Tunisia',
        region: 'Tunis',
        center: {
            lat: 36.8065,
            lng: 10.1815
        },
        zoom: 15,
        lat: null,
        lng: null

    }

    componentWillUnmount = () => {

        this.props.clearForm('GET_SINGLE_BOARD')
    }
    latlngHandler = (lat, lng) => {

        this.setState({
            lat,
            lng
        })

    }


    submitHandler = (data) => {


        let board = {
            id: data.id,
            name: data.name,
            price: data.price,
            sale: data.sale,
            description: data.description,
            country: this.state.country,
            region: this.state.region,
            population: data.population,
            targets: data.targets,
            size: data.size,
            coordinates: [this.state.lng, this.state.lat],
            photos: data.photos

        };


        if (this.props.initialValues) {

            this.props.editBoard(board, this.props.initialValues._id)
        } else {
            this.props.createBoard(board)
        }






    }

    selectCountry = (val) => {

        this.setState({ country: val });
    }

    selectRegion = (val) => {
        this.setState({ region: val });
    }

    render() {





        return (






            <div className="container my-4 py-4">

                <Form
                    submitCallBack={this.submitHandler}
                    selectCountry={(val) => { this.selectCountry(val) }}
                    selectRegion={(val) => { this.selectRegion(val) }}
                    country={this.state.country}
                    region={this.state.region}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    changeLatLngHandler={this.latlngHandler}
                    initialValues={this.props.initialValues}
                    clearForm={this.props.clearForm}
                    initialImages={this.props.initialValues ? this.props.initialValues.photos : []}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    initialValues: !isEmpty(state.board) ? state.board.board : null
})

const mapDispatchToProps = {
    createBoard,
    getOwner,
    clearForm,
    editBoard
}


export default connect(mapStateToProps, mapDispatchToProps)(index);