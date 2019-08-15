
import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';



const AnyReactComponent = ({ text }) => <div>
    <i className="ni ni-pin-3"
        style={{
            color: 'red',
            fontSize: '20px'
        }}
    ></i>
</div>;



class Maps extends Component {


    state = {
        lat: this.props.coordinates[1],
        lng: this.props.coordinates[0]
    }

    handleClick = (e) => {


        this.setState({
            lat: e.lat,
            lng: e.lng
        }, () => {
            this.props.changeLatLng(this.state.lat, this.state.lng)
        })
    }

    render() {




        return (

            <div className="my-2 py-2 container">

                <div
                    className="d-flex my-2 py-2 flex-row justify-content-center"
                >
                    <div className="p-3 m-3">
                        Your Latitude : <span style={{ backgroundColor: 'orange', color: 'white' }}>{this.state.lat}</span>
                    </div>
                    <div className="p-3 m-3 ">
                        Your Longtitude :  <span style={{ backgroundColor: 'orange', color: 'white' }}>{this.state.lng}</span>
                    </div>

                </div>
                <div style={{ width: '100%', height: '500px' }} >
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyD9EdV2JfPG1Vfviw9gf_HlblIUfs7Ie2E' }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        onClick={this.handleClick}
                    >
                        <AnyReactComponent
                            lat={this.state.lat}
                            lng={this.state.lng}
                            text="My Marker"
                        />

                    </GoogleMapReact>
                </div >


            </div >


        )
    }
}



export default Maps;