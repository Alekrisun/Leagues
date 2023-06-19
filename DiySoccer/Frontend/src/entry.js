import React from "react";
import ReactDOM from "react-dom";

import App from "./app.js";

import store from './app/store'
import { Provider } from 'react-redux'

import "./scss/default.scss";
import "./scss/bootstrap/stylesheets/_bootstrap.scss";
import "./scss/datetimepicker/jquery.datetimepicker.min.css";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("react"));