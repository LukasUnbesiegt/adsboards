
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../../misc/forms/inputs/TextInput'

const validate = values => {
    const errors = {}
    if (!values.company) {
        errors.company = 'company name is required'
    }

    if (!values.email) {
        errors.email = "email is required"
    }

    if (!values.password) {
        errors.password = "password is required"
    }

    if (!values.username) {
        errors.username = "username is required"
    }



    return errors
}

function Form(
    { submitCallBack, handleSubmit }
) {






    return (






        <div>
            <form

                onSubmit={handleSubmit(submitCallBack)}
            >

                <Field
                    component={TextInput}
                    name="company"
                    placeholder="advertiser company name"
                />
                <Field
                    component={TextInput}
                    name="username"
                    placeholder="your name"
                />
                <Field
                    component={TextInput}
                    name="email"
                    placeholder="your email"
                />
                <Field
                    component={TextInput}
                    name="password"
                    placeholder="password"
                    type="password"
                />
                <Field
                    component={TextInput}
                    name="confirm"
                    placeholder="confirm password"
                    type="password"
                />

                <button className="btn   btn-block" type="submit" style={{
                    backgroundImage: `radial-gradient(circle 248px at center, #CFAA9E 0%, #CFAA9E  47%, #CFAA9E 100%)`,
                    color: '#fff'
                }}>
                    Sign Up
                </button>
            </form>
        </div>
    )
}


export default reduxForm({
    form: 'signup-advertiser',
    validate
})(Form);
