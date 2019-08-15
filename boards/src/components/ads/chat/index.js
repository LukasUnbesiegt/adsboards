
import React, { Component } from 'react'
import MessageBox from './MessageBox/MessageBox'
import ChatList from './ChatLists/ChatLists'
import styles from './index.module.css'
import { connect } from 'react-redux'
import { isEmpty } from '../../../utils/isEmpty'
import { connectToChat, isRoomExist, sendMessage } from '../../../actions/userActions'

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



        if (this.props.owner && this.props.schedule) {
            this.props.connectToChat({ id: this.props.owner._id, name: this.props.schedule.advertiser.company || 'advertiser' }, this.props.schedule._id, (currentUser, exist) => {

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

                    if (currentUser.id === this.props.owner._id) {
                        console.log('same account')
                        this.connectToRoom(exist.roomId, currentUser)

                    } else {
                        console.log('different account')
                        return currentUser.addUserToRoom({
                            userId: this.props.owner._id,
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




        return (



            <div className={`${styles.ChatBoxWrapper}`}>

                <div>

                    <ChatList
                        messages={this.state.messages}
                        schedule={this.props.schedule}
                        owner={this.props.owner}
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
    owner: !isEmpty(state.owner) ? state.owner.owner : null,
    schedule: !isEmpty(state.board) ? state.board.schedule : null
})

const mapDispatchToProps = {
    connectToChat,
    isRoomExist,
    sendMessage
}



export default connect(mapStateToProps, mapDispatchToProps)(index);