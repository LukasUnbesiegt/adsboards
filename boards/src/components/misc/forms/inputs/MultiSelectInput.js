import React, { Component, Fragment } from 'react'
import { Badge } from 'reactstrap';






class MultiSelectInput extends Component {



    state = {
        selectedOptions: []
    }


    addOption = (value, input) => {


        const notExistYet = this.state.selectedOptions.indexOf(value) === -1;

        if (notExistYet) {

            this.setState((previousState) => {

                return { selectedOptions: [value, ...previousState.selectedOptions] };
            }, () => {
                input.onChange(this.state.selectedOptions)
            });
        }

    }

    removeOption = (value) => {

        const { change, placeholder } = this.props;


        let newSelectedOptions = this.state.selectedOptions.filter((option) => {
            return option !== value;
        })

        change(placeholder, newSelectedOptions)
        this.setState({
            selectedOptions: newSelectedOptions
        })
    }

    render() {

        const { input, type, placeholder, options, meta: { touched, error } } = this.props;




        const renderPills = () => {





            if (this.state.selectedOptions.length > 0) {

                return this.state.selectedOptions.map((option) => {


                    let obj = options.find((item) => {
                        return item.value === option
                    });
                    return (
                        <Fragment>
                            <div className="mx-1 px-1">
                                <button
                                    type="button"
                                    className="close"
                                    aria-label="Close"

                                    onClick={() => { this.removeOption(option) }}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <Badge href="#" color="success">{obj.key}</Badge>

                            </div>
                        </Fragment >

                    )
                })

            } else {
                return (
                    <div className="text-muted">
                        no collections
                    </div>
                )
            }

        }

        return (


            <div className="form-group mb-3">



                <select
                    className="custom-select"
                    value={input.value}
                    onChange={(e) => {
                        this.addOption(e.target.value, input)
                    }}

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


                {touched && error && <div className="invalid-feedback">{error}</div>}

                <div className="container my-2 py-2 d-flex">
                    <p className="pr-2 mr-2">selected {`${placeholder}`}</p>

                    {
                        renderPills()
                    }

                </div>
            </div>


        )



    }
}





export default MultiSelectInput;