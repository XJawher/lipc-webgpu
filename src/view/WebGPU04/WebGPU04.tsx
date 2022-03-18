import { useEffect, useState } from "react";
import { CreateGPUMachine } from "./main";

function WebGPU04() {
  useEffect(() => {
    CreateGPUMachine({ id: "WebGPU04" });
  });

  return (
    <div className="WebGPU-common WebGPU04-class">
      <div>WebGPU04</div>
      <br />
      <canvas id="WebGPU04" width="640" height="480"></canvas>
    </div>
  );
}

export default WebGPU04;
