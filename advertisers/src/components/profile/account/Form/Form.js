
import React from 'react'
import { reduxForm, Field } from 'redux-form'
import TextInput from '../../../misc/forms/inputs/TextInput'




function Form({
    handleSubmit,
    submitCallBack
}) {






    return (



        <form

            onSubmit={handleSubmit(submitCallBack)}

        >

            <div className="container">
                <div className="row">

                    <div className="col-md-4 col-lg-4">

                        <Field
                            component={TextInput}
                            name="username"
                            type="text"

                        />
                    </div>
                    <div className="col-md-4 col-lg-4">

                        <Field
                            component={TextInput}
                            name="email"
                            type="text"

                        />
                    </div>
                    <div className="col-md-4 col-lg-4">

                        <Field
                            component={TextInput}
                            name="password"
                            type="password"
                            placeholder="enter new password"
                        />
                    </div>

                </div>


                <button

                    type="submit"
                    className="btn btn-block "
                    style={{
                        backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                        color: `#fff`
                    }}

                >

                    Change

                </button>
            </div>


        </form>
    )
}




export default reduxForm({
    form: 'edit-user'
})(Form);