import React from 'react'






const SelectInput = ({ input, type, placeholder, multiple, options, meta: { touched, error } }) => {




    return (


        <div className="form-group mb-3">



            <select
                className="custom-select"
                value={input.value}
                onChange={(e) => {
                    input.onChange(e.target.value)
                }}
                multiple={multiple}
                placeholder={placeholder}
                options={options}
            >
                <option>Select {input.name}</option>
                {options.map((option) => {
                    return (
                        <option value={option.value} >{option.key}</option>
                    )
                })}

            </select>



            {error && <label className="" style={{ color: 'red', fontSize: '10px' }}>{error}</label>}

        </div>


    )
}

export default SelectInput;