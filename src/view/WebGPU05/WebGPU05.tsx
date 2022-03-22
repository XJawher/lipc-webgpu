import { useEffect, useState } from "react";
import { CreateGPUMachine } from "./main";

function WebGPU05() {
  useEffect(() => {
    CreateGPUMachine({ id: "WebGPU05" });
  });

  return (
    <div className="WebGPU-common WebGPU05-class">
      <h2>WebGPU05</h2>
      <div>Three-dimensional cube</div>
      <br />
      <canvas id="WebGPU05" width="640" height="480"></canvas>
    </div>
  );
}

export default WebGPU05;
