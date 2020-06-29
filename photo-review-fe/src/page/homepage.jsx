import React from 'react';
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
    render() {
        return (
            <div>
                <Drawer users={this.state.usersarray} groups={this.state.groupsarray}></Drawer>
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
        Axios.get(`http://localhost:5000/getgroups`)
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    this.setState({
                        groupsarray: res.data.data
                    })
                }
            })
    };

}
export default Homepage;