import { GET_ALL_ROUTES } from "../Action/type"

export default (state = null, action) => {
    switch (action.type) {
        case GET_ALL_ROUTES:
            return state = action.payload

        default:
            return state
    }
}