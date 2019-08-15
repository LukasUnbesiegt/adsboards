
import React from 'react'


const RadioInput = ({ input, width, type, label }) => {




    return (

        <div className="form-group mb-3">

            <div className="form-check">
                <input className="form-check-input" type={type} id="invalidCheck2" required {...input} /> {' '}
                <label className="form-check-label" htmlFor="invalidCheck2">
                    {label}
                </label>
            </div>


        </div>
    )
}

export default RadioInput
