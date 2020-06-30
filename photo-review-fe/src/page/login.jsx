import React, { Component, render } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import './overall.css';


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

    }
    check = (e) => {
        axios.post('http://localhost:5000/login', { email: this.state.email, password: this.state.password })
            .then((result) => {
                localStorage.setItem("userData", JSON.stringify(result.data.data));
                this.props.history.push('/home');
            });
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };


    render() {

        return (
            <div className="loginmain">
                <h4>LOGIN</h4>
                <div>
                    <div className="signpage">
                        <div className="container">
                            {/* {(this.props.value === 0) ? <h2 className="heading">Student LOGIN</h2> : <h2 className="heading">Teacher LOGIN</h2>} */}
                            <div id="login">
                                {/* <div className="col-25">
                        <label htmlFor="fname">Email</label>
                    </div> */}
                                <div className="col-75">
                                    <input type="email" className="form-alignment" name="email" placeholder="Email" onChange={(e) => this.handleChange(e)} /><br /></div>
                                {/* <div className="col-25">
                        <label htmlFor="fname">Password</label>
                    </div> */}

                                <div className="col-75">
                                    <input type="password" className="form-alignment" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} /><br />
                                </div>
                                <button id="send" className="buttonstyle" onClick={e => this.check(e)}>Login</button>
                                <p className="para">New user?</p>
                                <button className="buttonstyle"><a className="line" href="/signup">Signup</a></button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
    ;
}
export default withRouter(Login);
