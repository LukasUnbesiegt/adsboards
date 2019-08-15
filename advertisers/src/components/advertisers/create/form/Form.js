
import React from 'react'
import { reduxForm, Field } from 'redux-form'
import TextInput from '../../../misc/forms/inputs/TextInput'
import TextArea from '../../../misc/forms/inputs/TextArea'
import { Button, ButtonGroup } from 'reactstrap';
import Quests from '../quests/index'

import ProductPhotos from './ProductPhotos/ProductPhotos'
import VideoLinkUpload from './videoLinks'



const validate = values => {
    const errors = {}
    if (!values.qrcode) {
        errors.qrcode = 'qrcode is required'
    }

    if (!values.name) {
        errors.name = "ads name is required"
    }

    if (!values.title) {
        errors.title = 'title is required'
    }

    if (!values.note) {
        errors.note = "note is required"
    }



    return errors
}


class Form extends React.Component {



    state = {
        selected: 1
    }




    componentWillUnmount = () => {

        this.props.clearForm('GET_SINGLE_ADVERT')

    }

    changeSelected = (choice) => {
        this.setState({
            selected: choice
        })
    }

    renderContents = () => {



        if (this.state.selected === 1) {

            return (
                <div>

                    <Field
                        component={ProductPhotos}
                        name="contents.images"
                        initialImages={this.props.initialImages}
                        productId={null}
                        upper={14}
                        lower={9}
                    />
                </div>
            )

        } else if (this.state.selected === 2) {
            return (
                <div>
                    <h5 className="text-center my-2 py-2">Your ad videos </h5>
                    <VideoLinkUpload />
                </div>
            )


        }





    }


    render() {



        const {
            handleSubmit,
            submitCallBack
        } = this.props;




        return (


            <form
                onSubmit={handleSubmit(submitCallBack)}

            >
                <div className="container text-center">


                    <div className="row my-1 py-1">

                        <div className="col-md-6 col-lg-6 col-sm-12">
                            <Field
                                component={TextInput}
                                placeholder="advert name"
                                type="text"
                                name="name"

                            />
                        </div>

                        <div className="col-md-6 col-lg-6 col-sm-12">
                            <Field
                                component={TextArea}
                                placeholder="note"
                                type="text"
                                name="note"

                            />
                        </div>


                    </div>

                    <div className="row my-1 py-1">

                        <div className="col-12">
                            <Field
                                component={TextInput}
                                placeholder="QR code url "
                                type="text"
                                name="qrcode"

                            />

                        </div>
                    </div>


                    <h4 className="display-5 text-center my-2">Quests Creation</h4>

                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <Field
                            component={TextArea}
                            placeholder="Quest Title (eg. we are giving promo code.please add your email below and get code)"
                            type="text"
                            name="title"

                        />
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12 my-2 py-2">
                        <Quests

                        />
                    </div>


                    <h4 className="display-5 my-2 py-2 text-center">Ads Contents Creation</h4>
                    <button class="btn btn-icon"
                        style={{
                            backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                            color: 'white'
                        }}
                        type="button" onClick={() => { this.changeSelected(1) }}>
                        <span class="btn-inner--icon"><i class="ni ni-atom"></i></span>Photos

                    </button>
                    <button class="btn btn-icon "
                        style={{
                            backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                            color: 'white'
                        }}
                        type="button" onClick={() => { this.changeSelected(2) }}>
                        <span class="btn-inner--icon"><i class="ni ni-atom"></i></span>videos

                    </button>

                    {
                        this.renderContents()
                    }



                    <button
                        className="btn  my-2 py-2"
                        style={{
                            backgroundImage: `radial-gradient(circle 248px at center, #F0E5DE 0%, #F0E5DE  47%,  #F0E5DE 100%)`,

                        }}
                        type="submit"

                    >
                        {this.props.initialValues ? 'Edit Advert' : 'Create Advert'}
                    </button>

                </div>
            </form>
        )
    }


}





export default reduxForm({
    form: 'create-advert',
    destroyOnUnmount: true,
    validate
})(Form);