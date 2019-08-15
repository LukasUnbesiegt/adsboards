
import React, { Component } from 'react'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, ButtonGroup, Badge, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import moment from 'moment';
import { Table } from 'reactstrap';
import { connect } from 'react-redux'
import { getSpotListsByAds } from '../../../../../actions/advertisers/advert'



class CardComp extends Component {


    state = {
        isSpotDataShown: false,
        modal: false
    }


    toggleSpotContent = () => {

        this.setState((prevState) => {

            return {
                isSpotDataShown: !prevState.isSpotDataShown
            }
        })
    }
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    renderLabel = () => {
        const { status } = this.props.advert;
        let color = 'red'

        if (status === 'RUNNING') {
            color = 'green'
        }


        return (
            <span
                style={{
                    backgroundColor: color,
                    color: 'white',
                    letterSpacing: '2px',
                    padding: '5px'
                }}

            >
                {`${status}`}
            </span>
        )


    }

    renderListTable = () => {

        const { lists } = this.props;


        const renderLists = () => {



            if (lists && lists.length > 0) {


                return lists.map((list, i) => {
                    return (<tr>

                        <td>{list.board.name}</td>
                        <td>{moment(list.from).format('DD MM YYYY')}</td>
                        <td>{moment(list.to).format('DD MM YYYY')}</td>

                    </tr>)


                })


            } else {



                return (<div>
                    <h3>No History for now</h3>
                </div>)
            }


        }

        return (
            <Table striped>
                <thead>
                    <tr>

                        <th>board</th>
                        <th>from</th>
                        <th>to</th>

                    </tr>
                </thead>
                <tbody>
                    {renderLists()}
                </tbody>
            </Table>
        )




    }

    renderSpotContents = () => {




        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Board Lists History</ModalHeader>
                    <ModalBody>
                        {
                            this.renderListTable()
                        }
                    </ModalBody>
                    <ModalFooter>

                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>


            </div>
        )



    }



    renderNote = () => {

        const { advert } = this.props;

        if (advert) {

            return (
                <span className="mx-2 px-2">
                    {advert.note}
                </span>

            )
        }
    }

    renderDate = () => {

        const { advert } = this.props;

        if (advert) {

            return (
                <span className="mx-2 px-2">
                    {moment(advert.createdAt).format('YYYY-MM-DD')}
                </span>

            )
        }

    }
    render() {

        const { advert } = this.props;




        return (



            <Card className="my-2 py-2 shadow-lg">
                <CardHeader>
                    {`${advert.name}`}
                    {'  '}
                    {this.renderLabel()}
                    <div className="float-right">
                        <ButtonGroup>
                            <Button
                                style={{
                                    backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                    color: 'white'
                                }}
                                onClick={() => { this.props.getSingleAdvert(advert._id) }}
                            >
                                <span class="btn-inner--icon"><i class="ni ni-settings"></i></span>
                            </Button>
                            <Button
                                style={{
                                    backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                    color: 'white'
                                }}
                                onClick={() => { this.props.deleteAdvert(advert._id) }}
                            >
                                <span class="btn-inner--icon"><i class="ni ni-fat-remove" style={{ fontSize: '15px' }}></i></span>
                            </Button>
                        </ButtonGroup>
                    </div>

                </CardHeader>
                <CardBody>
                    <div className="container my-3 py-3">

                        <div className="d-flex flex-row justify-content-around">

                            <div>
                                <i class="fas fa-calendar-day"></i>

                                {this.renderDate()}

                            </div>
                            <div>
                                <i class="fas fa-book-open"></i>
                                {this.renderNote()}
                            </div>

                        </div>

                    </div>

                    <div className="container my-3 py-3">
                        <CardSubtitle style={{ fontWeight: 'bold' }}>
                            Contents
                        </CardSubtitle>
                        <Badge style={{
                            backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                            color: 'white'
                        }} pill> Images {'  '} {advert.contents ? advert.contents.images.length : 'counting'}</Badge>
                        <Badge style={{
                            backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                            color: 'white'
                        }} pill> Videos {'  '} {advert.contents ? advert.contents.videos.length : 'counting'}</Badge>



                    </div>
                    <div style={{ borderBottom: '1px solid grey' }}>

                    </div>
                    <div className="container my3 py-3">
                        <CardSubtitle style={{ fontWeight: 'bold' }}>
                            Quests
                        </CardSubtitle>
                        <Badge
                            style={{
                                backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                color: 'white'
                            }}
                            pill> Quests {'  '} {advert ? advert.quests.length : 'counting'}</Badge>

                    </div>
                    <div style={{ borderBottom: '1px solid grey' }}>

                    </div>
                    <div className="container my3 py-3">
                        <CardSubtitle style={{ fontWeight: 'bold' }}>
                            Advertisers
                        </CardSubtitle>

                        <span>Name : {advert ? advert.advertiser.company : 'rendering'}</span>


                    </div>
                    <div style={{ borderBottom: '1px solid grey' }}>

                    </div>


                    <div className="container my-3 py-3">

                        <button className="btn btn-icon" type="button"
                            onClick={() => {
                                this.toggle()
                                this.props.getSpotListsByAds(advert._id)

                            }}

                            style={{
                                backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                color: 'white'
                            }}
                        >
                            <span className="btn-inner--icon"><i className="ni ni-bold-down" style={{ fontSize: '20px' }}></i></span>

                            <span className="btn-inner--text" >Click to check Spot Placement</span>

                        </button>


                        <div className=" text-center my-3 py-3">

                            {this.renderSpotContents()}

                        </div>

                    </div>



                </CardBody>

            </Card>
        )
    }
}


const mapStateToProps = (state) => ({
    lists: state.adverts ? state.adverts.lists : null
})

const mapDispatchToProps = {
    getSpotListsByAds
}


export default connect(mapStateToProps, mapDispatchToProps)(CardComp);