import React from 'react'






const SelectInput = ({ options, value, onChange, title, placeholder }) => {




    return (


        <div className="form-group mb-3">



            <select
                className="custom-select"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value)
                    console.log(e.target.value)
                }}
                placeholder={placeholder}
                options={options}
            >
                <option>Select {title}</option>
                {options.map((option) => {
                    return (
                        <option value={option.value} >{option.key}</option>
                    )
                })}

            </select>




        </div>


    )
}

export default SelectInput;