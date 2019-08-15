

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextArea from '../../../misc/forms/inputs/TextArea'



function Form({
    handleSubmit,
    submitCallBack
}) {



    return (
        <form
            onSubmit={handleSubmit(submitCallBack)}

        >


            <div className="row my-2 py-2 card shadow mx-2 px-2" >

                <div className="col-md-9">
                    <Field
                        component={TextArea}
                        name="message"
                        placeholder="your message"

                    />

                </div>

                <div className="col-md-3">
                    <button className="btn" type="submit" style={{
                        backgroundImage: `radial-gradient(circle 248px at center, #F7AA97 0%, #F7AA97  47%, #F7AA97 100%)`,
                        color: `#fff`
                    }}>


                        Send

                    </button>
                </div>


            </div>



        </form>
    )
}




export default reduxForm({
    form: 'create-message'
})(Form);