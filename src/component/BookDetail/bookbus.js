import React from "react";
import "./book.css";
import { addReservation, deleteReservation, getReservationByBusId } from "../Action/reservation"
import { Link } from "react-router-dom"
import { getSingleBus } from "../Action/buses"
import { connect } from "react-redux"

import SeatsLayout from "../Seats/seats"

class BookBus extends React.Component {
    constructor(props) {
        super(props);

        this.onContactChange = this.onContactChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onItemChange = this.onItemChange.bind(this)

        this.state = {
            places: ["Chabail", "Gausala", "Koteshwor", "New Bus Park", "Old Bus Park", "Balkhu", "Kalanki"],
            contact: "",
            pick_up_place: "",
            isFormSubmit: 0,
            bookedSeats: this.props.reserve_seats != null ? this.props.reserve_seats.seats_number : null,
        }
    }

    componentWillMount() {
        console.log(this.props.match.params.id)
        this.props.getReservationByBusId(this.props.match.params.id)
    }

    onContactChange(e) {
        this.setState({
            contact: e.target.value
        })
    }

    onFormSubmit() {
        const contact = this.state.contact;

        if (contact) {
            console.log(contact)

            this.setState({
                contact: ""
            })
        }
    }

    onItemChange(e) {
        this.setState({
            pick_up_place: e.target.value
        })
    }

    onFormSubmit() {
        setTimeout(() => {
            this.setState({
                isFormSubmit: 1
            })
        }, 1000)
    }

    render() {
        console.log(this.state.bookedSeats)
        return (
            <div className="book">
                <div className="book_seat-layout">
                    <div className="book_seat-layout-main">
                        <SeatsLayout
                            isFormSubmit={this.state.isFormSubmit}
                            pick_up_place={this.state.pick_up_place}
                            contact={this.state.contact}
                            bookedSeats={this.props.reserve_seats != null ? this.props.reserve_seats : null}
                        />
                    </div>
                </div>
                <div className="book_seat-control">
                    <div className="book_seat-booked">
                        <h5 className="book_seat-title"> Unavailable Seats Number:  </h5>
                        {
                            this.state.bookedSeats != null ?
                                this.state.bookedSeats.map((docs, i) => {
                                    return (
                                        <p className={`book_seat-item-${i + 1}`}> {docs}, </p>
                                    )
                                })
                                : <p> All seats are available </p>
                        }
                    </div>

                    <div className="seat_indicator">
                        {/* <p className='seat_indicator-red'>
                            Unavailable
                        </p> */}
                        <p className='seat_indicator-green'>
                            Booked
                        </p>
                    </div>
                    <div className="control_form">
                        <h3 className="control_form-title"> Book Now </h3>
                        <input type="text" placeholder="Contact Number" className="control_form-form" value={this.state.contact} onChange={this.onContactChange} />
                        <select className="control_form-select" onChange={this.onItemChange}>
                            {
                                this.state.places.map((docs) => {
                                    return <option key={docs} value={docs}> {docs} </option>
                                })
                            }
                        </select>
                        {
                            localStorage.getItem('token') === null
                                ?
                                <p className="control_form-text"> <Link to="/login"> Login </Link> to book seats </p>
                                : null
                        }

                        <button className="control_form-btn" onClick={this.onFormSubmit} disabled={localStorage.getItem('token') === null}> Book </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bus: state.SingleBus != null ?
            state.SingleBus : null,
        reserve_seats: state.ReserveSeats != null ? state.ReserveSeats : null
    }
}

export default connect(mapStateToProps, { getSingleBus, addReservation, deleteReservation, getReservationByBusId })(BookBus)