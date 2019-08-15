import React, { Component } from 'react'
import FormComp from './Form/Form'
import { connect } from 'react-redux'
import { isEmpty } from '../../../utils/isEmpty'
import { createProfile } from '../../../actions/boards/boards'

class index extends Component {


    componentDidMount() {

    }


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
            stripe: data.stripe,
            phone: data.phone,
            email: data.email,
            company: data.company
        }

        console.log(data._id)
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
                className="container"

            >

                <h4 className="text-center display-4">Agency Profile</h4>

                <p className="text-center ">this is profile information which will show on your display boards so that advertisers or users can contact you </p>

                <FormComp
                    submitCallBack={this.submitHandler}
                    initialValues={this.props.owner}
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

    owner: !isEmpty(state.owner) ? state.owner.owner : null
})

const mapDispatchToProps = {
    createProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(index);