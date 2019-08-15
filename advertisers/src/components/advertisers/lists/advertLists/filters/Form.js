

import React from 'react'
import { reduxForm, Field } from 'redux-form'
import SelectInput from '../../../../misc/forms/inputs/SelectInput'



function Form(
    {
        submitCallBack,
        handleSubmit
    }
) {





    return (
        <form
            onSubmit={handleSubmit(submitCallBack)}
        >
            <div className="d-flex flex-row ">

                <div className="mx-2">

                    <Field
                        component={SelectInput}
                        name="status"
                        options={[{ key: 'IDLE', value: 'IDLE' }, { key: 'SCHEDULED', value: 'SCHEDULED' }]}
                    />

                </div>

                <div>

                    <button
                        type="submit"
                        className="btn  btn-dark "
                    >
                        Filter
                     </button>
                </div>

            </div>



        </form>
    )
}


export default reduxForm({ form: 'filters-adverts' })(Form);