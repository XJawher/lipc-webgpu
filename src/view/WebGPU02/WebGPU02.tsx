import { useEffect } from "react";
import { CreateTriangle } from "./main";

function WebGPU02() {
  useEffect(() => {
    CreateTriangle();
  });

  return (
    <div className="WebGPU-common">
      WebGPU02
      <canvas id="WebGPU02" width="640" height="480"></canvas>
    </div>
  );
}

export default WebGPU02;
