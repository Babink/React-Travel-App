import { SEARCH_ROUTES } from "../Action/type"


export default (state = null, action) => {
    switch (action.type) {
        case SEARCH_ROUTES:
            return state = action.payload
        default:
            return state
    }
}