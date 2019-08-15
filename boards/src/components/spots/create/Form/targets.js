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
                        className="btn  btn-sm"
                        onClick={() => { fields.push('') }}
                        type="button"
                        style={{
                            backgroundImage: `linear-gradient(120deg, #f6d365 0%, #fda085 100%)`,
                            color: 'white'
                        }}

                    >
                        click to add target group
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
                                    placeholder="click to add target"
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

            <FieldArray name={`targets`} component={renderItems} />
        </div>
    )
}


export default FieldArrayComponent;