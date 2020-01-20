import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoute from "./Router/route"
import { Provider } from "react-redux"
import * as serviceWorker from './serviceWorker';
import Store from "./component/Store/store"


const store = Store();

store.subscribe(() => {
    console.log(store.getState())
})

const jsx = (
    <Provider store={store}>
        <AppRoute />
    </Provider>
)


ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
