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
import WebGPU04 from "@/view/WebGPU04/WebGPU04";
import WebGPU05 from "@/view/WebGPU05/WebGPU05";
import WebGPU08 from "@/view/WebGPU08/WebGPU08";
import WebGPU38 from "@/view/WebGPU38/WebGPU38";
import WebGPU56 from "@/view/WebGPU56/WebGPU56";

function GoHome() {
  const [canUseWebGpu] = useState(CheckWebGPU());
  console.log('canUseWebGpu');

  return (
    <div>
      <div>{canUseWebGpu}</div>
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
        <Route path="/WebGPU04" element={<WebGPU04 />}></Route>
        <Route path="/WebGPU05" element={<WebGPU05 />}></Route>
        <Route path="/WebGPU08" element={<WebGPU08 />}></Route>
        <Route path="/WebGPU38" element={<WebGPU38 />}></Route>
        <Route path="/WebGPU56" element={<WebGPU56 />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
