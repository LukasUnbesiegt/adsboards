import React, { Component, Fragment } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';





class PaginationComp extends Component {


    render() {

        const { items, isActiveColor, submitCallback } = this.props;
        let lastPage, hasNextPage, hasPreviousPage, currentPage;



        if (items) {
            lastPage = items.lastPage;
            hasNextPage = items.hasNextPage;
            hasPreviousPage = items.hasPreviousPage;
            currentPage = items.currentPage
        }


        const renderPagination = () => {



            if (lastPage) {

                return Array.from(Array(lastPage), (item, index) => {


                    let isActive;
                    if ((index + 1) === currentPage) {
                        isActive = `${isActiveColor}`
                    } else {
                        isActive = 'transparent'
                    }



                    return (
                        <PaginationItem >
                            <PaginationLink
                                style={{
                                    backgroundColor: isActive,

                                }}
                                onClick={() => {

                                    if (items) {
                                        submitCallback(null, (index + 1))


                                    }
                                }}

                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })


            }



        }



        return (





            <div>
                <Pagination aria-label="Page navigation example" >

                    {
                        hasPreviousPage && <PaginationItem >
                            <PaginationLink
                                previous

                                onClick={
                                    () => {
                                        if (items) {
                                            submitCallback(null, (items.currentPage - 1))
                                        }


                                    }
                                }

                            />
                        </PaginationItem>
                    }

                    {renderPagination()}


                    {

                        hasNextPage && <PaginationItem>


                            <PaginationLink
                                next
                                onClick={() => {
                                    if (items) {
                                        submitCallback(null, (items.currentPage + 1))
                                    }

                                }}

                            />
                        </PaginationItem>


                    }

                </Pagination>
            </div>
        )
    }
}


export default PaginationComp;