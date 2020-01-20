import { GET_ALL_BUSES } from "../Action/type"

export default (state = null, action) => {
    switch (action.type) {
        case GET_ALL_BUSES:
            return state = action.payload
        default:
            return state
    }
}