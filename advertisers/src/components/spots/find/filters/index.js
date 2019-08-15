import React, { Component } from 'react'
import Price from './price'
import { DateRangePicker } from 'react-dates';
import Script from 'react-load-script'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import 'react-dates/initialize';
import InputRange from 'react-input-range';


class Filters extends Component {


    state = {
        scriptLoaded: false,
        address: ''
    }

    handleScriptLoaded = () => {
        this.setState({ scriptLoaded: true })
    }

    onDatesChange = ({ startDate, endDate }) => {

        this.props.handleFilters({ start: startDate, end: endDate }, 'daterange')
    };
    onFocusChange = (calendarFocused) => {
        this.props.calendarFocusedChange(calendarFocused)
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    render() {







        return (




            <div className="container-fluid">

                <div className="row">


                    <div className="col-md-5">




                        <PlacesAutocomplete
                            value={this.props.address}
                            onChange={this.props.handleChange}
                            onSelect={this.props.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className="form-group">



                                    <input
                                        {...getInputProps({
                                            placeholder: 'type your city and search boards around city',
                                            className: 'location-search-input form-control',
                                        })}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                        className,
                                                        style,
                                                    })}
                                                >
                                                    <span>{suggestion.description}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>


                    </div>



                    <div className="col-md-4">
                        <DateRangePicker
                            startDate={this.props.startDate}
                            endDate={this.props.endDate}
                            startDateId="id-start"
                            endDateId="id-end"
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.props.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={2}

                        />

                    </div>




                    <div className="col-md-3 col-lg-3">
                        <span>Price</span>
                        <InputRange
                            maxValue={1000}
                            minValue={0}
                            value={this.props.value}
                            onChange={this.props.priceChange}
                        />
                    </div>






                </div>
                <div className="text-center">

                    <div className="d-flex justify-content-center">
                        <div className="px-2 mx-2">

                            <button
                                className="btn"
                                style={{
                                    borderRadius: '10px',
                                    backgroundImage: `radial-gradient(circle 248px at center, #9B8281 0%, #9B8281  47%, #9B8281 100%)`,
                                    color: '#fff'
                                }}
                                onClick={() => { this.props.showFilteredResults() }}
                            >

                                Search

</button>
                        </div>

                        <div className="px-2 mx-2">
                            <button
                                className="btn"
                                style={{
                                    borderRadius: '10px',
                                    color: '#fff',
                                    backgroundImage: `radial-gradient(circle 248px at center, #9B8281 0%, #9B8281  47%, #9B8281 100%)`,
                                }}
                                onClick={() => { this.props.resetAll() }}
                            >

                                Reset

</button>

                        </div>

                    </div>


                </div>

            </div>
        )
    }


}









export default Filters;