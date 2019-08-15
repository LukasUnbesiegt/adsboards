
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pagination from '../../../misc/pagination/Pagination'
import FilterForm from './filters/filters'
import AdvertCard from './card/Card'
import { getAdverts, deleteAdvert, getSingleAdvert } from '../../../../actions/advertisers/advert'

class index extends Component {





    submitHandler = (filters, page) => {

        this.props.getAdverts(filters, page)

    }



    renderCards = () => {

        const { adverts } = this.props;
        let items = adverts ? adverts.adverts : [];


        return items.map((item) => {


            return (
                <AdvertCard
                    advert={item}
                    deleteAdvert={this.props.deleteAdvert}
                    getSingleAdvert={this.props.getSingleAdvert}

                />
            )



        })


    }





    render() {

        let totalItems = this.props.adverts ? this.props.adverts.totalItems : 0;



        return (
            <div className="container my-2 py-2">
                <p className="text-center" style={{ fontWeight: 'bold' }}>Total Adverts : {`${totalItems}`} </p>
                <div className="container card my-2 py-2">

                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <FilterForm
                                submitCallBack={this.submitHandler}


                            />

                        </div>
                        <div className="col-lg-6 col-md-6">
                            <Pagination
                                items={this.props.adverts ? this.props.adverts : []}
                                submitCallback={this.submitHandler}
                            />

                        </div>
                    </div>


                </div>



                <div
                    className="container"

                >

                    {this.props.adverts ?
                        this.renderCards()
                        :
                        <h4 className="text-center my-3 py-3">Loading Please wait</h4>

                    }


                </div>

            </div>
        )
    }
}





const mapStateToProps = (state) => ({
    adverts: state.adverts ? state.adverts.adverts : null
})

const mapDispatchToProps = {
    getAdverts, 
    deleteAdvert,
    getSingleAdvert
}





export default connect(mapStateToProps, mapDispatchToProps)(index);