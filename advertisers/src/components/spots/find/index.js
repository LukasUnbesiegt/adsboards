
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Maps from './maps'
import Filters from './filters'
import Lists from './lists'
import { isEmpty } from '../../../utils/isEmpty'
import { getBoards, getSingleBoard, getDatesFromBoard } from '../../../actions/boards'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import moment from 'moment'


class index extends Component {


    componentDidMount() {
        this.props.getBoards()
    }


    state = {

        page: 1,
        startDate: null,
        endDate: null,
        address: '',
        calendarFocused: null,
        filters: {
            price: [],
            coordinates: [],
            daterange: []
        }

    }


    getPriceMinMax = (arr) => {

        return {
            value: {
                min: arr[0] || 0,
                max: arr[1] || 1000
            }
        }

    }

    calendarFocusedChange = (calendarFocused) => {
        this.setState({
            calendarFocused
        })
    }


    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then((latLng) => {

                this.handleFilters(latLng, 'coordinates')

            })
            .catch(error => console.error('Error', error));
    };


    paginateHandler = (dont, page) => {

        this.setState({
            page: page
        }
            , () => {
                this.showFilteredResults(page, this.state.filters)
            })
    }

    resetAll = () => {
        this.setState({
            page: 1,
            startDate: null,
            endDate: null,
            address: '',
            calendarFocused: null,
            filters: {
                price: [],
                coordinates: [],
                daterange: []
            }
        }, () => {
            this.showFilteredResults(1, this.state.filters)
        })
    }
    showFilteredResults = (page, filters) => {

        this.props.getBoards(this.state.page, this.state.filters)
    }

    handleDateRange = (filters) => {

        let arr = [moment(filters.start).format(), moment(filters.end).format()];

        this.setState({
            startDate: filters.start,
            endDate: filters.end
        }, () => {

        })
        return arr;
    }
    handlePrice = (filters) => {

        let arr = [filters.min, filters.max];
        return arr;


    }
    priceChange = (value) => {

        this.handleFilters(value, 'price')

    }



    handleFilters = (filters, category) => {



        let newFilters = { ...this.state.filters };
        newFilters[category] = filters;
        if (category === "price") {
            let priceValues = this.handlePrice(filters);
            newFilters[category] = priceValues
        }


        if (category === 'daterange') {
            let range = this.handleDateRange(filters);
            newFilters[category] = range;

        }
        if (category === 'coordinates') {
            let coordinates = [filters.lng, filters.lat]
            newFilters[category] = coordinates;

        }
        this.setState({
            filters: newFilters
        })
    }





    render() {




        return (







            <div className="my-5 py-5">

                <div className="my-3 py-3">

                    <Filters
                        handleFilters={this.handleFilters}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        calendarFocused={this.state.calendarFocused}
                        calendarFocusedChange={this.calendarFocusedChange}
                        address={this.state.address}
                        handleSelect={this.handleSelect}
                        handleChange={this.handleChange}
                        value={{ min: this.state.filters.price[0] || 0, max: this.state.filters.price[1] || 1000 }}
                        priceChange={this.priceChange}
                        showFilteredResults={this.showFilteredResults}
                        resetAll={this.resetAll}

                    />




                </div>


                <div className="container-fluid ">
                    <div className="">

                        <Maps
                            boards={this.props.boards || []}
                            center={{ lng: this.state.filters.coordinates[0] || 10.1815, lat: this.state.filters.coordinates[1] || 36.8065 }}
                            zoom={14}
                        />
                    </div>



                </div>

                <div className="my-3 py-3">

                    <Lists
                        boards={this.props.boards || []}
                        loading={this.props.loading}
                        paginateHandler={this.paginateHandler}
                        getSingleBoard={this.props.getSingleBoard}
                        getDatesFromBoard={this.props.getDatesFromBoard}


                    />
                </div>





            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    boards: !isEmpty(state.boards) ? state.boards.boards : null,
    loading: state.async.loading

})

const mapDispatchToProps = {
    getBoards,
    getSingleBoard,
    getDatesFromBoard
}





export default connect(mapStateToProps, mapDispatchToProps)(index);