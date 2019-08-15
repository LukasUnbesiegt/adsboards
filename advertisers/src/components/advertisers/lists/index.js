
import React, { Component } from 'react'
import AdvertLists from './advertLists/index'




class index extends Component {








    render() {




        return (




            <div>


                <AdvertLists
                    getAdverts={this.props.getAdverts}

                />

            </div>
        )
    }
}







export default index;