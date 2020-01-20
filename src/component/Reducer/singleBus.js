import { GET_SINGLE_BUS } from "../Action/type"

export default (state = null, action) => {
    switch (action.type) {
        case GET_SINGLE_BUS:
            return state = action.payload

        default:
            return state
    }
}