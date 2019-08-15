
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem } from 'reactstrap';
import { NavLink, Switch, Route } from 'react-router-dom'

import ChatBox from './chat'



class index extends Component {





    render() {

        console.log('schedule', this.props.schedule)
        return (


            <div className="container-fluid">

                <ChatBox

                    schedule={this.props.schedule}
                    advertiser={this.props.advertiser}
                />

            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    schedule: state.boards.schedule || null,
    advertiser: state.profile ? state.profile.advertiser : null
})

const mapDispatchToProps = {

}




export default connect(mapStateToProps, mapDispatchToProps)(index);