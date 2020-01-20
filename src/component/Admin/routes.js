import React from "react";
import { AddRoutes } from "../Action/routes"
import { connect } from "react-redux"

class Routes extends React.Component {
    constructor(props) {
        super(props);

        this.onFormChange = this.onFormChange.bind(this)
        this.onToChange = this.onToChange.bind(this)
        this.onHighwayChange = this.onHighwayChange.bind(this)
        this.onRouteAdded = this.onRouteAdded.bind(this)
        this.onBusChange = this.onBusChange.bind(this)
        this.onPriceChange = this.onPriceChange.bind(this)

        this.state = {
            from: '',
            to: '',
            highway: '',
            bus_id: '',
            price: ""
        }
    }

    componentWillMount() {
        if (localStorage.getItem("admin") === null) {
            alert("You Don't have administrator access")
            this.props.history.push("/")
        }
    }
    componentWillUpdate() {
        if (localStorage.getItem("admin") === null) {
            alert("You Don't have administrator access")
            this.props.history.push("/")
        }
    }


    onFormChange(e) {
        const from = e.target.value

        this.setState({
            from
        })
    }

    onToChange(e) {
        const to = e.target.value

        this.setState({
            to
        })
    }

    onHighwayChange(e) {
        const highway = e.target.value

        this.setState({
            highway
        })
    }

    onRouteAdded() {
        if (this.state.from) {
            this.props.AddRoutes({
                "from": this.state.from,
                "to": this.state.to,
                "highway": this.state.highway,
                "price": this.state.price,
                "bus_id": JSON.parse(this.state.bus_id)
            }).then(() => {
                this.setState({
                    from: '',
                    to: '',
                    highway: ''
                })
            })
        }
        else {
            console.log("Error while adding data")
        }
    }

    onBusChange(e) {
        this.setState({
            bus_id: e.target.value
        })
    }

    onPriceChange(e) {
        this.setState({
            price: e.target.value
        })
    }


    render() {
        return (
            <div className="container">
                <h4> Add Routes </h4>

                <div className="col">
                    <div className="row">
                        <input type="text" placeholder="From" onChange={this.onFormChange} value={this.state.from} className="form-control" />
                        <input type="text" placeholder="To" onChange={this.onToChange} value={this.state.to} className="form-control" />
                        <input type="text" placeholder="Highway" onChange={this.onHighwayChange} value={this.state.highway} className="form-control" />
                        <input type="number" placeholder="Price" onChange={this.onPriceChange} value={this.state.price} className="form-control" />
                        <select className="form-control" onChange={this.onBusChange}>
                            {
                                this.props.buses === null ?
                                    <p> Loading Buses ... </p> :
                                    this.props.buses.map((docs) => {
                                        return <option value={docs.uid} key={docs.uid}> {docs.name} </option>
                                    })
                            }
                        </select>
                    </div>
                    <div className="row">
                        <button className="btn btn-primary" onClick={this.onRouteAdded}> Add Routes </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        buses: state.Buses != null ? state.Buses.map((docs) => {
            return docs
        }) : null
    }
}

export default connect(mapStateToProps, { AddRoutes })(Routes)