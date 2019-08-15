
import React, { Component } from 'react'
import { Table } from 'reactstrap';



class Leads extends Component {







    renderLeads = () => {

        const { leads } = this.props;

        if (leads.length > 0) {


            return leads.map((lead, i) => {

                for (const key in lead) {
                    if (lead.hasOwnProperty(key)) {
                        const element = lead[key];
                        return (<tr>
                            <th scope="row">{i + 1}</th>
                            <td>{key}</td>
                            <td>{element}</td>

                        </tr>)
                    }
                }


            })


        } else {



            return (<div>
                <h3>No Leads for now</h3>
            </div>)
        }



    }


    render() {





        return (
            <div className="container">
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>type</th>
                            <th>lead</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.renderLeads()}
                    </tbody>
                </Table>
            </div>
        )
    }
}



export default Leads