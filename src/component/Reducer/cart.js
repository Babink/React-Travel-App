import { GET_USER_CART } from "../Action/type"

export default (state = null, action) => {
    switch (action.type) {
        case GET_USER_CART:
            return state = action.payload

        default:
            return state
    }
}