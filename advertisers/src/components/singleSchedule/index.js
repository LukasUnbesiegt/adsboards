import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { singleSchedule } from '../../actions/schedules'
import Leads from './Leads'
import moment from 'moment'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';




class index extends Component {


    state = {
        modal: false
    };
    componentDidMount() {

        this.props.singleSchedule(this.props.match.params.id)

    }
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    renderTitle = (schedule) => {





        return (
            <div className="my-2 py-2">

                <h4 className="display-3 text-center" style={{
                    letterSpacing: '1px'
                }}>{schedule.advert.name}</h4>

            </div>
        )

    }




    renderStats = (schedule) => {





        return (
            <div className="container  shadow">

                <div className="row my-3">
                    <div className="col-md-6 col-lg-6 text-center">
                        <div className="row my-2 py-2 text-center">
                            <div className="col-md-6 col-lg-6  ">
                                <div className="card m-2 p-2 text-center"
                                    style={{
                                        backgroundImage: `radial-gradient(circle 248px at center, #9B8281 0%, #9B8281  47%, #9B8281 100%)`,
                                        color: `#fff`
                                    }}
                                >
                                    <div className="d-flex justify-content-center align-items-center h-100">

                                        <div>

                                            <i class="fas fa-qrcode fa-5x " style={{ color: 'white', marginRight: '10px', paddingRight: '10px' }}></i>
                                        </div>
                                        <div className="mx-1">
                                            <span style={{ fontSize: '3rem', color: 'white' }}>
                                                {schedule.stats.qrqty || 0}
                                            </span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6  ">


                                <div className="card m-2 p-2 text-center"
                                    style={{
                                        backgroundImage: `radial-gradient(circle 248px at center, #9B8281 0%, #9B8281  47%, #9B8281 100%)`,
                                        color: `#fff`
                                    }}
                                >

                                    <div className="d-flex justify-content-center align-items-center h-100"
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={this.toggle}
                                    >

                                        <div>

                                            <i class="fas fa-envelope-open-text fa-5x" style={{ color: 'white', marginRight: '10px', paddingRight: '10px' }}></i>
                                        </div>
                                        <div className="">
                                            <span style={{ fontSize: '3rem', color: 'white' }}>
                                                {schedule.stats.leads.length || 0}
                                            </span>

                                        </div>



                                    </div>


                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="col-md-6"
                        style={{
                            backgroundImage: `radial-gradient(circle 248px at center, #9B8281 0%, #9B8281  47%, #9B8281 100%)`,
                            color: `#fff`
                        }}
                    >

                        <div className="d-flex flex-row justify-content-center  align-items-center h-100 mx-2 px-2">

                            <div>

                                <i class="ni ni-album-2" style={{ fontSize: '20px', marginRight: '10px', color: 'white' }}></i>
                                <span style={{
                                    fontSize: '20px',
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>

                                    {
                                        moment(schedule.from).format('DD MM YYYY')
                                    }
                                </span>


                            </div>

                            <div>

                                <span style={{
                                    fontSize: '20px',
                                    color: '#fff',
                                    fontWeight: 'bold'

                                }} className="mx-2"> - </span>

                            </div>
                            <div>
                                <i class="ni ni-album-2" style={{ fontSize: '20px', marginRight: '10px', color: 'white' }}></i>
                                <span style={{
                                    fontSize: '20px',
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>

                                    {
                                        moment(schedule.to).format('DD MM YYYY')
                                    }
                                </span>


                            </div>

                        </div>


                    </div>

                </div>



            </div>
        )

    }


    renderAdvert = (schedule) => {



        return (

            <div className="container">

                <div className="row">

                    <div className="col-md-6">
                        <div className="card">

                            <div className="card-header">

                                <h3 className="display-4">Board Details</h3>


                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-12">


                                        <span style={{
                                            fontWeight: 'bolder',
                                            fontSize: '20px'
                                        }} className="mx-2 px-2">Name  </span>
                                        <span>{schedule.board.name}</span>

                                    </div>


                                </div>
                                <div className="row">

                                    <div className="col-12">


                                        <span style={{
                                            fontWeight: 'bolder',
                                            fontSize: '20px'
                                        }} className="mx-2 px-2">Region  </span>
                                        <span >{schedule.board.region}</span>






                                    </div>


                                </div>
                                <div className="row">

                                    <div className="col-12">


                                        <span style={{
                                            fontWeight: 'bolder',
                                            fontSize: '20px'
                                        }} className="mx-2 px-2">Country  </span>
                                        <span >{schedule.board.country}</span>






                                    </div>


                                </div>

                            </div>



                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">

                            <div className="card-header">

                                <h3 className="display-4">Owner Details</h3>


                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-12">


                                        <span style={{
                                            fontWeight: 'bolder',
                                            fontSize: '20px'
                                        }} className="mx-2 px-2">Name  </span>
                                        <span>{schedule.owner.company}</span>

                                    </div>


                                </div>
                                <div className="row">

                                    <div className="col-12">


                                        <span style={{
                                            fontWeight: 'bolder',
                                            fontSize: '20px'
                                        }} className="mx-2 px-2">Address  </span>
                                        <span>
                                            {schedule.owner.address.line1} {'  '}
                                            {schedule.owner.address.line2} {'  '}

                                        </span>

                                    </div>


                                </div>
                                <div className="row">

                                    <div className="col-12">


                                        <span style={{
                                            fontWeight: 'bolder',
                                            fontSize: '20px'
                                        }} className="mx-2 px-2">Phone  </span>
                                        <span>
                                            {schedule.owner.phone[0] || 'no phone'} {'  '}


                                        </span>

                                    </div>


                                </div>
                                <div className="row">

                                    <div className="col-12">


                                        <span style={{
                                            fontWeight: 'bolder',
                                            fontSize: '20px'
                                        }} className="mx-2 px-2">Email  </span>
                                        <span>
                                            {schedule.owner.email[0] || 'no email'} {'  '}


                                        </span>

                                    </div>


                                </div>
                            </div>



                        </div>
                    </div>

                </div>





            </div >
        )






    }


    renderSingleSchedule = () => {




        if (this.props.schedule) {


            return (
                <div className="">
                    {this.renderTitle(this.props.schedule)}
                    {this.renderStats(this.props.schedule)}
                    {this.renderAdvert(this.props.schedule)}
                </div>
            )


        } else {


            return (
                <div className="d-flex h-100 justify-content-center align-items-center">
                    <h4 className="display-3 text-center">Loading</h4>
                </div>
            )


        }



    }

    render() {



        return (
            <div
                className="container-fluid"
            >

                {this.renderSingleSchedule()}

                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Leads Data</ModalHeader>
                    <ModalBody>
                        <Leads
                            leads={this.props.schedule ? this.props.schedule.stats.leads : []}

                        />
                    </ModalBody>
                    <ModalFooter>

                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    schedule: state.schedules.schedule || null
})

const mapDispatchToProps = {
    singleSchedule
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(index));