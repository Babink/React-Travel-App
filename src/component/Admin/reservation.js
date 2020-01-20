import React from "react";
import { withRouter } from "react-router-dom"

class Reservation extends React.Component {
    componentWillMount(){
        if(localStorage.getItem("admin") === null){
            alert("You Don't have administrator access")
            this.props.history.push("/")
        }
    }
    componentWillUpdate(){
        if(localStorage.getItem("admin") === null){
            alert("You Don't have administrator access")
            this.props.history.push("/")
        }
    }

    render() {
        return (
            <div>
                <h3> This will be reservation page </h3>
            </div>
        )
    }
}

export default withRouter(Reservation)