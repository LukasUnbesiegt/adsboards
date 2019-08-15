import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import styles from './CheckBoxFilter.module.css'


class CheckBoxFilter extends Component {

    state = {
        checked: [],
        open: false
    }


    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleAngle = () => {
        return this.state.open ?
            <i className="ni ni-bold-up"></i>
            :
            <i className="ni ni-bold-down"></i>
    }


    handleToggle = (valueId) => {

        const { checked } = this.state;

        const currentIndex = checked.indexOf(valueId)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(valueId)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        this.setState({
            checked: newChecked
        }, () => {
            this.props.handleFilters(newChecked)
        })


    }

    renderList = () => (
        this.props.list ?
            this.props.list.map((value) => (
                <ListItem key={value._id} style={{ padding: '10px 0' }}>
                    <ListItemText primary={value.name} />
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onChange={() => { this.handleToggle(value._id) }}
                            checked={this.state.checked.indexOf(value._id) !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))
            : null
    )

    render() {









        return (
            <div>
                <List
                    style={{
                        borderBottom: '1px solid #dbdbdb'
                    }}
                >

                    <ListItem
                        style={{
                            padding: '10px 23px 10px 0'
                        }}
                        onClick={this.handleClick}

                    >

                        <ListItemText
                            primary={this.props.title}
                        />
                        {this.handleAngle()}

                    </ListItem>

                    <Collapse
                        in={this.state.open}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List
                            disablePadding
                            component="div"

                        >
                            {this.renderList()}

                        </List>

                    </Collapse>

                </List>
            </div>
        )
    }
}




export default CheckBoxFilter;