import React from "react";
import Routes from "./routes"
import Buses from "./bus"
import Reservation from "./reservation"
import AdminForm from "./adminForm"
import { withRouter } from "react-router-dom"

import { getAllBuses } from "../Action/buses"

import "./admin.css"
import { connect } from "react-redux";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        
        this.onBtnClicked = this.onBtnClicked.bind(this)

        this.state = {
            showComp: localStorage.getItem("admin") ? 1 : 0,
            isBtnClicked: false
        }
    }

    onShowComp(val) {
        this.setState({
            showComp: val
        })
    }

    componentDidMount() {
        this.props.getAllBuses()
    }


    onBtnClicked() {
        this.setState((prevState, props) => {
            return {
                isBtnClicked: !prevState.isBtnClicked
            }
        }, () => {
            if (this.state.isBtnClicked) {
                this.setState({
                    showComp: 1
                })
            }
        })
    }

    render() {
        return (
            <div className="admin_container container">
                <div className="m_admin-header">
                    <div className="m_admin-header_content row">
                        <div className='col'>
                            <a onClick={() => this.onShowComp(0)}>  </a>
                        </div>
                        <div className='col'>
                            <a onClick={() => this.onShowComp(1)}> Buses </a>
                        </div>
                        <div className='col'>
                            <a onClick={() => this.onShowComp(2)}> Routes </a>
                        </div>

                        {
                            localStorage.getItem("admin") ? <div>
                                <button onClick={() => {
                                    localStorage.removeItem("admin")
                                    this.setState({
                                        showComp: 0
                                    })
                                }}> Logout Admin </button>
                            </div> : null
                        }
                    </div>
                </div>

                <div className="container">
                    {
                        this.state.showComp === 0 ?
                            <AdminForm
                                onBtnClicked={() => this.onBtnClicked()}
                            /> :
                            this.state.showComp === 1 ?
                                <Buses /> :
                                this.state.showComp === 2 ?
                                    <Routes /> : null
                    }
                </div>
            </div>
        )
    }
}

export default connect(null, { getAllBuses })(withRouter(Admin))