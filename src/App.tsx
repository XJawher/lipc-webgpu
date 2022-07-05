import { useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  useEffect(() => {
    document.title = `WebGPU Yes`;
  });

  return (
    <div className="front-page">
      <Link to="./WebGPU01">跳转到 WebGPU01 绘制三角形</Link>
      <Link to="./WebGPU02">跳转到 WebGPU02 静态点，线</Link>
      <Link to="./WebGPU03">跳转到 WebGPU03 多个三角形</Link>
      <Link to="./WebGPU04">跳转到 WebGPU04 缓冲区部分</Link>
      <Link to="./WebGPU05">
        跳转到 WebGPU05 三维立方体 Three-dimensional cube
      </Link>
      <Link to="./WebGPU08">跳转到 WebGPU08 正方形，单个缓冲区</Link>
      <Link to="./WebGPU38">跳转到 WebGPU38 Peaks Surface with Texture</Link>
      <Link to="./WebGPU56">跳转到 WebGPU56</Link>
    </div>
  );
}

export default App;
