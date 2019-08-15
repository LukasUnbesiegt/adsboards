
import React from 'react'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import "react-dates/initialize"
import 'react-dates/lib/css/_datepicker.css';



const DateInput = ({ input: { value, onChange, onBlur, onFocus }, width, placeholder, meta: { error, touched, active }, ...rest, }, ) => {








    return (


        <div className="form-group mb-3" >


            <SingleDatePicker
                numberOfMonths={1}
                date={value}
                onDateChange={(value) => onChange({ value })}
                focused={active}
                onFocusChange={({ focused }) => focused ? onFocus(true) : onBlur(true)}
                {...rest}
                withPortal={true}

            />

            {error && <label className="" style={{ color: 'red', fontSize: '10px' }}>{error}</label>}
        </div>


    )


}


export default DateInput;