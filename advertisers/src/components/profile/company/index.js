import React, { Component } from 'react'
import FormComp from './Form/Form'
import { connect } from 'react-redux'
import { isEmpty } from '../../../utils/isEmpty'
import { createProfile } from '../../../actions/advertisers/advert'

class index extends Component {


    state = {
        country: 'Tunisia',
        region: 'Tunis',

    }

    submitHandler = (data) => {


        let dataTosend = {
            address: {
                line1: data.address.line1,
                line2: data.address.line2,
                country: this.state.country,
                region: this.state.region
            },
            phone: data.phone,
            email: data.email,
            company: data.company
        }

        this.props.createProfile(data._id, dataTosend)
    }

    selectCountry = (val) => {

        this.setState({ country: val });
    }

    selectRegion = (val) => {
        this.setState({ region: val });
    }

    render() {





        return (



            <div
                className="container text-center"

            >

                <h4 className="text-center display-4">Advertiser Profile</h4>

                <span className="text-center">You need profile for showing your emails , address , phone number when you set
                    your ads in display screen boards. so that users can get in touch with u or follow up for your ads if they are interested</span>



                <FormComp
                    submitCallBack={this.submitHandler}
                    initialValues={this.props.advertiser}
                    selectCountry={(val) => { this.selectCountry(val) }}
                    selectRegion={(val) => { this.selectRegion(val) }}
                    country={this.state.country}
                    region={this.state.region}
                />



            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    advertiser: !isEmpty(state.profile) ? state.profile.advertiser : null
})

const mapDispatchToProps = {
    createProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(index);