
import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from './marker'



const AnyReactComponent = ({ text }) => <div>
    <i className="ni ni-pin-3"
        style={{
            color: 'red',
            fontSize: '20px'
        }}
    ></i>
</div>;


class Maps extends Component {




    // handleClick = (e) => {


    //     this.setState({
    //         lat: e.lat,
    //         lng: e.lng
    //     }, () => {
    //         this.props.changeLatLng(this.state.lat, this.state.lng)
    //     })
    // }
    renderMarkers = () => {

        console.log(this.props.boards)

        if (this.props.boards && this.props.boards.boards) {


            return this.props.boards.boards.map((board) => {
                console.log('lat', board.location.coordinates[1])
                console.log('lng', board.location.coordinates[0])
                return <Marker
                    lat={board.location.coordinates[1]}
                    lng={board.location.coordinates[0]}
                    text={board.price.normal}
                />

            })


        } else {
            return <div> No Map render</div>;
        }

    }

    render() {




        return (

            <div className=" container-fluid">


                <div style={{ width: '1000px', height: '380px', }} >
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyD9EdV2JfPG1Vfviw9gf_HlblIUfs7Ie2E' }}
                        center={this.props.center}
                        zoom={this.props.zoom}
                    // onClick={this.handleClick}
                    >


                        {this.renderMarkers()}


                    </GoogleMapReact>
                </div >


            </div >


        )
    }
}

export default Maps;