import React from 'react'






const TextInput = ({ input, type, placeholder, prepend, logo, styleFrom, meta: { touched, error } }) => {



    return (
        <div className="form-group mb-3" >

            <div className="input-group input-group-alternative " >
                {
                    prepend &&
                    (
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className={logo}></i>
                            </span>
                        </div>
                    )
                }
                <input
                    type={type}
                    className="form-control"
                    style={styleFrom}
                    {...input}
                    placeholder={placeholder}
                />

            </div>


            {error && <label className="" style={{ color: 'red', fontSize: '10px' }}>{error}</label>}
        </div>
    )
}

export default TextInput;