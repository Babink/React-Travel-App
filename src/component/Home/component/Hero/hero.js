import React from "react";
import { withRouter } from "react-router-dom"

class Hero extends React.Component {
    constructor(props) {
        super(props);

        this.onViewAllTour = this.onViewAllTour.bind(this);
    }


    onViewAllTour() {
        this.props.history.push('/tour')
    }


    render() {
        return (
            <div className="container">
                <div className="row align-items-center">
                    <h3> Visit Nepal 2020 </h3>
                </div>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.onViewAllTour}> View All </button>
                </div>
            </div>
        )
    }
}

export default withRouter(Hero)