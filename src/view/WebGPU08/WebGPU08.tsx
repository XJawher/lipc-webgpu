import { useEffect } from "react";

import { CreateSquare } from "./main";

function WebGPU08() {
  useEffect(() => {
    (async () => {
      await CreateSquare();
    })();
  }, []);

  return (
    <div className="WebGPU-common">
      WebGPU08
      <canvas id="WebGPU08" width="640" height="480"></canvas>
    </div>
  );
}

export default WebGPU08;
