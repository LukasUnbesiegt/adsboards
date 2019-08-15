import React, { Component } from 'react'

import Script from 'react-load-script'
import PlacesAutocomplete from 'react-places-autocomplete'




class PlaceInput extends Component {



    state = {
        scriptLoaded: false
    }

    handleScriptLoaded = () => {
        this.setState({ scriptLoaded: true })
    }

    render() {

        const { input, width, onSelect, placeholder, options, meta: { touched, error } } = this.props;

        const myStyles = {
            autocompleteContainer: { zIndex: 1000 },
        }


        return (
            <Form.Field error={touched && !!error} width={width}>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9EdV2JfPG1Vfviw9gf_HlblIUfs7Ie2E&libraries=places"
                    onLoad={this.handleScriptLoaded}
                />
                {
                    this.state.scriptLoaded &&
                    <PlacesAutocomplete
                        inputProps={{ ...input, placeholder }}
                        options={options}
                        onSelect={onSelect}
                        styles={myStyles}
                    />
                }



                {touched && error && <label basic color="red">{error}</label>}
            </Form.Field>
        )
    }
}


export default PlaceInput;