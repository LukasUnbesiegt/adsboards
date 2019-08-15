import React from 'react'
import { reduxForm, Field } from 'redux-form'
import TextInput from '../../../misc/forms/inputs/TextInput'


function Form({
    submitCallBack,
    handleSubmit,
    sent
}) {




    return (
        <form
            onSubmit={handleSubmit(submitCallBack)}
        >

            <Field
                component={TextInput}
                placeholder="enter your email"
                name="email"
            />
            {
                sent && (
                    <span>Sent Email. check your email inbox.</span>
                )
            }

            <button
                className="btn btn-outline-secondary"
                type="submit"
            >
                Send Code to Email

            </button>
        </form>
    )
}



export default reduxForm({
    form: 'resetmail'
})(Form);