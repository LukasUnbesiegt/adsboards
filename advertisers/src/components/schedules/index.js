
import React, { Component } from 'react'
import Today from './today'
import { Divider } from '@material-ui/core'
import SelectInput from '../misc/forms/inputs/SelectInputWO'
import styles from './index.module.css'
import { connect } from 'react-redux'
import { getSchedulesBy, todaySchedules } from '../../actions/schedules'
import { isEmpty } from '../../utils/isEmpty'
import DateRender from './groupDate'
import BoardRender from './groupBoard'

class index extends Component {


    state = {

        group: 'board'

    }

    componentDidMount() {



        this.props.getSchedulesBy({ type: 'advertiser', _id: this.props.advertiser._id }, this.state.group)
        this.props.todaySchedules(this.props.advertiser._id)
    }



    onGroupChange = (value) => {



        this.setState({
            group: value
        }, () => {
            this.props.getSchedulesBy({ type: 'advertiser', _id: this.props.advertiser._id }, this.state.group)
        })

    }



    boardSchedules = () => {


        return (<BoardRender schedules={this.props.schedules ? this.props.schedules : null} />)
    }


    dateSchedules = () => {
        return (<DateRender schedules={this.props.schedules ? this.props.schedules : null} />)

    }



    renderGroupedSchedules = () => {

        switch (this.state.group) {


            case 'board':

                return this.boardSchedules()


                break;

            case 'date':

                return this.dateSchedules()


                break;


            default:
                break;
        }




    }



    render() {
        console.log(this.props.schedules)
        const options = [
            {
                key: 'Group by Date',
                value: 'date'
            },
            {
                key: 'Group by Board',
                value: 'board'
            },

        ]





        return (


            <div className="container-fluid">

                <Today
                    todaySchedules={this.props.today || []}
                />
                <Divider />


                <div className="my-3 py-3">
                    <SelectInput

                        options={options || []}
                        value={this.state.group}
                        onChange={this.onGroupChange}
                        title="group"
                        placeholder="choose group"
                    />
                </div>

                <div className="my-3 py-3 text-center">


                    <span className={`${styles.totalSpan}`}> {this.props.totalItems || 0}  ads  running</span>






                </div>


                {this.renderGroupedSchedules()}


            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    advertiser: state.profile.advertiser || null,
    schedules: !isEmpty(state.schedules.schedules) ? state.schedules.schedules.schedules : null,
    totalItems: !isEmpty(state.schedules.schedules) ? state.schedules.schedules.totalItems : null,
    today: !isEmpty(state.schedules.today) ? state.schedules.today : null
})

const mapDispatchToProps = {
    getSchedulesBy,
    todaySchedules
}

export default connect(mapStateToProps, mapDispatchToProps)(index);