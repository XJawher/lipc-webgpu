import { useEffect, useState } from "react";
import { CreateTriangle } from "./main";

function WebGPU03() {
  useEffect(() => {
    CreateTriangle();
  });

  return (
    <div className="WebGPU-common WebGPU03-class">
      <div>WebGPU03</div>
      <br />
      <canvas id="WebGPU03" width="640" height="480"></canvas>
    </div>
  );
}

export default WebGPU03;
