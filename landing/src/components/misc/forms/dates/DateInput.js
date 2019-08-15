
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'



const DateInput = ({ input: { value, onChange, onBlur, ...restInput }, width, placeholder, meta: { touched, error }, ...rest }) => {





    if (value) {
        value = moment(value, 'X')
        console.log(value)
    }


    return (


        <div className="form-group mb-3" >

            <DatePicker
                {...rest}
                placeholderText={placeholder}
                selected={value}
                onChange={(e) => { onChange(e) }}
                onBlur={() => onBlur()}


            />




            {touched && error && <label basic color="red">{error}</label>}
        </div>


    )


}


export default DateInput;