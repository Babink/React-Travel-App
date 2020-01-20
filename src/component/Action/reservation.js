import axios from "axios"
import { GET_RESERVATION_BY_BUS_ID , GET_USER_CART} from "./type"

const url = 'http://localhost:4000'

export const addReservation = ({
    user_id,
    bus_id,
    seats_number,
    departure_date,
    contact,
    pick_up_place
}) => {
    return async function () {
        await axios.post(`${url}/book/seats`, {
            "user_id": user_id,
            "bus_id": bus_id,
            "seats_number": seats_number,
            "departure_date": departure_date,
            contact,
            pick_up_place
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((docs) => {
                console.log("From Reservation")
                console.log(docs.data)
            })
            .catch((e) => {
                console.log("Error", e)
            })
    }
}

export const deleteReservation = ({
    user_id,
    bus_id
}) => {
    return async function () {
        await axios.delete(`${url}/book/seats`, {
            "user_id": `${user_id}`,
            "bus_id": bus_id
        },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then((docs) => {
                console.log(docs.data)
            })
            .catch((e) => {
                console.log("Error", e)
            })
    }
}


export const getReservationByBusId = (bus_id) => {
    return async function (dispatch) {
        await axios.post('http://localhost:4000/bus/res', {
            "bus_id": bus_id
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((docs) => {
                const seats = []
                docs.data.result.map((docs) => {
                    docs.seats_number.map((docs) => {
                        seats.push(docs)
                    })

                    const data = {
                        "bus_id": docs.bus_id,
                        "seats_number": seats
                    }

                    dispatch({ type: GET_RESERVATION_BY_BUS_ID, payload: data })
                })
            })
            .catch((e) => {
                console.log("ERROR", e)
                dispatch({ type: GET_RESERVATION_BY_BUS_ID, payload: null })
            })
    }
}


export const getUserReservation = () => {
    const access_token = JSON.parse(localStorage.getItem('token')).access_token
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${access_token}`
    }

    return async function (dispatch) {
        await axios.get('http://localhost:4000/user/cart', {
            headers
        })
            .then((docs) => {
                console.log("ACCESSING DATA....")
                console.log(docs.data.reservation)
                dispatch({ type: GET_USER_CART , payload: docs.data.reservation })
            })
            .catch((e) => {
                console.log("Error" , e)
            })
    }
}