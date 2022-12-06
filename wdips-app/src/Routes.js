import React, { Component } from "react";
import { Router, Routes, Route } from "react-router-dom";

import App from "./App";
import Read from "./pages/test.js";
import history from './history';

export default class Rs extends Component {
    render() {
        return (
            <Router history={history}>
                <Routes>
                    <Route index element={<App />} />
                    <Route path='/Game' element={<Read />} />
                </Routes>
            </Router>
        )
    }
}