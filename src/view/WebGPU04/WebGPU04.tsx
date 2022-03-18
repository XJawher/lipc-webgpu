import { useEffect, useState } from "react";
import { CreateTriangle } from "./main";

function WebGPU04() {
  useEffect(() => {
    CreateTriangle();
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
