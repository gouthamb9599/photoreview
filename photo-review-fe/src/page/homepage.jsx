import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import Drawer from '../components/drawer';
import Axios from 'axios';
class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersarray: [],
            groupsarray: [],
        }
    }
    logout = () => {
        sessionStorage.removeItem('userData');
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <Drawer users={this.state.usersarray}></Drawer>
            </div>
        )
    }
    componentDidMount() {
        Axios.get(`http://localhost:5000/getusers`)
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    this.setState({
                        usersarray: res.data.data
                    })
                }
            })
    };

}
export default withRouter(Homepage);