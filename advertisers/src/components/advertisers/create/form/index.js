import React, { Component } from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { createAdvert, clearForm, editAdvert } from '../../../../actions/advertisers/advert'
import { isEmpty } from '../../../../utils/isEmpty'


class index extends Component {


    submitHandler = (data) => {


        if (this.props.advert) {

            this.props.editAdvert(this.props.advert._id, data)

        } else {
            const advert = {
                ...data,
                advertiser: this.props.advertiser
            }
            this.props.createAdvert(advert)

        }



    }




    render() {


        console.log(this.props.advert)




        return (
            <div>

                <Form
                    submitCallBack={this.submitHandler}
                    initialValues={this.props.advert}
                    clearForm={this.props.clearForm}
                    initialImages={this.props.advert ? this.props.advert.contents.images : []}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    advertiser: state.user.userData ? state.user.userData.advertiser._id : null,
    advert: !isEmpty(state.adverts) ? state.adverts.advert : null
})

const mapDispatchToProps = {
    createAdvert,
    clearForm,
    editAdvert
}



export default connect(mapStateToProps, mapDispatchToProps)(index);