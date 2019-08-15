import React from 'react'
import { reduxForm, Field } from 'redux-form'
import TextInput from '../../../misc/forms/inputs/TextInput'


function Form({
    submitCallBack,
    handleSubmit,

}) {




    return (
        <form
            onSubmit={handleSubmit(submitCallBack)}
        >

            <div className="container text-center">
                <Field
                    component={TextInput}
                    placeholder="enter your new password to change"
                    name="password"
                    type="password"
                />


                <button
                    className="btn btn-outline-secondary"
                    type="submit"
                >
                    Change new password

            </button>

            </div>

        </form>
    )
}



export default reduxForm({
    form: 'resetpass'
})(Form);