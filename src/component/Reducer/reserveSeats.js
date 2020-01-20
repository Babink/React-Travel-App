import { GET_RESERVATION_BY_BUS_ID } from "../Action/type"


export default (state = null, action) => {
    switch (action.type) {
        case GET_RESERVATION_BY_BUS_ID:
            return state = action.payload

        default:
            return state
    }
}