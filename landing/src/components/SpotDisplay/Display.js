
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Right from './Right/Right'
import Left from './Left/Left'
import { getTodaySchedule, increateQRScanByOne } from '../../actions/schedules'
import styles from './Display.module.css'
import { withRouter } from 'react-router-dom'



class Display extends Component {



    componentDidMount() {



        this.props.getTodaySchedule(this.props.match.params.boardId)


        setInterval(() => {
            this.props.getTodaySchedule(this.props.match.params.boardId)
        }, 12 * 60 * 60);
    }



    renderSchedule = () => {


        if (this.props.schedule) {




            return (
                <div className="">


                    <div className="row">

                        <div className={`col-md-9 ${styles.Left}`}>

                            <Left

                                schedule={this.props.schedule}
                            />

                        </div>

                        <div className={`col-md-3 ${styles.Right}`}>

                            <Right
                                schedule={this.props.schedule}
                                increateQRScanByOne={this.props.increateQRScanByOne}

                            />

                        </div>


                    </div>





                </div>
            )



        } else {



            return (<div className="display-3 text-center my-3 py-3">
                <h3 className="display-3">This Spot doesn't have  ads to display for today. OR you may locked your board . try to unlock first</h3>
            </div>)


        }


    }




    render() {

        return this.renderSchedule()

    }
}



const mapStateToProps = (state) => ({
    schedule: state.schedules.schedule ? state.schedules.schedule : null
})

const mapDispatchToProps = {
    getTodaySchedule,
    increateQRScanByOne
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Display));