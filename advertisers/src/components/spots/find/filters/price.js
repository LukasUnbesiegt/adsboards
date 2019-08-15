
import React, { Component } from 'react'
import InputRange from 'react-input-range';




class price extends Component {


    state = {
        value: { min: 2, max: 10 },
    };

    render() {






        return (
            <div>
                <InputRange
                    maxValue={1000}
                    minValue={0}
                    value={this.state.value}
                    onChange={this.props.handleFilters} />

            </div>
        )
    }
}


export default price;