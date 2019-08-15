import React from 'react'
import { Field, FieldArray } from 'redux-form'
import TextInput, { } from '../../../misc/forms/inputs/TextInput'
import { Button, ButtonGroup } from 'reactstrap';


function FieldArrayComponent(props) {



    const renderItems = ({ fields }) => {

        return (



            <div className="container ">




                <ul
                    style={{
                        listStyle: 'none'
                    }}



                >
                    <button
                        className="btn "
                        style={{
                            backgroundImage: `radial-gradient(circle 248px at center, #F0E5DE 0%, #F0E5DE  47%,  #F0E5DE 100%)`,

                        }}
                        onClick={() => { fields.push('') }}
                        type="button"

                    >
                        click here for adding quest
                </button>


                    {fields.map((member, index) =>
                        <li key={index}
                            className=""
                        >
                            <Button close onClick={() => fields.remove(index)}>

                            </Button>
                            <div className="container card my-3 py-2 ">

                                <Field
                                    name={`${member}.question`}
                                    type="text"
                                    component={TextInput}
                                    placeholder="your request words"
                                    styleFrom={{
                                        color: 'black'

                                    }}

                                />
                                <Field
                                    name={`${member}.id`}
                                    type="text"
                                    component={TextInput}
                                    placeholder="unique id for your quest"
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

            <FieldArray name={`quests`} component={renderItems} />
        </div>
    )
}


export default FieldArrayComponent;