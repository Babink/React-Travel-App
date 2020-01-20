import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Wifi from "../../assets/wifi.png"
import TV from "../../assets/television.png"
import Plug from "../../assets/plug.png"
import Bottle from "../../assets/bottle.png"
import "./book.css"

// Main Focus for UI
class BusDetails extends React.Component {
    constructor(props) {
        super(props);

        this.onBookBus = this.onBookBus.bind(this);
    }
    componentWillMount() {
        setTimeout(() => {
            if (this.props.bus === null) {
                this.props.history.push("/")
            }
        }, 1500)
    }

    onBookBus() {
        this.props.history.push(`/bus/${this.props.match.params.from}/${this.props.match.params.to}/book/${JSON.parse(this.props.bus.uid)}`)
    }

    render() {
        console.log(this.props.bus)
        return (
            <div className="bus_detail">
                {
                    this.props.bus != null ?
                        <div className="bus_detail-header">
                            <div className="bus_detail-info">
                                <p className="bus_detail-info-name"> Bus Name: {this.props.bus.name} </p>
                                <p className="bus_detail-info-company"> Bus Company: {this.props.bus.company} </p>
                                <p className="bus_detail-info-lux_type"> Luxury Type: {this.props.bus.lux_type} </p>
                                <p className="bus_detail-info-number"> Bus Number: {this.props.bus.bus_number} </p>
                                <p className="bus_detail-info-contact"> Bus Contact:  {this.props.bus.bus_contact} </p>
                                <p className="bus_detail-info-seats"> {this.props.bus.total_seats} </p>
                            </div>

                            <div className="bus_detail-available">
                                <p className="bus_detail-available-header"> Availables </p>
                                {
                                    this.props.bus != null
                                        ?
                                        <div className="bus_icons">
                                            {
                                                this.props.bus.amenities.wifi ?
                                                    <img className="bus_icons-1" src={Wifi} />
                                                    : null
                                            }

                                            {
                                                this.props.bus.amenities.water_bottle ?
                                                    <img className="bus_icons-2" src={Bottle} />
                                                    : null
                                            }

                                            {
                                                this.props.bus.amenities.charging_plug ?
                                                    <img className="bus_icons-3" src={Plug} />
                                                    : null
                                            }

                                            {
                                                this.props.bus.amenities.tv ?
                                                    <img className="bus_icons-4" src={TV} />
                                                    : null
                                            }
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                        : null
                }

                {
                    this.props.bus != null
                        ?
                        <div className="bus_description">
                            <div className="bus_des">
                                <p> {this.props.bus.bus_description} </p>
                            </div>

                            <div className="bus_img">
                                <img src={this.props.bus.bus_image} className="bus_img-1" />
                                <img src={this.props.bus.bus_image_1} className="bus_img-2" />
                                <img src={this.props.bus.bus_image_2} className="bus_img-3" />
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bus: state.SingleBus != null ? state.SingleBus : null
    }
}

export default connect(mapStateToProps)(BusDetails)


// (Enhance Search Algorithms incl dates , nof ppl , availables seats , price)
// Authentication (last)

//  -- UI PART --

// Book (incl. Seat Layout) and Backend Seats Architecture (Reservation)
// UI
// Admin Reservation List