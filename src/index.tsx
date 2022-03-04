import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Header from "./view/header";
import Home from "./view/home";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<Header />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
