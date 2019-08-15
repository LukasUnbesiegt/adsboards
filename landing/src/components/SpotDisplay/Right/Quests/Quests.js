import React, { Component } from 'react'
import { sendLead } from '../../../../actions/schedules'
import { connect } from 'react-redux'
import Form from './Form/Form'




class Quests extends Component {



    submitHandler = (data) => {

        this.props.sendLead(data, this.props.scheduleId)
    }


    render() {

        console.log(this.props.quests)





        return (


            <div>
                <Form
                    submitCallBack={this.submitHandler}
                    quests={this.props.quests}

                />
            </div>
        )
    }
}



const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    sendLead
}


export default connect(mapStateToProps, mapDispatchToProps)(Quests);