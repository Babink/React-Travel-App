import axios from "axios";
import { SEARCH_ROUTES, GET_ALL_ROUTES } from "./type"
import { SingleBus } from "./buses"

const url = 'http://localhost:4000'

export const AddRoutes = ({
    from,
    to,
    highway,
    price,
    bus_id
}) => {
    const headers = {
        "Content-Type": 'application/json'
    }
    return async function () {
        await axios.post(`${url}/admin/route`, {
            "from": from,
            "to": to,
            "highway": highway,
            "price": price,
            "bus_id": bus_id
        }, {
            headers
        })
            .then((docs) => {
                console.log(docs.status)
            })
            .catch((e) => {
                console.log(e)
            })
    }
}


export const getRoutes = ({
    from,
    to,
    no_of_people
}) => {
    const headers = {
        "Content-Type": 'application/json'
    }

    return async function (dispatch) {
        await axios.put(`${url}/admin/route`, {
            "from": from,
            "to": to,
            "No_of_seats": no_of_people
        },
            {
                headers
            }
        ).then((docs) => {
            console.log("GETTING ROUTES >>>>>")
            let new_routes = []
            docs.data.result.map((doc) => {
                SingleBus(doc.bus_id)
                    .then((bus_item) => {
                        const bus_info = {
                            "available_seats": bus_item.data.result.data.available_seats,
                            "bus_image": bus_item.data.result.data.bus_image,
                            "lux_type": bus_item.data.result.data.lux_type,
                            "name": bus_item.data.result.data.name,
                        }
                        doc["bus_info"] = bus_info
                        new_routes.push(doc)

                    }).catch((e) => {
                        console.log(e)
                    })
            })
            setTimeout(() => {
                console.log(new_routes)
                dispatch({ type: SEARCH_ROUTES, payload: new_routes })
            }, 1000)
        }).catch((e) => {
            console.log("Error while Search Place", e)
        })
    }
}

export const getAllRoutes = () => {
    const headers = {
        "Content-Type": 'application/json'
    }

    return async function (dispatch) {
        await axios.get(`${url}/admin/route`, { headers })
            .then((docs) => {
                if (docs.data.message === "Success") {
                    dispatch({ type: GET_ALL_ROUTES, payload: docs.data.data })
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }
}