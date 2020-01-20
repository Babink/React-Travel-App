import React from "react"
import { connect } from "react-redux"
import { addBuses } from "../Action/buses"
import { withRouter } from "react-router-dom"

class Bus extends React.Component {
    constructor(props) {
        super(props);

        this.onNameChange = this.onNameChange.bind(this)
        this.onCompanyChange = this.onCompanyChange.bind(this)
        this.onBusNumberChange = this.onBusNumberChange.bind(this)
        this.onContactChange = this.onContactChange.bind(this)
        this.onMainImageChange = this.onMainImageChange.bind(this)
        this.onSecondImageChange = this.onSecondImageChange.bind(this)
        this.onThirdImageChange = this.onThirdImageChange.bind(this)
        this.onLuxuryChange = this.onLuxuryChange.bind(this)
        this.onTotalSeatsChange = this.onTotalSeatsChange.bind(this)
        this.onAddBus = this.onAddBus.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onWifiChange = this.onWifiChange.bind(this)
        this.onBottleChange = this.onBottleChange.bind(this)
        this.onChargerChange = this.onChargerChange.bind(this)
        this.onTvChange = this.onTvChange.bind(this)

        this.state = {
            name: '',
            company: '',
            bus_num: '',
            bus_contact: '',
            main_img: '',
            second_img: '',
            third_img: '',
            lux_type: '',
            total_seats: '',
            bus_description: "",
            amenities: "",
            wifi: "",
            tv: "",
            charger: "",
            water_bottle: ""

            // amenities_list: [
            //     { "id": 1, "name": "Wifi", "icon": "https://image.flaticon.com/icons/png/512/63/63586.png" },
            //     { "id": 2, "name": "TV", "icon": "https://image.flaticon.com/icons/png/512/929/929958.png" },
            //     { "id": 3, "name": "Charging Point", "icon": "https://image.flaticon.com/icons/png/512/780/780500.png" },
            //     { "id": 4, "name": "Water Bottle", "icon": "https://image.flaticon.com/icons/png/512/824/824188.png" },
            // ]
        }
    }

    componentWillMount() {
        if (localStorage.getItem("admin") === null) {
            alert("You don't have administrator access")
            this.props.history.push("/")
        }
    }
    componentWillUpdate() {
        if (localStorage.getItem("admin") === null) {
            alert("You don't have administrator access")
            this.props.history.push("/")
        }
    }




    onNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    onCompanyChange(e) {
        this.setState({
            company: e.target.value
        })
    }

    onBusNumberChange(e) {
        this.setState({
            bus_num: e.target.value
        })
    }

    onContactChange(e) {
        this.setState({
            bus_contact: e.target.value
        })
    }

    onMainImageChange(e) {
        this.setState({
            main_img: e.target.value
        })
    }

    onSecondImageChange(e) {
        this.setState({
            second_img: e.target.value
        })
    }

    onThirdImageChange(e) {
        this.setState({
            third_img: e.target.value
        })
    }

    onLuxuryChange(e) {
        this.setState({
            lux_type: e.target.value
        })
    }

    onTotalSeatsChange(e) {
        this.setState({
            total_seats: e.target.value
        })
    }

    onDescriptionChange(e) {
        this.setState({
            bus_description: e.target.value
        })
    }

    onWifiChange(e) {
        this.setState({
            wifi: "true"
        })
    }

    onTvChange(e) {
        this.setState({
            tv: "true"
        })
    }

    onBottleChange(e) {
        this.setState({
            water_bottle: "true"
        })
    }

    onChargerChange(e) {
        this.setState({
            charger: "true"
        })
    }

    onAddBus() {
        const data = {
            "name": this.state.name,
            "company": this.state.company,
            "bus_num": this.state.bus_num,
            "bus_contact": this.state.bus_contact,
            "main_img": this.state.main_img,
            "second_img": this.state.second_img,
            "third_img": this.state.third_img,
            "lux_type": this.state.lux_type,
            "total_seats": this.state.total_seats,
            "bus_description": this.state.bus_description,
            "amenities": {
                "wifi": this.state.wifi,
                "tv": this.state.tv,
                "charger": this.state.charger,
                "water_bottle": this.state.water_bottle
            }
        }

        console.log(data)

        if (this.state.name) {
            const status = this.props.addBuses(data)
            console.log(status)
            this.setState({
                name: '',
                company: '',
                bus_num: '',
                bus_contact: '',
                main_img: '',
                second_img: '',
                third_img: '',
                lux_type: '',
                total_seats: '',
                bus_description: '',
                amenities: ''
            })
        }
        else {
            console.log("Unable to add")
        }
    }

    render() {
        return (
            <div className="container">
                <h3> This will be bus page </h3>

                <div className="col">
                    <div className="row-1">
                        <input type="text"
                            className="form-control"
                            onChange={this.onNameChange}
                            value={this.state.name}
                            placeholder="Name"
                        />
                    </div>

                    <div className="row-1">
                        <input type="text"
                            className="form-control"
                            placeholder="Company"
                            value={this.state.company}
                            onChange={this.onCompanyChange}
                        />
                    </div>

                    <div className="row-1">
                        <input type="number"
                            className="form-control"
                            placeholder="Bus Number"
                            value={this.state.bus_num}
                            onChange={this.onBusNumberChange}
                        />
                    </div>

                    <div className="row-1">
                        <input type="number"
                            className="form-control"
                            placeholder="Bus Contact"
                            value={this.state.bus_contact}
                            onChange={this.onContactChange}
                        />
                    </div>


                    <div className="row-1">
                        <input type="text"
                            className="form-control"
                            placeholder="Bus Main Image"
                            value={this.state.main_img}
                            onChange={this.onMainImageChange}
                        />
                    </div>

                    <div className="row-1">
                        <input type="text"
                            className="form-control"
                            placeholder="Bus Image 2"
                            value={this.state.second_img}
                            onChange={this.onSecondImageChange}
                        />
                    </div>

                    <div className="row-1">
                        <input type="text"
                            className="form-control"
                            placeholder="Bus Image 3"
                            value={this.state.third_img}
                            onChange={this.onThirdImageChange}
                        />
                    </div>

                    <div className="row-1">
                        <input type="number"
                            className="form-control"
                            placeholder="Luxury Type"
                            value={this.state.lux_type}
                            onChange={this.onLuxuryChange}
                        />
                    </div>

                    <div className="row-1">
                        <input type="number"
                            className="form-control"
                            placeholder="Total Seats"
                            value={this.state.total_seats}
                            onChange={this.onTotalSeatsChange}
                        />
                    </div>

                    <div className="row-1">
                        <textarea type="text"
                            className="form-control"
                            placeholder="Bus Description"
                            value={this.state.bus_description}
                            onChange={this.onDescriptionChange}
                        />
                    </div>

                    <div className="row-1">
                        <label>
                            <input type="radio" onChange={this.onWifiChange} />
                            Wifi
                        </label>

                        <label>
                            <input type="radio" onChange={this.onBottleChange} />
                            Water Bottle
                        </label>

                        <label>
                            <input type="radio" onChange={this.onTvChange} />
                            TV
                        </label>

                        <label>
                            <input type="radio" onChange={this.onChargerChange} />
                            Charging Plug
                        </label>
                    </div>

                    <div className="row-1">
                        <button className="btn btn-primary" onClick={this.onAddBus}> Add Bus </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { addBuses })(withRouter(Bus))