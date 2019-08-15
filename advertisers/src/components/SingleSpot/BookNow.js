
import React, { Component } from 'react'
import { DateRangePicker } from 'react-dates';
import SelectInput from '../misc/forms/inputs/SelectInputWO'
import moment from 'moment'
import { toastr } from 'react-redux-toastr'

class BookNow extends Component {




    onDatesChange = ({ startDate, endDate }) => {

        this.props.dateChange(startDate, endDate)
    };
    onFocusChange = (calendarFocused) => {
        this.props.calendarFocusedChange(calendarFocused)
    }

    isDayBlocked = (day) => {
        const { days } = this.props;
        return days.some((unavailableDay) => moment(unavailableDay).isSame(day, 'day'));
    }


    render() {


        let boardPrice = this.props.board.board.sale ? this.props.board.board.price.normal : this.props.board.board.price.promo;
        let priceCalculate = moment(this.props.endDate).diff(moment(this.props.startDate), 'days') * boardPrice || 0;


        console.log('credits', this.props.credits)



        return (




            <div className="card my-4 py-4 ">

                <div className="d-flex">

                    <div>

                        <SelectInput
                            options={this.props.options}
                            title="advert"
                            placeholder="choose advert"
                            onChange={this.props.onChange}
                            value={this.props.advertId}
                        />

                    </div>

                    <div className="mx-2 px-2">

                        <DateRangePicker
                            startDate={this.props.startDate}
                            endDate={this.props.endDate}
                            startDateId="id-start"
                            endDateId="id-end"
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.props.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={2}
                            showClearDates={true}
                            isDayBlocked={this.isDayBlocked}


                        />

                    </div>

                    <div className="mx-2 px-2">

                        <button
                            className="btn"
                            style={{
                                borderRadius: '10px',
                                backgroundImage: `radial-gradient(circle 248px at center, #9DC3C1 0%, #9DC3C1  47%, #9DC3C1 100%)`,
                                color: '#fff'

                            }


                            }
                            onClick={() => {

                                console.log('credits', this.props.credits)
                                console.log('priceCalculate', priceCalculate)
                                if ((this.props.credits * 100) > priceCalculate) {

                                    this.props.submitHandler()
                                } else {
                                    toastr.error('no enough credits , recharge first')
                                }

                            }




                            }
                            disabled={!this.props.value}
                        >

                            Request to Book
                            </button>


                    </div>

                    <div>

                        <span className="text-center display-4 ">Total Price : $ {'  '}   {priceCalculate}   </span>

                    </div>



                </div>
            </div >
        )
    }
}







export default BookNow;