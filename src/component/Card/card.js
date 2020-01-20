import React from "react";
import "./card.css"
import { connect } from "react-redux"
import { getSingleBus } from "../Action/buses"
import { withRouter } from "react-router-dom"

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.onViewDetail = this.onViewDetail.bind(this)
        this.onBookNow = this.onBookNow.bind(this)
    }

    onViewDetail({ bus_id, route_from, route_to }) {
        this.props.getSingleBus(bus_id).then(() => {
            this.props.history.push(`/bus/${route_from}/${route_to}/detail`)
        })
    }

    onBookNow({ bus_id, route_from, route_to }) {
        this.props.getSingleBus(bus_id)
            .then(() => {
                this.props.history.push(`/bus/${route_from}/${route_to}/book/${JSON.parse(bus_id)}`)
            })
    }

    render() {
        console.log(this.props.data)
        return (
            <div className="card">
                {
                    this.props.data ?
                        <div className="card_container">
                            <div className="card_info">
                                <img className="card_info-img" src={this.props.data.bus_info.bus_image} />
                                <div className="card_info-detail">
                                    <h4 className="to-card"> To </h4>
                                    <h4 className="card_info-from"> {this.props.data.route_from} </h4>
                                    <h4 className="card_info-to"> {this.props.data.route_to} </h4>
                                    <h4 className="card_info-highway"> {this.props.data.highway} Highway </h4>
                                    <h4 className="card_info-seats"> Available Seats: {this.props.data.bus_info.available_seats} </h4>
                                    <h4 className="card_info-lux"> Luxury Type: {this.props.data.bus_info.lux_type} </h4> 
                                    <h4 className="card_info-name"> {this.props.data.bus_info.name} </h4> 
                                    <h4> Price: {this.props.data.price} </h4> 
                                </div>
                            </div>

                            <div className="card_btn">
                                <button className="card_btn-detail" onClick={() => this.onViewDetail(this.props.data)}> Details </button>
                                <button className="card_btn-book" onClick={() => this.onBookNow(this.props.data)}> Book Now </button>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

export default connect(null, { getSingleBus })(withRouter(Card))