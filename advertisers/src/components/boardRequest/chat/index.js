
import React, { Component } from 'react'
import MessageBox from './MessageBox/MessageBox'
import ChatList from './ChatLists/ChatLists'
import styles from './index.module.css'
import { connectToChat, isRoomExist, sendMessage } from '../../../actions/userActions'
import { connect } from 'react-redux'


class index extends Component {


    state = {
        messages: [],
        currentRoom: null,
        currentUser: null,
        isLoading: true

    }

    connectToRoom = (id, currentUser) => {
        // const { currentUser } = this.state;
        console.log('id', id)
        console.log('currentUser', currentUser)
        return currentUser
            .subscribeToRoom({
                roomId: `${id}`,
                messageLimit: 100,
                hooks: {
                    onMessage: message => {


                        this.setState({
                            messages: [...this.state.messages, message]
                        });
                    }
                }
            })
            .then(currentRoom => {
                this.setState({
                    currentRoom
                });
            });
    }
    componentDidMount() {



        if (this.props.advertiser && this.props.schedule) {
            this.props.connectToChat({ id: this.props.advertiser._id, name: this.props.schedule.board.name || 'owner' }, this.props.schedule._id, (currentUser, exist) => {

                // currentUser.fetchMultipartMessages({
                //     roomId: this.props.schedule._id,
                //     initialId: 42,
                //     direction: 'older',
                //     limit: 10,
                // })
                //     .then(messages => {
                //         this.setState({
                //             messages: messages
                //         })
                //     })
                //     .catch(err => {
                //         console.log(`Error fetching messages: ${err}`)
                //     })

                this.setState({
                    currentUser: currentUser
                })

                if (exist.exist) {

                    if (currentUser.id === this.props.advertiser._id) {
                        console.log('same account')
                        this.connectToRoom(exist.roomId, currentUser)

                    } else {
                        console.log('different account')
                        return currentUser.addUserToRoom({
                            userId: this.props.advertiser._id,
                            roomId: exist.roomId
                        })
                            .then(() => {
                                this.connectToRoom(exist.roomId, currentUser)
                            })

                    }



                } else {
                    return currentUser
                        .createRoom({
                            name: this.props.schedule._id,
                            id: this.props.schedule._id
                        })
                        .then(room => this.connectToRoom(room.id, currentUser))


                }





            })



        }



    }



    render() {


        console.log('currentRoom', this.state.currentRoom)
        console.log('messages', this.state.messages)

        return (



            <div className={`${styles.ChatBoxWrapper}`}>

                <div>

                    <ChatList
                        messages={this.state.messages}
                        schedule={this.props.schedule}
                        advertiser={this.props.advertiser}

                    />
                </div>

                <div className="position-relative">
                    <MessageBox
                        sendMessage={this.props.sendMessage}
                        currentUser={this.state.currentUser}
                        currentRoom={this.state.currentRoom}

                    />
                </div>


            </div>
        )
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    connectToChat,
    isRoomExist, sendMessage

}


export default connect(mapStateToProps, mapDispatchToProps)(index);