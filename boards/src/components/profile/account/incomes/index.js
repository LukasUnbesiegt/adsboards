
import React, { Component } from 'react'
import moment from 'moment'
import { getTotalIncomes } from '../../../../utils/isEmpty'





class index extends Component {



    getTotalIncomeFromInvoices = () => {

        const { invoices } = this.props

        if (this.props.invoices && this.props.invoices.length > 0) {

            return (<span>
                $ {getTotalIncomes(invoices)}
            </span>)

        } else {
            return (<span> $ 0</span>)
        }

    }

    renderInvoices = () => {

        if (this.props.invoices && this.props.invoices.length > 0) {


            return this.props.invoices.map((invoice) => {

                return (
                    <div className="col-12 my-2 py-2">
                        <div className="card shadow">

                            <div className="card-header">
                                <h4 className="">
                                    Income :    ${invoice.amount}
                                </h4>

                            </div>

                            <div className="card-title p-2 m-2">

                                From Advertiser :     {invoice.advertiser.company}
                            </div>
                            <div className="card-title p-2 m-2">

                                Received at  :     {moment(invoice.createdAt).format('DD MM YYYY')}
                            </div>


                        </div>
                    </div>
                )

            })




        } else {


            return (<div className="container text-center">
                <h4>No Invoices yet</h4>
            </div>)
        }

    }

    render() {





        return (
            <div className="container my-2 py-2">
                <h4>Total Incomes : {this.getTotalIncomeFromInvoices()}</h4>
                {
                    this.renderInvoices()
                }
            </div>
        )
    }
}







export default index;