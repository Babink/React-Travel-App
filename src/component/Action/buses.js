import axios from "axios"
import { GET_ALL_BUSES, GET_SINGLE_BUS } from "./type"

const url = 'http://localhost:4000'


export const getAllBuses = () => {
    const headers = {
        "Content-Type": 'application/json'
    }

    return async function (dispatch) {
        await axios.get(`${url}/admin/bus`, {
            headers: headers
        }).then(({ data, status }) => {
            if (status === 200 && data.message === "Success") {
                dispatch({ type: GET_ALL_BUSES, payload: data.bus })
            }
        })
            .catch((e) => {
                console.log(e)
            })
    }
}


export async function SingleBus(id) {
    const headers = {
        "Content-Type": "application/json"
    }

    return await axios.put(`${url}/admin/bus`, {
        "_id": JSON.parse(id),
    }, {
        headers
    })

}

export const getSingleBus = (id) => {
    const headers = {
        "Content-Type": "application/json"
    }

    return async function (dispatch) {
        await axios.put(`${url}/admin/bus`, {
            "_id": JSON.parse(id)
        }, {
            headers
        }).then(({ data, status }) => {
            if (status === 200 && data.result.message === "Success") {
                dispatch({ type: GET_SINGLE_BUS, payload: data.result.data })
            }
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const addBuses = ({
    name,
    company,
    bus_num,
    bus_contact,
    main_img,
    second_img,
    third_img,
    lux_type,
    total_seats,
    bus_description,
    amenities
}) => {
    const headers = {
        "Content-Type": "application/json",
    }
    return async function () {
        await axios.post(`${url}/admin/bus`, {
            'name': name,
            'company': company,
            'bus_number': bus_num,
            'bus_contact': bus_contact,
            'image_url': main_img,
            "image_url-1": second_img,
            "image_url-2": third_img,
            "lux_type": lux_type,
            "total_seats": total_seats,
            "bus_description": bus_description,
            "amenities": amenities
        },
            {
                headers: headers
            }
        ).then((docs) => {
            console.log(docs.status)
            return docs.status
        }).catch((e) => {
            console.log(e)
        })
    }
}
