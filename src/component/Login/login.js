import React from "react";
import { Link } from "react-router-dom"
import "./login.css"
import { connect } from "react-redux"
import { loginUser, getUserIdByName } from "../Action/auth"
import { getUserReservation } from "../Action/reservation"

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onNameChange = this.onNameChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onRedirect = this.onRedirect.bind(this)
        this.onLoginSubmit = this.onLoginSubmit.bind(this)

        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }


    componentWillMount() {
        const token = localStorage.getItem('token')

        if (token != null) {
            this.onRedirect('/')
        }
    }

    componentWillUpdate() {
        const token = localStorage.getItem('token')

        if (token != null) {
            this.onRedirect('/')
        }
    }

    onRedirect(to) {
        this.props.history.push(`${to}`)
    }

    onNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    onEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    onLoginSubmit() {
        const { name, email, password } = this.state

        if (name.length >= 3 && email.includes("@") && password.length >= 5) {
            this.props.loginUser({
                "username": name,
                email,
                password
            })
                .then(() => {
                    const token = JSON.parse(localStorage.getItem('token'))

                    if (token) {
                        this.props.getUserIdByName()
                        this.props.getUserReservation()
                        this.onRedirect('/')
                    }
                    else {
                        this.setState({
                            error: "Please enter correct login credientials"
                        })
                    }
                })
        }
        else {
            this.setState({
                error: "Please add all required field"
            })
        }
    }
    render() {
        return (
            <div className="login">
                <div className="login-form">
                    <h4 className="login-form-title"> Login Page </h4>
                    {
                        this.state.error ? <p style={{ color: "red" }}> {this.state.error} </p> : undefined
                    }
                    <input type="text" placeholder="User Name" value={this.state.name} onChange={this.onNameChange} className="login-form-1" />
                    <input type="text" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} className="login-form-2" />
                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} className="login-form-3" />

                    <button className="login-form-btn"
                        onClick={this.onLoginSubmit}
                        style={{ marginTop: "20px" }}> Login </button>


                    <Link to="/register" className="login-form-link"> Don't have Account? Register Now </Link>
                </div>
            </div>
        )
    }
}

export default connect(null, { loginUser, getUserIdByName, getUserReservation })(Login)