import { Link } from "react-router-dom";

function App() {
  return (
    <div className="front-page">
      <Link to="./WebGPU01">跳转到 WebGPU01</Link>
      <Link to="./WebGPU02">跳转到 WebGPU02</Link>
    </div>
  );
}

export default App;
