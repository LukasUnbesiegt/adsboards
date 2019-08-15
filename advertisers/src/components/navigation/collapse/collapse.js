import React, { Component, Fragment } from 'react'
import { ListGroup, ListGroupItem, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom'



class Term extends Component {


    state = {
        collapse: false,
        correctLinks: []
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }


    renderNavbarLinks = (links) => {
        const { i, item, changeStyle, sidebarlink } = this.props;

        return links.map((link, i) => {

            return (
                <li className="" key={i}>
                    <NavLink className={`nav-link text-white p-3 mb-2  ${sidebarlink} `}

                        to={link.linkTo}
                    >

                        <span
                            style={{
                                fontSize: '12px'
                            }}
                        >
                            {
                                changeStyle ? '' : `${link.name}`
                            }



                        </span>

                    </NavLink>

                </li>
            )


        })


    }




    render() {

        const { i, item, changeStyle, sidebarlink } = this.props;



        return (


            <Fragment>


                <li className="" key={i}>
                    <a className={`nav-link text-white p-3 mb-2  ${sidebarlink} `}

                        onClick={() => { this.toggle() }}
                    >
                        <i className={`fa ${item.icon} fa-lg`}></i>
                        <span
                            style={{
                                fontSize: '12px'
                            }}
                        >
                            {
                                changeStyle ? '' : `${item.name}`
                            }

                            {item.dropdowns && !changeStyle && (<i className="ni ni-bold-down ml-2"></i>)}

                        </span>

                    </a>

                </li>


                <Collapse isOpen={this.state.collapse}>

                    <div className="container my-3 py-3">

                        <div className="row">
                            <div className="col-12 text-center">
                                {
                                    this.renderNavbarLinks(item.links)
                                }


                            </div>

                        </div>

                    </div>

                </Collapse>
            </Fragment>


        )
    }
}




export default Term;