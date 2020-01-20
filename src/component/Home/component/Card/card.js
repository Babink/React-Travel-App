import React from "react";
import "../../home.css"
import { connect } from "react-redux"
import { getRoutes } from "../../../Action/routes"
import { withRouter } from "react-router-dom"


class Cards extends React.Component {
    constructor(props) {
        super(props);

        this.onFromChange = this.onFromChange.bind(this)
        this.onToChange = this.onToChange.bind(this)
        this.onNumberOfPeopleChange = this.onNumberOfPeopleChange.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.onSearchRoutes = this.onSearchRoutes.bind(this)

        this.state = {
            from: '',
            to: '',
            date: '',
            people: ''
        }
    }

    onFromChange(e) {
        this.setState({
            from: e.target.value
        })
    }

    onToChange(e) {
        this.setState({
            to: e.target.value
        })
    }

    onNumberOfPeopleChange(e) {
        this.setState({
            people: e.target.value
        })
    }

    onDateChange(e) {
        this.setState({
            date: e.target.value
        })
    }

    onSearchRoutes() {
        if (this.state.from && this.state.to && this.state.people) {
            console.log("Search Operation")

            try {
                this.props.getRoutes({
                    from: this.state.from,
                    to: this.state.to,
                    no_of_people: this.state.people
                })
                this.props.history.push(`/search/${this.state.from}/${this.state.to}/result`)

                this.setState({
                    from: '',
                    to: '',
                    date: '',
                    people: ''
                })
            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            console.log("Raise Error")
        }
    }
    render() {
        return (
            <div className="container m_card-container">
                <div className="row justify-items-center" style={{ padding: '20px' }}>
                    <a> One Way </a>
                    <a> Childrens </a>
                </div>

                <div className="row align-items-center">
                    <div className="col">
                        <input
                            type="text"
                            placeholder="From: City"
                            className="form-control"
                            onChange={this.onFromChange}
                            value={this.state.from}
                        />
                    </div>

                    <div className="col">
                        <input
                            type="text"
                            placeholder="To: City"
                            className="form-control"
                            onChange={this.onToChange}
                            value={this.state.to}
                        />
                    </div>

                    <div className="col">
                        <input
                            type="text"
                            placeholder="Date"
                            className="form-control"
                            onChange={this.onDateChange}
                            value={this.state.date}
                        />
                    </div>

                    <div className="col">
                        <input
                            type="text"
                            placeholder="Number of People"
                            className="form-control"
                            onChange={this.onNumberOfPeopleChange}
                            value={this.state.people}
                        />
                    </div>

                    <div className="col">
                        <button
                            className="btn btn-primary"
                            onClick={this.onSearchRoutes}
                        > Search </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(null, { getRoutes })(Cards))