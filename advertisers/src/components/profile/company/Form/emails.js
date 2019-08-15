import React from 'react'
import { Field, FieldArray } from 'redux-form'
import TextInput from '../../../misc/forms/inputs/TextInput'
import { Button, ButtonGroup } from 'reactstrap';


function FieldArrayComponent(props) {



    const renderItems = ({ fields }) => {

        return (



            <div className="container my-3 py-3 ">




                <ul
                    style={{
                        listStyle: 'none'
                    }}



                >
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => { fields.push('') }}
                        type="button"

                    >
                        click to add email
                </button>


                    {fields.map((member, index) =>
                        <li key={index}
                            className=""
                        >
                            <Button close onClick={() => fields.remove(index)}>

                            </Button>
                            <div className="container card my-3 py-2 ">

                                <Field
                                    name={`${member}`}
                                    type="text"
                                    component={TextInput}
                                    placeholder="click to add email"
                                    styleFrom={{
                                        color: 'black'

                                    }}

                                />


                            </div>

                        </li>
                    )}
                </ul>



            </div>)



    }


    return (
        <div>

            <FieldArray name={`email`} component={renderItems} />
        </div>
    )
}


export default FieldArrayComponent;