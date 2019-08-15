
import React, { Component } from 'react'
import FilterForm from './Form'



class filters extends Component {








    render() {






        return (


            <div>
                <FilterForm
                    submitCallBack={this.props.submitCallBack}

                />
            </div>
        )
    }
}




export default filters;