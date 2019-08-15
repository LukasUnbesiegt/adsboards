import React, { Component } from 'react'
import moment from 'moment'
import Divider from '@material-ui/core/Divider';
import QRCode from 'qrcode.react'
import QrReader from 'react-qr-reader'
import Quests from './Quests/Quests'
import styles from './Right.module.css'
import { throws } from 'assert';



class Right extends Component {



    constructor(props) {
        super(props)

        // // Create the ref
        // this.qrRef = React.createRef()
        this.state = {
            qrclick: false
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                qrclick: false
            })
        }, 40000);
    }


    toggleQRScan = () => {

        this.setState((prevState) => {
            return {
                qrclick: true
            }
        })
        this.props.increateQRScanByOne(this.props.schedule._id)



    }

    renderContact = () => {


        const { schedule } = this.props;



        return (
            <div>

                <ul class="list-group">
                    {
                        <li class="list-group-item"> phones : {schedule.advertiser.phone.map((item) => {
                            return (<span>{item}</span>)
                        })}</li>

                    }
                    {
                        <li class="list-group-item"> emails : {schedule.advertiser.email.map((item) => {
                            return (<span>{item}</span>)
                        })}</li>

                    }

                    {
                        <li class="list-group-item"> address : {schedule.advertiser.address.line1} {' '} {schedule.advertiser.address.line2}</li>

                    }

                </ul>

            </div>
        )


    }



    render() {



        return (
            <div className="container fixed">
                <div className="text-center my-1 py-1">

                    <h5>{this.props.schedule.board.name}</h5>



                </div>

                <div className="text-center my-1 py-1">

                    <span className={`${styles.dateWrapper}`}>
                        {moment(Date.now()).format('DD MM YYYY')}
                    </span>



                </div>


                <div className="text-center my-2 py-2">


                    {
                        this.state.qrclick ? (
                            <QRCode
                                value="http://facebook.github.io/react/"
                                renderAs="svg"
                                size="128"
                            />
                        ) : (<button className="btn" onClick={this.toggleQRScan}>Click to Scan QR</button>)
                    }


                </div>

                <Divider />

                <div className="text-center my-1 py-1">
                    <span>{this.props.schedule.advert.title}</span>
                </div>

                <div>
                    <Quests
                        quests={this.props.schedule.advert.quests || []}
                        scheduleId={this.props.schedule._id}
                    />
                </div>
                <Divider />

                <div>
                    {this.renderContact()}
                </div>

            </div>
        )
    }
}







export default Right;