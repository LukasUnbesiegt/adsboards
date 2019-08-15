import React, { Component } from 'react'
import { RegionDropdown, CountryDropdown } from 'react-country-region-selector';





class Region extends Component {




    state = {
        country: 'Myanmar',
        region: 'Yangon'
    }




    selectRegion = (val) => {
        const { input: { onChange } } = this.props;

        this.setState((prevState) => {


            return {
                region: val
            }

        }, () => {



        })

    }

    selectCountry = (val) => {

        const { input: { onChange } } = this.props;
        this.setState((prevState) => {


            return {
                country: val
            }

        }, () => {



        })


    }




    render() {




        return (


            <div className="row">


                <div className="col-sm-12 col-md-6">
                    <RegionDropdown
                        country={this.state.country}
                        value={this.state.region}
                        onChange={(val) => this.selectRegion(val)}
                        classes="custom-select"
                    />

                </div>
                {/* <div className="col-sm-12 col-md-6">
                    <CountryDropdown
                        value={this.state.country}
                        onChange={(val) => this.selectCountry(val)}
                        classes="custom-select"
                    />


                </div> */}


            </div>





        )
    }
}



export default Region;