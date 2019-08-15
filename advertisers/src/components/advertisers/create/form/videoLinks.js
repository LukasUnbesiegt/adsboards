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
                        style={{
                            backgroundImage: `radial-gradient(circle 248px at center, #9B8281 0%, #9B8281  47%, #9B8281 100%)`,
                            color: `#fff`
                        }}
                        onClick={() => { fields.push('') }}
                        type="button"

                    >
                        add video link
                </button>


                    {fields.map((member, index) =>
                        <li key={index}
                            className=""
                        >
                            <Button close onClick={() => fields.remove(index)}>

                            </Button>
                            <div className="container card my-3 py-2 ">

                                <Field
                                    name={`${member}.url`}
                                    type="text"
                                    component={TextInput}
                                    placeholder="insert video link"
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

            <FieldArray name={`contents.videos`} component={renderItems} />
        </div>
    )
}


export default FieldArrayComponent;