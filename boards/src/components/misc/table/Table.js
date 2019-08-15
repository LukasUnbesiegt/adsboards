import React, { Component } from 'react'
import { Table, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import styles from './Table.module.css'




class TableComp extends Component {



    state = {
        dropdownOpen: false
    };

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    // Handlers coming from props

    // edit document - for example a product
    productEditHandler = (id) => {

        const { editHandler } = this.props;

        editHandler(id)



    }


    // delete document
    deletingHandler = (id) => {


        this.props.deleteHandler(id)
    }


    // view - we need to view whole document for details 
    productViewHandler = (id) => {



        this.props.viewHandler(id)


    }



    renderTableHeads = () => {
        const { tableheads } = this.props;

        return tableheads.map((head, i) => {

            return (
                <th key={i}>{head}</th>
            )

        })
    }





    renderTableRows = () => {
        const {
            rows,
            selectedRowItems,
            tableheads,
            editStyle,
            handlers


        } = this.props;



        const renderActionsDD = (id, item) => {





            const renderActionsHandler = () => {


                if (handlers) {

                    return handlers.map((handler, i) => {

                        return (

                            <a
                                class="dropdown-item"
                                onClick={() => { handler.func(id, item) }}

                            >

                                {handler.name}

                            </a>




                        )


                    })



                }



            }


            return (
                <div className="dropdown" >
                    <button className="btn  btn-sm btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        manage
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink"  >
                        {renderActionsHandler()}
                    </div>



                </div>
            )
        }






        if (rows) {



            return rows.map((row, i) => {

                console.log(row)
                return (
                    <tr
                        key={i}
                    >


                        {
                            tableheads.map((head, i) => {
                                return (<td
                                    key={i}
                                >
                                    {row[head]}
                                </td>)
                            })
                        }
                        <td >
                            {renderActionsDD(row.id)}
                        </td>


                    </tr>
                )
            })


        }
    }


    renderTable = () => {

        return (

            <Table
                hover
                bordered
                responsive



            >

                <thead>
                    {this.renderTableHeads()}

                </thead>

                <tbody>
                    {this.renderTableRows()}



                </tbody>


            </Table>


        )


    }

    render() {


        return (




            <div className="container-fluid">
                {this.renderTable()}
            </div>
        )
    }


}


export default TableComp;