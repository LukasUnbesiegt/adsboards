
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveBoardId } from '../../actions/schedules'






class Lock extends React.Component {


    state = {
        id: null
    }



    onChangeHandler = (e) => {


        this.setState({
            id: e.target.value
        })

    }



    setBookId = () => {

        this.props.saveBoardId(this.state.id)
    }

    render() {

        return (
            <div className="container my-3 py-3 text-center">

                <h5 className="my-2 py-2">Set Up your spot here . Once you set up your spot ( board ) id here . it will be locked and u can't set up again. if you want to set up again , in your  <a href="https://owner.spotads.live/spots">owner dashboard</a>. set unlock your board again.</h5>

                <div className="form-group mb-3" >

                    <div className="input-group input-group-alternative " >

                        <input
                            type="text"
                            className="form-control"
                            placeholder="your board id"
                            onChange={this.onChangeHandler}

                        />

                    </div>


                </div>

                <button className="btn btn-success" onClick={() => { this.setBookId() }}>
                    Set Up Spot
                </button>



            </div>
        )


    }

}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    saveBoardId
}




export default connect(mapStateToProps, mapDispatchToProps)(Lock);