import React, { Component } from 'react'
import styles from './ChatLists.module.css'
import moment from 'moment'



class ChatLists extends Component {




    renderMessages = () => {

        const { messages, advertiser } = this.props;
        // const rightDiv = ``
        // const rightImg = `${styles.imgRight}`

        if (messages.length > 0) {

            return messages.map((message) => {

                if (advertiser) {

                    if (message.senderId === advertiser._id) {


                        return (
                            <div className={`${styles.container}`}>
                                <img src="https://via.placeholder.com/150" alt="Avatar" />
                                <p>{message.text}</p>
                                <span className={`${styles.timeRight}`}>{moment(message.updatedAt).format('DD MM YYYY H A')}</span>
                            </div>
                        )


                    } else {

                        return (
                            <div className={`${styles.container} ${styles.darker}`}>
                                <img src="https://via.placeholder.com/150" alt="Avatar" className={`${styles.imgRight}`} />
                                <p>{message.text}</p>
                                <span className={`${styles.timeLeft}`}>{moment(message.updatedAt).format('DD MM YYYY H A')}</span>
                            </div>
                        )


                    }



                }



            })
        } else {
            return (
                <div className="text-center my-2 py-2">
                    <h4>Loading messages wait a moment or there are no messages at all.</h4>
                </div>
            )

        }



    }

    render() {




        return (


            <div
                className={`${styles.ListsWrapper} my-2 py-2 card mx-2 px-2`}
            >
                <div className="card-header">

                    <h5 className="text-center">{this.props.schedule.board.name || 'owner'}</h5>
                </div>
                {this.renderMessages()}


            </div>
        )
    }
}




export default ChatLists;