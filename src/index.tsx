import React from "react";
import ReactDOM from "react-dom";
import "@/style/index.css";
import App from "@/App";
import Header from "@/view/header";
import Home from "@/view/home";
import reportWebVitals from "@/reportWebVitals";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function GoHome() {
  return (
    <div>
      <Link to="/"> 跳转到首页</Link>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoHome />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/header" element={<Header />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
