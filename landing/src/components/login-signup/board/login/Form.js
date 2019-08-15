import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../../misc/forms/inputs/TextInput'

const validate = values => {
    const errors = {}
    if (!values.company) {
        errors.company = 'agency name is required'
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
    { submitCallBack, handleSubmit, errorsServer, toggle }
) {

    const renderErrors = () => {


        const errorsArr = Object.keys(errorsServer)
        return errorsArr.map((errName) => {

            return (
                <label
                    style={{
                        color: 'red'
                    }}

                >
                    {errorsServer[errName]}

                </label>
            )

        })





    }




    return (






        <div>
            <form

                onSubmit={handleSubmit(submitCallBack)}
            >


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
                <div className="my-2 py-2 text-center">
                    <a
                        onClick={toggle}
                        style={{
                            cursor: 'pointer'
                        }}

                    >
                        Forgot Password ?
    
                </a>
                </div>
                <div>

                    {renderErrors()}
                </div>

                <button className="btn   btn-block" type="submit" style={{
                    backgroundImage: `radial-gradient(circle 248px at center, #CFAA9E 0%, #CFAA9E  47%, #CFAA9E 100%)`,
                    color: '#fff'
                }}>
                    Sign In
                </button>
            </form>
        </div>
    )
}


export default reduxForm({
    form: 'login-owner',
    validate
})(Form);
