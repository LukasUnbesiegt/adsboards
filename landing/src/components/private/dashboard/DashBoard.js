import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'





class DashBoard extends Component {








    render() {

        const { user } = this.props;



        const renderDashboard = () => {






            return (
                <Fragment>
                    <h4>Dashboard</h4>
                </Fragment>
            )






        }






        return (
            <div>
                {renderDashboard()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    async: state.async,


})

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);