import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import Buses from "../Reducer/buses"
import Routes from "../Reducer/routes"
import SingleBus from "../Reducer/singleBus"
import GetAllRoutes from "../Reducer/getAllRoutes"
import ReserveSeats from "../Reducer/reserveSeats"
import UserCarts from "../Reducer/cart"

export default () => {
    const store = createStore(
        combineReducers({
            Buses,
            searched_routes: Routes,
            SingleBus,
            GetAllRoutes,
            ReserveSeats,
            UserCarts
        }), applyMiddleware(thunk)
    )

    return store;
}