import React, { useState } from "react";
import ReactDOM from "react-dom";
import "@/style/index.css";
import "antd/dist/antd.css";
import App from "@/App";
import reportWebVitals from "@/reportWebVitals";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { CheckWebGPU } from "@/help";
import WebGPU01 from "@/view/WebGPU01/WebGPU01";
import WebGPU02 from "@/view/WebGPU02/WebGPU02";
import WebGPU03 from "@/view/WebGPU03/WebGPU03";
import WebGPU08 from "@/view/WebGPU08/WebGPU08";
import WebGPU38 from "@/view/WebGPU38/WebGPU38";

function GoHome() {
  const [ttest] = useState(CheckWebGPU());
  return (
    <div>
      <div>{ttest}</div>
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
        <Route path="/WebGPU01" element={<WebGPU01 />}></Route>
        <Route path="/WebGPU02" element={<WebGPU02 />}></Route>
        <Route path="/WebGPU03" element={<WebGPU03 />}></Route>
        <Route path="/WebGPU08" element={<WebGPU08 />}></Route>
        <Route path="/WebGPU38" element={<WebGPU38 />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
