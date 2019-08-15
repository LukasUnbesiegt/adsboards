import React, { Component } from 'react'
import styles from './MessageBox.module.css'
import Form from './Form'



class MessageBox extends Component {


    submitHandler = (data) => {

        console.log('currentUser', this.props.currentUser)
        console.log('currentRoon', this.props.currentRoom)
        if (this.props.currentRoom && this.props.currentUser) {
            this.props.sendMessage(this.props.currentUser, this.props.currentRoom, data)
        }

    }

    render() {



        return (
            <div className={`${styles.messageBoxWrapper} m-2 p-2`}>


                <Form
                    submitCallBack={this.submitHandler}

                />




            </div>
        )
    }
}




export default MessageBox;