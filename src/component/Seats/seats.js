import React from "react";
import "./seats.css"
import Chair from "../../assets/chair.svg"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { addReservation } from "../Action/reservation"

class Seats extends React.Component {
    constructor(props) {
        super(props);

        this.onLeftSeatClicked = this.onLeftSeatClicked.bind(this)
        this.onRightSeatClicked = this.onRightSeatClicked.bind(this)

        this.state = {
            seats: this.props.bus != null ? this.props.bus.total_seats : null,
            seats_arr_1: [],
            seats_arr_2: [],
            booked_seats: [],
            left_book: [], // odd
            right_book: [],
        }
    }

    componentWillMount() {
        // if (this.state.bookedSeats != null) {
        //     const left_book = this.state.left_book
        //     const right_book = this.state.right_book
        //     this.state.bookedSeats.map((docs) => {
        //         if ((docs % 2) === 0) {
        //             right_book.push(docs)
        //         }
        //         else {
        //             left_book.push(docs)
        //         }
        //     })

        //     this.setState
        //         ({
        //             left_book,
        //             right_book
        //         })
        // }

        if (this.props.bus === null) {
            this.props.history.push('/')
        } else {
            for (let i = 0; i < this.state.seats; i++) {
                if ((i % 2) === 1) {
                    this.state.seats_arr_1.push(i)
                }
                else {
                    this.state.seats_arr_2.push(i)
                }
            }
        }
    }

    componentDidUpdate() {
        if (this.props.isFormSubmit === 1 && localStorage.getItem('token') != null) {
            console.log(JSON.parse(localStorage.getItem('user'))._id)
            this.props.addReservation({
                "user_id": JSON.parse(localStorage.getItem('user'))._id,
                "bus_id": this.props.match.params.id,
                "seats_number": this.state.booked_seats,
                "departure_date": "july 2nd",
                "contact": this.props.contact,
                "pick_up_place": this.props.pick_up_place
            })
                .then(() => {
                    alert("Successfully booked")
                })
        }
    }

    onLeftSeatClicked(index, e) {
        const { style } = e.target
        const booked_seats = this.state.booked_seats;
        booked_seats.push(index)

        this.setState({
            booked_seats,
        }, () => {
            this.state.booked_seats.map((docs) => {
                if (docs === index) {
                    style.backgroundColor = "green"
                    style.height = "90%"
                    style.padding = "1px"
                    style.borderRadius = "10px";
                } else {
                    style.backgroundColor = "transparent"
                }
            })
        })
    }

    onRightSeatClicked(index, e) {
        const { style } = e.target
        const booked_seats = this.state.booked_seats;
        booked_seats.push(index)

        this.setState({
            booked_seats,
        }, () => {
            this.state.booked_seats.map((docs) => {
                if (docs === index) {
                    style.backgroundColor = "green"
                    style.height = "90%"
                    style.padding = "1px"
                    style.borderRadius = "10px";
                }
            })
        })
    }

    render() {
        return (
            <div className="seats">
                <div className="seats_layout">
                    <div className="seats_layout-1">
                        {
                            this.state.seats_arr_1.map((index) => {
                                return (
                                    <div className="seats_box" key={index}>
                                        <p className="seats_number"> {index} </p> 
                                        <img className="seats_box-icon" src={Chair} onClick={(event) => this.onLeftSeatClicked(index, event)} />
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="seats_layout-2">
                        {
                            this.state.seats_arr_2.map((docs) => {
                                return (
                                    <div className="seats_box" key={docs}>
                                    <p className="seats_number"> {docs} </p> 
                                        <img className="seats_box-icon" src={Chair} onClick={(event) => this.onRightSeatClicked(docs, event)} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bus: state.SingleBus != null
            ? state.SingleBus
            : null
    }
}

export default connect(mapStateToProps, { addReservation })(withRouter(Seats))