import React from "react";
import { Link } from "react-router-dom"
import "./signup.css"
import { connect } from "react-redux"
import { registerUser, getUserIdByName } from "../Action/auth"

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onSignupUser = this.onSignupUser.bind(this)
        this.onRedirect = this.onRedirect.bind(this)

        this.state = {
            username: "",
            email: "",
            password: "",
            error: ""
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

    onUsernameChange(e) {
        this.setState({
            username: e.target.value
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

    onSignupUser() {
        const { username, email, password } = this.state

        if (username.length >= 3 && email.includes("@") && password.length >= 5) {
            this.props.registerUser({
                "username": username,
                "email": email,
                "password": password
            }).then(() => {
                const token = JSON.parse(localStorage.getItem('token'))

                if (token) {
                    this.props.getUserIdByName()
                    this.props.history.push('/')
                }
                else {
                    console.log("STAY HERE")
                    alert("Error while Creating Account")
                }
            })
        }
        else {
            this.setState({
                error: "Error while Creating Account , please consider using strong password and correct email address"
            })
        }
    }
    render() {
        return (
            <div className="login">
                <div className="login-form">
                    <h4 className="login-form-title"> Register Account </h4>
                    {
                        this.state.error ? <p className="signup-form-1" style={{ color: "red" }}> {this.state.error} </p> : undefined
                    }
                    <input type="text" placeholder="User Name" value={this.state.username} onChange={this.onUsernameChange} className="login-form-1" />
                    <input type="text" placeholder="Email" className="signup-form-5" value={this.state.email} onChange={this.onEmailChange} className="login-form-2" />
                    <input type="password" placeholder="Password" className="signup-form-6" value={this.state.password} onChange={this.onPasswordChange} className="login-form-3" />

                    <button className="login-form-btn" onClick={this.onSignupUser}> Register Now </button>
                    <Link to="/login" className="login-form-link"> Have An Account? Login </Link>
                </div>
            </div>
        )
    }
}

export default connect(null, { registerUser, getUserIdByName })(Signup)