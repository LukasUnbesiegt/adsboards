


import React, { Component } from 'react'




export default class marker extends Component {







    render() {



        const { board, text, lat, lng } = this.props;





        return (
            <div className="bg-primary">
                <i className="fas fa-tv" style={{ color: 'red', fontSize: '20px' }}></i>
            </div>
        )
    }
}





