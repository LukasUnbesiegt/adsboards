
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextArea from '../../../misc/forms/inputs/TextArea'
import TextInput from '../../../misc/forms/inputs/TextInput'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Emails from './emails'
import Phones from './phones'


class Form extends Component {







    render() {

        const { handleSubmit, submitCallBack, selectRegion,
            selectCountry, country, region } = this.props;

        console.log(this.props.initialValues)


        return (
            <div
                className="container my-3 py-3"
            >

                <form
                    onSubmit={handleSubmit(submitCallBack)}

                >



                    <div className="col-12">
                        <Field
                            component={TextInput}
                            name="company"
                            placeholder="company"
                            type="text"
                        />

                    </div>
                    <div className="row my-2 py-2">

                        <div className="col-lg-6 col-md-6">

                            <Field
                                component={TextArea}
                                name="address.line1"
                                placeholder="line 1"
                                type="text"
                            />
                        </div>
                        <div className="col-lg-6 col-md-6">

                            <Field
                                component={TextArea}
                                name="address.line2"
                                placeholder="line 2"
                            />
                        </div>
                        <div className="col-lg-4 col-md-4">


                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-12 mb-2">


                            <CountryDropdown
                                value={country}
                                onChange={(val) => selectCountry(val)}
                                classes="custom-select"
                            />

                        </div>
                        <div className="col-lg-6 col-sm-12">

                            <RegionDropdown
                                country={country}
                                value={region}
                                onChange={(val) => selectRegion(val)}
                                classes="custom-select"
                                showDefaultOption={true}
                            />


                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-6 col-lg-6">
                            <Emails />
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <Phones />
                        </div>

                    </div>
                    <h5 className="text-center">Stripe Payment</h5>
                    <div className="row">


                        <div className="col-md-6 col-lg-6">
                            <Field
                                component={TextInput}
                                name="stripe.publicId"
                                placeholder="stripe public id"

                            />
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <Field
                                component={TextInput}
                                name="stripe.secretId"
                                placeholder="stripe secret id"


                            />
                        </div>

                    </div>


                    <button className="btn btn-outline-warning btn-block">
                        Edit Profile
                    </button>
                </form>

            </div>
        )
    }
}



export default reduxForm({
    form: 'create-profile'
})(Form);