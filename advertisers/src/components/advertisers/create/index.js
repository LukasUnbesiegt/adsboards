import React, { Component } from 'react'
import CreateForm from './form/index'




export default class index extends Component {






    render() {





        return (
            <div className="container my-4 py-4">

                <h4 className="text-center display-4 my-2 py-2">Create your advert</h4>
                <CreateForm />

            </div>
        )
    }
}
