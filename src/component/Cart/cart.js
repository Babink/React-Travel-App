import React from "react";
import "./cart.css"

import { connect } from "react-redux"
import { getUserReservation } from "../Action/reservation"

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentWillUpdate() {
        if (localStorage.getItem("token") === null) {
            this.props.history.push("/")
        }
    }
    componentWillMount() {
        if (localStorage.getItem("token") != null) {
            console.log("Starting....")
            this.props.getUserReservation()
        }
        else {
            this.props.history.push("/")
        }
    }
    render() {
        if(this.props.carts != null){
            console.log(this.props.carts , "XXX")
        }
        return (
            <div>
                <h4> aThis will be cart page </h4>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carts: state.UserCarts != null ? state.UserCarts : null
    }
}

export default connect(mapStateToProps, { getUserReservation })(Cart)