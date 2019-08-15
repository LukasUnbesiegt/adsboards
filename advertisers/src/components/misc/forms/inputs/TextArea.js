import React from 'react'






const TextArea = ({ input, rows, styleFrom, type, placeholder, meta: { touched, error } }) => {




    return (


        <div className="form-group mb-3">

            <div className="input-group input-group-alternative">
                {/* {
                    prepend &&
                    (
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className={logo}></i>
                            </span>
                        </div>
                    )
                } */}
                <textarea
                    type={type}
                    className="form-control"
                    {...input}
                    rows={rows}
                    placeholder={placeholder}
                    style={styleFrom}

                />


            </div>
            {error && <label className="" style={{ color: 'red', fontSize: '10px' }}>{error}</label>}

        </div>
    )
}

export default TextArea;