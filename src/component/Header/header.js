import React from "react";
import { withRouter } from "react-router-dom"
import "./header.css"
import VisitNepal from "../../assets/visit_np.png"

import { connect } from "react-redux"
import { removeAccessToken, removeRefreshToken, getUserIdByName } from "../Action/auth"

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.redirectMe = this.redirectMe.bind(this)
        this.onLogoutUser = this.onLogoutUser.bind(this)

        this.state = {
            home: true,
            login: false,
            create_acc: false
        }
    }

    redirectMe(to) {
        this.props.history.push(`${to}`)
    }

    onLogoutUser() {
        const token = localStorage.getItem('token')

        if (token != null) {
            this.props.removeAccessToken()
                .then(() => {
                    this.props.removeRefreshToken()

                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    this.redirectMe('/')
                })
        }
    }

    componentWillUpdate() {
        const token = localStorage.getItem('token')

        if (token != null) {
            this.props.getUserIdByName()
        }
    }

    renderUserName() {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user != null) {
            return <a className="right-list-3"> Welcome: {user.username} </a>
        }
    }

    render() {
        return (
            <div className="header_main">
                <div className="header_left">
                    <img src={VisitNepal} className="left-img" />
                </div>
                <div className="header_right">
                    <button className="right-btn" onClick={() => this.redirectMe('/search')}> Search </button>

                    {
                        JSON.parse(localStorage.getItem('token')) != null ?
                            <div className="right-list">
                                <a className="right-list-1" onClick={() => this.redirectMe("/")}> Home </a>
                                <a className="right-list-2" onClick={this.onLogoutUser}> Logout </a>
                                {this.renderUserName()}
                                <a className="right-list-4" onClick={() => this.redirectMe('/cart')}> Carts </a>
                            </div>
                            :
                            <div className="right-list">
                                <a className="right-list-1" onClick={() => this.redirectMe("/")}> Home </a>
                                <a className="right-list-2" onClick={() => this.redirectMe("/login")}> Login </a>
                                <a className="right-list-3" onClick={() => this.redirectMe("/register")}> Create Account </a>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default connect(null, { removeAccessToken, removeRefreshToken, getUserIdByName })(withRouter(Header));