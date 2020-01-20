import React from "react";
import { BrowserRouter, Route } from "react-router-dom"

import Header from "../component/Header/header"
import Footer from "../component/Footer/footer";
import Home from "../component/Home/Home";
import UserCart from "../component/Cart/cart"
import Register from "../component/Register/signup"
import Login from "../component/Login/login"

import Admin from "../component/Admin/admin"
import Search from "../component/Search/search";

import BookBus from "../component/BookDetail/bookbus"
import BusDetail from "../component/BookDetail/busdetail"

import SearchPage from "../component/search_page/search"

import SeatsLayout from "../component/Seats/seats"

export default () => {
    return (
        <BrowserRouter>
            <div className="header">
                <Header />
            </div>
            <div className="app">
                <Route path="/" component={Home} exact={true} />
                <Route path="/register" component={Register} exact={true} />
                <Route path="/login" component={Login} exact={true} />
                <Route path="/search" component={SearchPage} exact={true} />
                <Route path="/search/:from/:to/result" component={Search} exact={true} />
                <Route path="/bus/:from/:to/book/:id" component={BookBus} exact={true} />
                <Route path="/bus/:from/:to/detail" component={BusDetail} exact={true} />
                <Route path="/admin" component={Admin} />
                <Route path="/seats" component={SeatsLayout} />
                <Route path="/cart" component={UserCart} />
            </div>
            <div>
                <Footer />
            </div>
        </BrowserRouter >
    )
}