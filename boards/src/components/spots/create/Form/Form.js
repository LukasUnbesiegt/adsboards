
import React from 'react'
import { reduxForm, Field } from 'redux-form'
import TextInput from '../../../misc/forms/inputs/TextInput'

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Editor from '../../../misc/forms/editor/Editor'
import Photos from '../../../misc/ProductPhotos/ProductPhotos'
import Maps from './Maps'
import Targets from './targets'


const validate = values => {
    const errors = {}
    if (!values.id) {
        errors.id = 'board id is required'
    }

    if (!values.name) {
        errors.name = "board name is required"
    }

    if (!values.size) {
        errors.size = { width: 'width of board is required', height: "height of board required" }
    }

    if (!values.price) {
        errors.price = { normal: 'normal price required', promo: "promo price required" }
    }



    return errors
}


function Form({
    handleSubmit,
    submitCallBack, selectRegion,
    selectCountry, country, region, center, zoom, changeLatLngHandler, initialValues
}) {



    console.log(initialValues)

    return (



        <form
            onSubmit={handleSubmit(submitCallBack)}

        >

            <div className="container">
                <h4 className="text-muted text-center my-2 py-2">Information</h4>
                <div className="row">

                    <div className="col-md-6">
                        <Field
                            component={TextInput}
                            name="id"
                            placeholder="unique ID"
                            type="text"


                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            component={TextInput}
                            name="name"
                            placeholder="spot name"
                            type="text"
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            component={TextInput}
                            name="price.normal"
                            placeholder="normal price"
                            type="number"
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            component={TextInput}
                            name="price.promo"
                            placeholder="promo price"
                            type="number"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            component={TextInput}
                            name="size.width"
                            placeholder="width in inches"
                            type="number"
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            component={TextInput}
                            name="size.height"
                            placeholder="height in inches"
                            type="number"
                        />
                    </div>
                </div>
                <div className="mr-3">
                    <label className="mr-1" htmlFor="featured">On Sales</label>
                    <Field
                        name="sale"
                        id="sale"
                        component="input"
                        type="checkbox"

                    />

                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            component={TextInput}
                            name="population"
                            placeholder="estimate population"
                            type="number"
                        />
                    </div>
                    <div className="col-md-6">
                        <Targets />
                    </div>
                </div>

                <div className="row ">

                    <div className="col-md-12">
                        <Field
                            component={Editor}
                            name="description"
                            // initialContent={initialValues ? initialValues.description : '<p></p>'}
                            description={"Spot Place Description"}
                        />
                    </div>

                </div>

                <h4 className="text-muted text-center my-2 py-2">Location Setting</h4>
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

                <p className="text-muted text-center my-2 py-2">Click in Map for your spot detailed position</p>
                <div className="container my-3 py-3">
                    <div className="">

                        <Maps
                            center={center}
                            zoom={zoom}
                            changeLatLng={changeLatLngHandler}
                            coordinates={initialValues ? initialValues.location.coordinates : ['', '']}

                        />

                    </div>

                </div>


                <div>


                    <Field
                        component={Photos}
                        name="photos"
                        initialImages={initialValues ? initialValues.photos : []}
                        upper={10}
                        lower={10}
                    />

                </div>



                <button
                    style={{
                        backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                        color: 'white'
                    }}
                    className="btn btn-block"
                    type="submit"
                >

                    {initialValues ? 'Edit Spot Location' : 'Add Spot Location'}

                </button>
            </div>


        </form>
    )
}



export default reduxForm({
    form: 'create-board',
    validate
})(Form);