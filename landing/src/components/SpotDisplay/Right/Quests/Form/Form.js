
import React from 'react'
import { reduxForm, Field } from 'redux-form'
import TextInput from '../../../../misc/forms/inputs/TextInput'




function Form({
    handleSubmit,
    submitCallBack,
    quests
}) {


    const renderFields = () => {


        return quests.map((quest) => {


            return (<div className="">

                <Field
                    name={quest.id}
                    placeholder={quest.question}
                    type="text"
                    component={TextInput}
                />

            </div>)

        })



    }




    return (


        <form
            onSubmit={handleSubmit(submitCallBack)}
            className="my-1 py-1"
        >



            {renderFields()}


            <button className="btn btn-block" type="submit">Send </button>

        </form>
    )
}




export default reduxForm({
    form: 'create-quest'
})(Form);