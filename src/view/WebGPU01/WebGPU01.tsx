import { useEffect } from "react";

import { CreateSquare } from "./main";

function WebGPU01() {
  useEffect(() => {
    CreateSquare();
  });

  return (
    <div className="WebGPU-common">
      WebGPU01
      <canvas id="WebGPU01" width="640" height="480"></canvas>
    </div>
  );
}

export default WebGPU01;
